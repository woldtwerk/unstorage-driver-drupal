interface EntityReference {
  id: string
  type: string
}

export function useEntityKey(entity: EntityReference) {
  return `${entity.type.replace('--', '/')}/${entity.id}`
}
