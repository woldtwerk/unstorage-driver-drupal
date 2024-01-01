/**
 * Create an error.
 * @param {string} driver
 * @param {string} message
 * @param {ErrorOptions} [opts]
 * @returns {Error}
 */
export function createError(driver, message, opts = {}) {
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
