import { z } from 'zod'

export type UserInterface = z.infer<typeof UserSchema>
export const UserSchema = z.object({
  id: z.string().uuid(),
  type: z.literal('user--user'),
  attributes: z.object({
    display_name: z.string(),
  }),
})

export type UserShortInterface = z.infer<typeof UserShortSchema>
export const UserShortSchema = UserSchema
  .transform(user => ({
    id: user.id,
    name: user.attributes.display_name,
    href: `/user/${user.id}`,
  }))
