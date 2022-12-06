import type { SFCCWebpackConfigOptions } from './types';

export const DEFAULT_DEVELOPMENT: Partial<SFCCWebpackConfigOptions> = {
  sourceMap: true,
};

export const DEFAULT_PRODUCTION: Partial<SFCCWebpackConfigOptions> = {
  production: true,
  pathPrefix: 'dist/',
};
