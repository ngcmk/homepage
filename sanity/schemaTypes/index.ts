// sanity/schemaTypes/index.ts

import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
// blockContentType е избришан, затоа не го import-уваме

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, postType, authorType],
}
// Забелешка: blockContentType е избришан од овој проект, па затоа не е вклучен во schema.type