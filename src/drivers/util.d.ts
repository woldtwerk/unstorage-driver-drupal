/**
 * Create an error.
 * @param {string} driver
 * @param {string} message
 * @param {ErrorOptions} [opts]
 * @returns {Error}
 */
export function createError(driver: string, message: string, opts?: ErrorOptions | undefined): Error;
/**
 * Create a required option error.
 * @param {string} driver
 * @param {string|string[]} name
 * @returns {Error}
 */
export function createRequiredError(driver: string, name: string | string[]): Error;
