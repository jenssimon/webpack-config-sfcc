import type { SFCCWebpackConfigOptions } from './types';

/**
 * Process options, add defaults and validate.
 */
export const getOptions = (opts: Partial<SFCCWebpackConfigOptions>): SFCCWebpackConfigOptions => {
  if (!opts.dirname) throw new Error('"dirname" option is mandatory. Please use "__dirname" as value.');
  if (!opts.resolver) throw new Error('"resolver" option is mandatory. Please use "require.resolve" as value.');

  const defaults: Omit<SFCCWebpackConfigOptions, 'dirname' | 'resolver'> = {
    sourceMap: false,
    devServer: false,
    production: false,
    preCSSExtractLoaders: [],
    additionalPlugins: [],
    additionalPostCSSPlugins: [],
    additionalDefine: {},
    noLint: false,
    projectSpecificRules: [],
    transformNodeModules: [],
    swcTarget: 'es2015',
  };
  return {
    ...defaults,
    ...opts,
  } as SFCCWebpackConfigOptions;
};

/**
 * Change the name of the chunks. There are several problems with the default naming (like too long names).
 */
export const normalizeWebpack5ChunkName = (name: string): string => name
  .replace(/node_modules/g, 'nodemodules')
  .replace(/[._|-]+/g, ' ')
  .replace(/\b(vendors|nodemodules|js|modules|es)\b/g, '')
  .trim()
  .replace(/ +/g, '-');
