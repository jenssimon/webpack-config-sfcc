import type { Configuration } from 'webpack'
import type { ConfigurationFnc } from '../types'

/**
 * Devtool configuration (see https://webpack.js.org/configuration/devtool/)
 *
 * When using the dev server another devtool configuration is required.
 */
const devtool: ConfigurationFnc<Configuration['devtool']> = (cartridge, { sourceMap, devServer }) => {
  // Set devTool mode, use another mode when running in devServer
  let theDevtool
  if (sourceMap) {
    theDevtool = devServer ? 'inline-source-map' : 'source-map'
  }
  return theDevtool
}

export default devtool
