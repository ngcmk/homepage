import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
    'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_DATASET),
    'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-24'),
  },
})

