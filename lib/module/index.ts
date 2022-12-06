import rules from './rules';

import type { ModuleOptions } from 'webpack';
import type { ConfigurationFnc } from '../types';

/**
 * The module configuration. (see https://webpack.js.org/configuration/module/)
 */
const module: ConfigurationFnc<ModuleOptions> = (cartridge, options) => ({
  rules: rules(cartridge, options),
});

export default module;
