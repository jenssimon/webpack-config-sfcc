import { generateWebpackConfiguration } from '../utils.js'

import mode from './mode.js'
import entry from './entry.js'
import output from './output.js'
import module from './module.js'
import devtool from './devtool.js'
import resolve from './resolve.js'
import plugins from './plugins.js'
import optimization from './optimization.js'
import devServer from './devServer.js'

import type { WebpackConfigurationGenerator } from '../types.js'

/**
 * Generate a Webpack configuration for a cartridge using the given options.
 *
 * @param cartridge the name of the cartridge
 * @param opts The options
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
}, ...args)

export default generateConfiguration
