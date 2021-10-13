/**
 * A shared Webpack configuration for Salesforce Commerce Cloud (SFCC) projects.
 */

import { Configuration } from 'webpack';
import { getOptions } from './utils';
import mode from './mode';
import entry from './entry';
import output from './output';
import module from './module';
import devtool from './devtool';
import resolve from './resolve';
import plugins from './plugins';
import optimization from './optimization';
import type { SFCCWebpackConfigOptions } from './types';

/**
 * Generate a Webpack configuration for a cartridge using the given options.
 *
 * @param {string} cartridge the name of the cartridge
 * @param {Object} opts The options
 */
export = (cartridge: string, opts: Partial<SFCCWebpackConfigOptions>): Configuration => {
  const options = getOptions(opts);

  return {
    mode: mode(cartridge, options),
    entry: entry(cartridge, options),
    output: output(cartridge, options),
    module: module(cartridge, options),
    devtool: devtool(cartridge, options),
    resolve: resolve(cartridge, options),
    plugins: plugins(cartridge, options),
    optimization: optimization(cartridge, options),
  };
};
