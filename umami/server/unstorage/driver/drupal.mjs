// @ts-check

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
  localStrategy: 'prefix',
  menus: [
    'main',
    'footer',
  ],
}

const DRIVER_NAME = 'drupal'

export default defineDriver((_opts) => {
  const opts = { ...defaultOptions, ..._opts }
  /** @type {Map<string, DrupalEntity>} */
  let files
  let lastCheck = 0
  /** @type {Promise<Map<string, DrupalEntity>> | undefined} */
  let syncPromise

  const syncFiles = async () => {
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
  constructor(opts) {
    this.opts = opts
    this.baseUrl = joinURL(opts.drupalUrl, opts.apiPrefix)
  }

  /**
   * @template T
   * @param {string} url - URL to fetch.
   * @returns {Promise<T>}
   */
  async get(url) {
    try {
      return $fetch(url, {
        baseUrl: this.baseUrl,
        ...this.opts.headers,
      })
    }
    catch (err) {
      throw createError(DRIVER_NAME, err.message, err)
    }
  }

  /**
   * @template T
   * @param {string} url - URL to fetch.
   * @returns {Promise<T>}
   */
  async getAll(url) {
    /** @type {JSONApiResponse} */
    const { data, links } = await this.get(url)

    if (links.next) {
      /** @type {JSONApiResponse} */
      const nextData = await this.getAll(links.next)
      return [...data, ...nextData]
    }

    return data
  }

  async getEndpoints() {
    const links = (
      await Promise.allSettled(
        this.opts.locales.map(locale => this.get(joinURL(this.opts.drupalUrl, locale, this.opts.apiPrefix))),
      )
    )
      .filter(({ status }) => status === 'fulfilled')
      .flatMap(({ value }) => value.links)

    if (!this.opts.entities.length)
      return links

    const validEntitiesRegex = new RegExp(`^(${this.opts.entities.join('|')})--`)
    const validEntities = links.flatMap(locale => Object.fromEntries(
      Object.entries(locale)
        .filter(([key]) => {
          return key.match(validEntitiesRegex)
        }),
    ))

    return validEntities
  }
}

/**
 * @param {DrupalOptions} opts
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
    .filter(({ status }) => status === 'fulfilled')
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
 * @typedef {object} DrupalOptions
 * @property {number} [ttl=600] - Time to live in seconds.
 * @property {string} drupalUrl - Drupal URL.
 * @property {string} [apiPrefix=jsonapi] - Drupal JSON:API prefix.
 * @property {string[]} [entities] - List of entities to fetch.
 * @property {object} [headers] - Headers to pass to fetch.
 * @property {string} [localStrategy=prefix] - Prefix files with locale.
 * @property {string[]} [menus] - List of menus to fetch.
 *
 * @typedef {Omit<DrupalOptions, 'drupalUrl'>} DrupalDefaultOptions
 *
 * @callback DrupalDriver
 * @param {DrupalOptions} _opts
 * @returns {import('unstorage').Driver}
 *
 * @typedef {object} DrupalEntity
 * @property {string} type - Entity type.
 * @property {string} id - Entity ID.
 * @property {boolean} status - Entity status.
 *
 * @typedef {object} JSONApiResponse
 * @property {object[]} jsonapi - JSON:API Meta.
 * @property {DrupalEntity[]} data - Data.
 * @property {Links} links - Links.
 *
 * @typedef {object} Links
 * @property {string} self - Self.
 * @property {string} [next] - Next.
 * @property {string} [prev] - Previous.
 *
 * @typedef {JSONApiResponse & { data: DrupalEntity }} JSONApiResponseSingle
 *
 */
