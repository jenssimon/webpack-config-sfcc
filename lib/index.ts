/**
 * A shared Webpack configuration for Salesforce Commerce Cloud (SFCC) projects.
 */
import { getOptions } from './utils';
import { DEFAULT_DEVELOPMENT, DEFAULT_PRODUCTION } from './defaults';
import mode from './mode';
import entry from './entry';
import output from './output';
import module from './module';
import devtool from './devtool';
import resolve from './resolve';
import plugins from './plugins';
import optimization from './optimization';

import type { Configuration } from 'webpack';
import type { ConfigurationFnc, SFCCWebpackConfigOptions } from './types';

/**
 * Generate a Webpack configuration for a cartridge using the given options.
 *
 * @param {string} cartridge the name of the cartridge
 * @param {Object} opts The options
 */
const generateConfiguration = (cartridge: string, opts: Partial<SFCCWebpackConfigOptions>): Configuration => {
  const options = getOptions(opts);

  return Object.entries<ConfigurationFnc<unknown>>({
    mode,
    entry,
    output,
    module,
    devtool,
    resolve,
    plugins,
    optimization,
  }).reduce<Partial<Configuration>>((prev, [key, value]) => {
    (prev as any)[key] = value(cartridge, options); // eslint-disable-line @typescript-eslint/no-explicit-any
    return prev;
  }, {});
};

generateConfiguration.DEFAULT_DEVELOPMENT = DEFAULT_DEVELOPMENT;
generateConfiguration.DEFAULT_PRODUCTION = DEFAULT_PRODUCTION;

export = generateConfiguration;
