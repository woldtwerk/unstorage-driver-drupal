import { z } from 'zod'
import { normalizePath } from '../utils/string'
import {
  AttributesSchema,
  PathSchema,
  RevisionableAttributesSchema,
  TranslateableAttributesSchema,
} from './index'

export const taxonomyTypes = [
  'taxonomy_term--tags',
  'taxonomy_term--recipe_category',
] as const

export const TaxonomyTermAttributesSchema = AttributesSchema
  .merge(TranslateableAttributesSchema)
  .merge(RevisionableAttributesSchema)
  .extend({
    drupal_internal__tid: z.number(),
    path: PathSchema,
    name: z.string(),
    description: z.string().nullable(),
    weight: z.number(),
  })

export type TaxonomyTermInterface = z.infer<typeof TaxonomyTermSchema>
export const TaxonomyTermSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(taxonomyTypes),
  links: z.object({
    self: z.object({
      href: z.string().url(),
    }),
  }),
  attributes: TaxonomyTermAttributesSchema,
})

export type TaxonomyTermShortInterface = z.infer<typeof TaxonomyTermShortSchema>
export const TaxonomyTermShortSchema = TaxonomyTermSchema
  .transform(term => ({
    id: term.id,
    name: term.attributes.name,
    href: normalizePath(`/${term.attributes.langcode}${term.attributes.path.alias}`),
    locale: term.attributes.langcode,
  }))
