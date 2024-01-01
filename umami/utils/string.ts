export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Vue router doesn't play well with special characters.
 * @param path Url Alias
 */
export function normalizePath(path: string) {
  return path.normalize('NFD').replace(/[\u0300-\u036F]/g, '')
}
