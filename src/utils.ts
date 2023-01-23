import type { Configuration } from 'webpack';

import type { ConfigurationFnc, SFCCWebpackConfigOptions } from './types';

/**
 * Process options, add defaults and validate.
 */
const getOptions = (opts: Partial<SFCCWebpackConfigOptions>): SFCCWebpackConfigOptions => {
  if (!opts.dirname) throw new Error('"dirname" option is mandatory. Please use "__dirname" as value.');
  if (!opts.resolver) throw new Error('"resolver" option is mandatory. Please use "require.resolve" as value.');

  const defaults: Omit<SFCCWebpackConfigOptions, 'dirname' | 'resolver'> = {
    sourceMap: false,
    devServer: false,
    production: false,
    entryPoint: 'index.js',
    entryName: 'app',
    cssEntryName: 'core',
    preCSSExtractLoaders: [],
    additionalPlugins: [],
    additionalPostCSSPlugins: [],
    additionalDefine: {},
    noLint: false,
    projectSpecificRules: [],
    alias: {},
    transformNodeModules: [],
    swcTarget: 'es2015',
    allowCircularDependendies: false,
  };
  return {
    ...defaults,
    ...opts,
  } as SFCCWebpackConfigOptions;
};

/**
 * Generates a Webpack configuration by using an array of configuration functions which create webpack config sections.
 *
 * @param sections configuration functions which create a webpack config section
 * @param cartridge cartridge name
 * @param opts config options
 * @returns a Webpack config containing the generated config sections
 */
export const generateWebpackConfiguration = (
  sections: { [index: string]: ConfigurationFnc<unknown> },
  cartridge: string,
  opts: Partial<SFCCWebpackConfigOptions>,
): Configuration => {
  const options = getOptions(opts);

  return Object
    .entries(sections)
    .reduce((prev, [key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prev as any)[key] = value(cartridge, options);
      return prev;
    }, {});
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
