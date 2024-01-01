import { z } from 'zod'
import { normalizePath } from '../utils/string'
import {
  AttributesSchema,
  PathSchema,
  RevisionableAttributesSchema,
  TranslateableAttributesSchema,
} from './index'

export const nodeTypes = [
  'node--recipe',
  'node--article',
  'node--page',
] as const

export const RelationShipFieldDataSchema = z.object({
  type: z.string(),
  id: z.string(),
  meta: z.object({
    drupal_internal__target_id: z.number(),
  }),
})

export const RelationShipFieldSchema = z.object({
  data: RelationShipFieldDataSchema.nullable(),
  links: z.object({
    related: z.object({
      href: z.string().url(),
    }),
    self: z.object({
      href: z.string().url(),
    }),
  }).optional(),
})

export const RelationShipFieldMultipleSchema = RelationShipFieldSchema.extend({
  data: z.array(RelationShipFieldDataSchema),
})

export const NodeAttributesSchema = AttributesSchema
  .merge(TranslateableAttributesSchema)
  .merge(RevisionableAttributesSchema)
  .extend({
    drupal_internal__nid: z.number(),
    title: z.string(),
    created: z.string().datetime({ offset: true }),
    promote: z.boolean(),
    sticky: z.boolean(),
    moderation_state: z.enum(['draft', 'published', 'archived']),
    path: PathSchema,
  })

export const NodeSchema = z.object({
  type: z.enum(nodeTypes),
  id: z.string().uuid(),
  links: z.object({
    self: z.object({
      href: z.string().url(),
    }),
  }),
  attributes: NodeAttributesSchema,
  relationships: z.object({}).optional(),
})

/**
 * Article
 */
export type NodeArticleInterface = z.infer<typeof NodeArticleSchema>
export const NodeArticleSchema = NodeSchema.extend({
  type: z.literal(nodeTypes[1]),
  attributes: NodeAttributesSchema.extend({
    body: z.object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
      summary: z.string().nullable(),
    }).nullable(),
  }),
  relationships: z.object({
    uid: RelationShipFieldSchema,
    field_media_image: RelationShipFieldSchema,
    field_tags: RelationShipFieldMultipleSchema,
  }),
})

/**
 * Article Full
 */
export type NodeArticleFullInterface = z.infer<typeof NodeArticleFullSchema>
export const NodeArticleFullSchema = NodeArticleSchema
  .transform(node => ({
    id: node.id,
    title: node.attributes.title,
    type: 'article',
    changed: node.attributes.changed,
    locale: node.attributes.langcode,
    href: normalizePath(`/${node.attributes.langcode}${node.attributes.path.alias}`),
    ...(node.attributes.body && {
      body: node.attributes.body.processed,
    }),
    ...(node.relationships.field_media_image.data && {
      media: {
        type: node.relationships.field_media_image.data.type,
        id: node.relationships.field_media_image.data.id,
      },
    }),
    tags: node.relationships.field_tags.data.map(tag => ({
      type: tag.type,
      id: tag.id,
    })),
    ...(node.relationships.uid.data && {
      user: {
        type: node.relationships.uid.data.type,
        id: node.relationships.uid.data.id,
      },
    }),
  }))

/**
 * Article Teaser
 */
export type NodeArticleTeaserInterface = z.infer<typeof NodeArticleTeaserSchema>
export const NodeArticleTeaserSchema = NodeArticleSchema
  .transform(node => ({
    id: node.id,
    title: node.attributes.title,
    type: 'article',
    locale: node.attributes.langcode,
    href: normalizePath(`/${node.attributes.langcode}${node.attributes.path.alias}`),
    ...(node.relationships.field_media_image.data && {
      media: {
        type: node.relationships.field_media_image.data.type,
        id: node.relationships.field_media_image.data.id,
      },
    }),
  }))

/**
 * Recipe
 */
export type NodeRecipeInterface = z.infer<typeof NodeRecipeSchema>
export const NodeRecipeSchema = NodeSchema.extend({
  type: z.literal(nodeTypes[0]),
  attributes: NodeAttributesSchema.extend({
    field_cooking_time: z.number(),
    field_difficulty: z.string(),
    field_ingredients: z.string().array(),
    field_number_of_servings: z.number(),
    field_preparation_time: z.number(),
    field_recipe_instruction: z.object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
    }),
    field_summary: z.object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
    }),
  }),
  relationships: z.object({
    uid: RelationShipFieldSchema,
    field_media_image: RelationShipFieldSchema,
    field_tags: RelationShipFieldMultipleSchema,
    field_recipe_category: RelationShipFieldMultipleSchema,
  }),
})

/**
 * Recipe Full
 */
export type NodeRecipeFullInterface = z.infer<typeof NodeRecipeFullSchema>
export const NodeRecipeFullSchema = NodeRecipeSchema
  .transform(node => ({
    id: node.id,
    title: node.attributes.title,
    type: 'recipe',
    changed: node.attributes.changed,
    locale: node.attributes.langcode,
    href: normalizePath(`/${node.attributes.langcode}${node.attributes.path.alias}`),
    difficulty: node.attributes.field_difficulty,
    ingredients: node.attributes.field_ingredients,
    numberOfServings: node.attributes.field_number_of_servings,
    preparationTime: node.attributes.field_preparation_time,
    cookingTime: node.attributes.field_cooking_time,
    summary: node.attributes.field_summary.processed,
    instructions: node.attributes.field_recipe_instruction.processed,
    ...(node.relationships.field_media_image.data && {
      media: {
        type: node.relationships.field_media_image.data.type,
        id: node.relationships.field_media_image.data.id,
      },
    }),
    tags: node.relationships.field_tags.data.map(tag => ({
      type: tag.type,
      id: tag.id,
    })),
    categories: node.relationships.field_recipe_category.data.map(category => ({
      type: category.type,
      id: category.id,
    })),
    ...(node.relationships.uid.data && {
      user: {
        type: node.relationships.uid.data.type,
        id: node.relationships.uid.data.id,
      },
    }),
  }))

/**
 * Recipe Teaser
 */
export type NodeRecipeTeaserInterface = z.infer<typeof NodeRecipeTeaserSchema>
export const NodeRecipeTeaserSchema = NodeRecipeSchema
  .transform(node => ({
    id: node.id,
    title: node.attributes.title,
    type: 'recipe',
    locale: node.attributes.langcode,
    href: normalizePath(`/${node.attributes.langcode}${node.attributes.path.alias}`),
    difficulty: node.attributes.field_difficulty,
    ...(node.relationships.field_media_image.data && {
      media: {
        type: node.relationships.field_media_image.data.type,
        id: node.relationships.field_media_image.data.id,
      },
    }),
  }))

/**
 * Page
 */
export type NodePageInterface = z.infer<typeof NodePageSchema>
export const NodePageSchema = NodeSchema.extend({
  type: z.literal(nodeTypes[2]),
  attributes: NodeAttributesSchema.extend({
    body: z.object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
      summary: z.string().nullable(),
    }).nullable(),
  }),
  relationships: z.object({
    uid: RelationShipFieldSchema,
  }),
})

/**
 * Page Full
 */
export type NodePageFullInterface = z.infer<typeof NodePageFullSchema>
export const NodePageFullSchema = NodePageSchema
  .transform(node => ({
    id: node.id,
    title: node.attributes.title,
    type: 'page',
    changed: node.attributes.changed,
    locale: node.attributes.langcode,
    href: normalizePath(`/${node.attributes.langcode}${node.attributes.path.alias}`),
    ...(node.attributes.body && {
      body: node.attributes.body.processed,
    }),
    ...(node.relationships.uid.data && {
      user: {
        type: node.relationships.uid.data.type,
        id: node.relationships.uid.data.id,
      },
    }),
  }))
