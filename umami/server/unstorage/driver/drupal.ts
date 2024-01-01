/* eslint-disable unused-imports/no-unused-imports */

import { $fetch } from 'ofetch'
import { joinURL, withQuery, withTrailingSlash } from 'ufo'
import { defineDriver } from 'unstorage'

/**
 * Create an error.
 * @param {string} driver
 * @param {string} message
 * @param {ErrorOptions} [opts]
 * @returns {Error}
 */
export function createError(driver, message, opts?) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts)
  return err
}

/**
 * Create a required option error.
 * @param {string} driver
 * @param {string|string[]} name
 * @returns {Error}
 */
export function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name
        .map(n => `\`${n}\``)
        .join(', ')}`,
    )
  }
  return createError(driver, `Missing required option \`${name}\`.`)
}

const defaultOptions = {
  ttl: 1,
  drupalUrl: 'https://d10.localhost',
  apiPrefix: 'jsonapi',
} as const

const DRIVER_NAME = 'drupal'

export default defineDriver((_opts) => {
  const opts = { ...defaultOptions, ..._opts }
  let files = {}
  let lastCheck = 0
  let syncPromise

  const syncFiles = async () => {
    if (lastCheck + opts.ttl * 1000 > Date.now())
      return

    if (!syncPromise)
      syncPromise = fetchEntities(opts)

    files = await syncPromise
    lastCheck = Date.now()
    syncPromise = undefined
  }

  return {
    name: DRIVER_NAME,
    options: opts,

    async getKeys() {
      await syncFiles()
      return Object.keys(files)
    },

    async hasItem(key) {
      await syncFiles()
      return key in files
    },

    async getItem(key) {
      await syncFiles()

      return ''
    },

    // async getMeta(key) {
    //   await syncFiles()
    //   const item = files[key]
    //   return item.meta
    // },
  }
})

async function fetchEntities(opts) {
  const prefix = withTrailingSlash(opts.dir).replace(/^\//, '')

  const url = joinURL(opts.drupalUrl, opts.apiPrefix)

  try {
    const endpoints = await $fetch(url,
      {
        headers: opts.token
          ? {
              Authorization: `Bearer ${opts.token}`,
            }
          : undefined,
      },
    )

    const entities = filterEndpoints(endpoints)

    // for (const entity of endpoints.links) {
    //   const key = Object.keys(entity)[0]

    //   if (entity.match)
    //     continue

    //   const key = node.path
    //     .substring(prefix.length)
    //     .replace(/\//g, ':')
    //   files[key] = {}
    // }

    return entities
  }
  catch (error) {
    throw createError(DRIVER_NAME, 'Failed to fetch git tree', {
      cause: error,
    })
  }
}

function filterEndpoints(endpoints) {
  return Object.entries(endpoints.links).map(([key, value]) => {
    if (key.match(/^(node|comment|file|media|menu|paragraph|block)--/)) {
      return {
        [`${key}`]: {
          value,
        },
      }
    }
    return {}
  })
}
