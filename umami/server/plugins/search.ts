import { parseMarkdown } from '@nuxtjs/mdc/dist/runtime'

declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'content:file:afterParse': () => void
  }
}

/**
 * Nuxt content uses the contents of the body field to generate the search index.
 * Thus we need to provide a body field with the content, which should be indexed.
 * Nuxt Content expects the body field to be an AST tree, which can be generated
 * with the parseMarkdown function from @nuxtjs/mdc.
 */
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('content:file:afterParse' as any, async (file: any) => {
    if (['recipe', 'article'].includes(file._dir)) {
      const content = await getContent(file)
      Object.assign(file, { ...content, title: file.attributes.title })
    }
  })
})

/**
 * Concatenate the contents of the body, field_summary and field_recipe_instruction
 * fields.
 * @param file Unstorage file object
 */
async function getContent(file: any) {
  let content = ''
  if (file.attributes?.body?.processed)
    content = file.attributes.body.processed

  if (file.attributes?.field_summary?.processed)
    content += file.attributes.field_summary.processed

  if (file.attributes?.field_recipe_instruction?.processed)
    content += file.attributes.field_recipe_instruction.processed

  return parseMarkdown(content)
}
