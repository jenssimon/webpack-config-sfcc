import { EntryObject } from 'webpack';
import type { SFCCWebpackConfigOptions } from '../types';

type EntryStatic = string | EntryObject | string[];

/**
 * The entry point configuation (see https://webpack.js.org/configuration/entry-context/#entry)
 */
const entry = (cartridge: string, {
  devServer = false,
  hmrPath,
}: SFCCWebpackConfigOptions): | string
  | (() => string | EntryObject | string[] | Promise<EntryStatic>)
  | EntryObject
  | string[] => ({
  // The main entry point of the application
  app: [

    // Modules needed fot Hot Module Replacement
    ...(devServer && hmrPath) ? [
      `webpack-hot-middleware/client?path=__webpack_hmr_${hmrPath}&reload=true`,
    ] : [],

    // Add polyfills for all targets
    // 'app_medipolis_core/polyfills.js', // TODO

    // and finally the main entry point
    `./cartridges/${cartridge}/cartridge/client/default/js/main.js`,
  ],
});

export default entry;
