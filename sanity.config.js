import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Use dynamic plugins to avoid build-time errors with React 19/Sanity structure tool
const isDevelopment = process.env.NODE_ENV === 'development'
const isBrowser = typeof window !== 'undefined'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: (isDevelopment || isBrowser) ? [structureTool(), visionTool()] : [],
  schema: {
    types: schemaTypes,
  },
})
