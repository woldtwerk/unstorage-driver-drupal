import { $fetch } from 'ofetch'
import { joinURL } from 'ufo'
import { defineDriver } from 'unstorage'
import { createError, createRequiredError } from './util.js'

/** @type {DrupalDefaultOptions} */
const defaultOptions = {
  ttl: 600,
  apiPrefix: 'jsonapi',
  entities: [
    'block_content',
    'comment',
    'file',
    'media',
    'menu',
    'menu_link_content',
    'node',
    'paragraph',
    'path_alias',
    'storage',
    'taxonomy_term',
    'user',
  ],
  headers: {},
  locales: ['en'],
  localStrategy: 'prefix',
}

const DRIVER_NAME = 'drupal'

/**
 * Drupal driver for unstorage.
 *
 * Only supports getting data via
 *   - hasItem
 *   - getItem
 *   - getKeys
 * Modifying data is not supported.
 */
export default defineDriver(
  /**
   * @param {DrupalUserOptions} _opts
   */
  (_opts) => {
    const opts = { ...defaultOptions, ..._opts }
    /** @type {Map<string, DrupalEntity>} */
    let files
    let lastCheck = 0
    /** @type {Promise<Map<string, DrupalEntity>> | undefined} */
    let syncPromise

    const syncFiles = async () => {
      if (!opts.drupalUrl)
        throw createRequiredError(DRIVER_NAME, 'drupalUrl')

      if (lastCheck + opts.ttl * 1000 > Date.now())
        return

      if (!syncPromise)
        syncPromise = fetchFiles(opts)

      files = await syncPromise
      lastCheck = Date.now()
      syncPromise = undefined
    }

    return {
      name: DRIVER_NAME,
      options: opts,
      async hasItem(key) {
        await syncFiles()
        return files.has(key)
      },
      async getItem(key) {
        await syncFiles()
        return files.get(key)
      },
      async getKeys() {
        await syncFiles()
        return [...files.keys()]
      },
    }
  })

class DrupalClient {
  /** @param {DrupalMergedOptions} opts */
  constructor(opts) {
    this.opts = opts
    this.baseUrl = joinURL(opts.drupalUrl, opts.apiPrefix)
  }

  /**
   * Get data from Drupal API.
   * @param {string} url - URL to fetch.
   * @returns {Promise<JSONApiResponse>}
   */
  async get(url) {
    try {
      return $fetch(url, {
        baseURL: this.baseUrl,
        ...this.opts.headers,
      })
    }
    catch (/** @type {unknown | Error} */ err) {
      if (err instanceof Error)
        throw createError(DRIVER_NAME, err.message, err)
      throw createError(DRIVER_NAME, 'Unknown error')
    }
  }

  /**
   * Get data from Drupal API and follow all next links.
   * @param {string} url - URL to fetch.
   * @returns {Promise<DrupalEntity[]>}
   */
  async getAll(url) {
    const { data, links } = await this.get(url)

    if (links.next?.href && links.next.href !== url) {
      const nextData = await this.getAll(links.next.href)
      return [...data, ...nextData]
    }

    return data
  }

  /**
   * Get all available endpoints.
   * @returns {Promise<Links[]>}
   */
  async getEndpoints() {
    const links = (
      await Promise.allSettled(
        this.opts.locales.map(locale => this.get(joinURL(this.opts.drupalUrl, locale, this.opts.apiPrefix))),
      )
    )
      .filter(isFulfilled)
      .map(({ value }) => value.links)

    if (!this.opts.entities.length)
      return links

    const validEntitiesRegex = new RegExp(`^(${this.opts.entities.join('|')})--`)
    const validEntities = links.map(locale => Object.fromEntries(
      Object.entries(locale)
        .filter(([key]) => {
          return key.match(validEntitiesRegex)
        }),
    ))

    return validEntities
  }
}

/**
 * @param {DrupalMergedOptions} opts
 * @returns {Promise<Map<string, DrupalEntity>>}
 */
async function fetchFiles(opts) {
  const Client = new DrupalClient(opts)
  const endpoints = await Client.getEndpoints()
  const status = await Promise.allSettled(
    endpoints.flatMap(locale => Object.entries(locale).map(async ([key, value]) => {
      const data = await Client.getAll(value.href)
      return {
        key,
        data,
      }
    })),
  )
  const results = new Map(status
    .filter(isFulfilled)
    .flatMap(({ value }) => {
      return value.data.map(item => ([
        `${(opts.localStrategy === 'prefix'
          && !!item.attributes.langcode)
          ? `${item.attributes.langcode}:`
          : ''}${
          value.key.replace(/--/g, ':')}:${item.id}${(opts.localStrategy === 'suffix'
            && !!item.attributes.langcode)
            ? `:${item.attributes.langcode}`
            : ''}.json`,
        item,
      ]))
    }))
  return results
}

/**
 * @template T
 * @param {PromiseSettledResult<T>} value
 * @returns {value is PromiseFulfilledResult<T>}
 */
function isFulfilled(value) {
  return value.status === 'fulfilled'
}

/**
 * @typedef {object} DrupalUserOptions
 * @property {number} [ttl=600] - Time to live in seconds.
 * @property {string} drupalUrl - Drupal URL.
 * @property {string} [apiPrefix=jsonapi] - Drupal JSON:API prefix.
 * @property {string[]} [entities] - List of entities to fetch.
 * @property {object} [headers] - Headers to pass to fetch.
 * @property {string} [localStrategy=prefix] - Prefix files with locale.
 * @property {string[]} [locales=['en']] - List of locales to fetch.
 *
 * @typedef {Required<Omit<DrupalUserOptions, 'drupalUrl'>>} DrupalDefaultOptions
 *
 * @typedef {DrupalDefaultOptions & DrupalUserOptions} DrupalMergedOptions
 *
 * @typedef {object} DrupalEntity
 * @property {string} type - Entity type.
 * @property {string} id - Entity ID.
 * @property {boolean} status - Entity status.
 * @property {Attributes} attributes - Entity attributes.
 *
 * @typedef {object} Attributes
 * @property {boolean} [status] - Status.
 * @property {string} [langcode] - Language code.
 *
 * @typedef {object} JSONApiResponse
 * @property {object[]} jsonapi - JSON:API Meta.
 * @property {DrupalEntity[]} data - Data.
 * @property {Links} links - Links.
 * @property {object} [meta] - Meta.
 *
 * @typedef {object} NavLinks
 * @property {Link} [self] - Self.
 * @property {Link} [next] - Next.
 * @property {Link} [prev] - Previous.
 *
 * @typedef {object} Link
 * @property {string} href - URL.
 *
 * @typedef {Object.<string, Link> & NavLinks} Links
 *
 * @typedef {JSONApiResponse & { data: DrupalEntity }} JSONApiResponseSingle
 *
 */
