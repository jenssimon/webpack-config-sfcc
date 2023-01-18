import type { Configuration } from 'webpack';
import type { ConfigurationFnc } from '../../types';

/**
 * The entry point configuation (see https://webpack.js.org/configuration/entry-context/#entry)
 */
const entry: ConfigurationFnc<Configuration['entry']> = (cartridge, {
  devServer = false,
  hmrPath,
  entryPoint,
  entryName,
}) => ({
  // The main entry point of the application
  [entryName as string]: [

    // Modules needed fot Hot Module Replacement
    ...(devServer && hmrPath) ? [
      `webpack-hot-middleware/client?path=__webpack_hmr_${hmrPath}&reload=true`,
    ] : [],

    // Add polyfills for all targets
    // 'app_xxx_core/polyfills.js', // TODO

    // and finally the main entry point
    `./cartridges/${cartridge}/cartridge/client/default/js/${entryPoint}`,
  ],
});

export default entry;
