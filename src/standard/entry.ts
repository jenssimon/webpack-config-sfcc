import type { Configuration } from 'webpack'
import type { ConfigurationFnc } from '../types.js'


/**
 * The entry point configuation (see https://webpack.js.org/configuration/entry-context/#entry)
 */
const entry: ConfigurationFnc<Configuration['entry']> = (cartridge, {
  devServer = false, // eslint-disable-line unicorn/prevent-abbreviations
  hmrPath,
  entryPoint,
  entryName,
  additionalEntries,
}) => ({
  // The main entry point of the application
  [entryName!]: [

    // Modules needed fot Hot Module Replacement
    ...(devServer && hmrPath) ? [
      `webpack-hot-middleware/client?path=__webpack_hmr_${hmrPath}&reload=true`,
    ] : [],

    // and finally the main entry point
    `./cartridges/${cartridge}/cartridge/client/default/js/${entryPoint}`,
  ],
  ...additionalEntries,
})


export default entry
