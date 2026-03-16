'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'knotswithlove',
  title: 'Knots with Love — Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Products')
              .schemaType('product')
              .child(S.documentTypeList('product').title('Products')),
            S.listItem()
              .title('Inspiration Feed')
              .schemaType('inspirationPost')
              .child(S.documentTypeList('inspirationPost').title('Inspiration Posts')),
            S.divider(),
            S.listItem()
              .title('About Me')
              .schemaType('about')
              .child(S.documentTypeList('about').title('About Me')),
            S.listItem()
              .title('Contact')
              .schemaType('contact')
              .child(S.documentTypeList('contact').title('Contact')),
            S.listItem()
              .title('Site Settings')
              .schemaType('siteSettings')
              .child(S.documentTypeList('siteSettings').title('Site Settings')),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
})
