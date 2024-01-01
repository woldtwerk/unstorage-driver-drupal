import { z } from 'zod'

export const langCodes = [
  'en',
  'es',
] as const

export const AttributesSchema = z.object({
  status: z.boolean(),
  changed: z.string().datetime({ offset: true }),
})

export const TranslateableAttributesSchema = z.object({
  langcode: z.enum(langCodes),
  default_langcode: z.boolean(),
  content_translation_source: z.enum(langCodes).or(z.literal('und')),
  content_translation_outdated: z.boolean(),
})

export const RevisionableAttributesSchema = z.object({
  drupal_internal__vid: z.number().optional(),
  drupal_internal__revision_id: z.number().optional(),
  revision_timestamp: z.string().datetime({ offset: true }).optional(),
  revision_log: z.any().nullable(),
  revision_translation_affected: z.any().nullable(),
})

export const PathSchema = z.object({
  alias: z.string(),
  pid: z.number(),
  langcode: z.enum(langCodes),
})
