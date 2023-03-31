import { generateWebpackConfiguration } from '../utils';

import mode from './mode';
import entry from './entry';
import output from './output';
import module from './module';
import devtool from './devtool';
import resolve from './resolve';
import plugins from './plugins';
import optimization from './optimization';
import devServer from './devServer';

import type { WebpackConfigurationGenerator } from '../types';

/**
 * Generate a Webpack configuration for a cartridge using the given options.
 *
 * @param {string} cartridge the name of the cartridge
 * @param {Object} opts The options
 */
const generateConfiguration: WebpackConfigurationGenerator = (...args) => generateWebpackConfiguration({
  mode,
  entry,
  output,
  module,
  devtool,
  resolve,
  plugins,
  optimization,
  devServer,
}, ...args);

export default generateConfiguration;
