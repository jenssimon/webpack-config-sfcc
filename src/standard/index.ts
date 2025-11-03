import { generateWebpackConfiguration } from '../utils.js'

import mode from './mode.js'
import entry from './entry.js'
import output from './output.js'
import module from './module.js' // eslint-disable-line import-x/no-rename-default
import devtool from './devtool.js'
import resolve from './resolve.js'
import plugins from './plugins.js'
import optimization from './optimization.js'
import devServer from './devServer.js' // eslint-disable-line unicorn/prevent-abbreviations, import-x/no-rename-default

import type { WebpackConfigurationGenerator } from '../types.js'


/**
 * Generate a Webpack configuration for a cartridge using the given options.
 *
 * @param cartridge the name of the cartridge
 * @param opts The options
 */
const generateConfiguration: WebpackConfigurationGenerator = (...arguments_) => generateWebpackConfiguration({
  mode,
  entry,
  output,
  module,
  devtool,
  resolve,
  plugins,
  optimization,
  devServer,
}, ...arguments_)


export default generateConfiguration
