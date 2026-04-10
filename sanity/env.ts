// Get environment variables - support both process.env and import.meta.env
const getEnv = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key]
  }
  return undefined
}

export const apiVersion =
  getEnv('NEXT_PUBLIC_SANITY_API_VERSION') || '2025-11-24'

export const dataset = assertValue(
  getEnv('NEXT_PUBLIC_SANITY_DATASET') || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID') || 'l9cwvtr7',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
