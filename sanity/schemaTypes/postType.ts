import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({ name: 'mk', title: 'Makedonski', type: 'string' }),
        defineField({ name: 'sr', title: 'Srpski', type: 'string' }),
        defineField({ name: 'en', title: 'English', type: 'string' }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'object',
      fields: [
        defineField({
          name: 'mk',
          title: 'Makedonski',
          type: 'slug',
          options: { source: 'title.mk' },
        }),
        defineField({
          name: 'sr',
          title: 'Srpski',
          type: 'slug',
          options: { source: 'title.sr' },
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'slug',
          options: { source: 'title.en' },
        }),
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'object',
      fields: [
        defineField({
          name: 'mk',
          title: 'Makedonski',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({
          name: 'sr',
          title: 'Srpski',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage',
    },
  },
})
