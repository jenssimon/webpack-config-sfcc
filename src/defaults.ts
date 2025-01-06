import type { SFCCWebpackConfigOptions } from './types.js'


/**
 * Default configuration for development builds.
 */
export const DEFAULT_DEVELOPMENT: Partial<SFCCWebpackConfigOptions> = {
  sourceMap: true,
}


/**
 * Default configuration for production builds.
 */
export const DEFAULT_PRODUCTION: Partial<SFCCWebpackConfigOptions> = {
  production: true,
  pathPrefix: 'dist/',
}
