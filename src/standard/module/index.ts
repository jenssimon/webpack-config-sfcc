import rules from './rules';

import type { Configuration } from 'webpack';
import type { ConfigurationFnc } from '../../types';

/**
 * The module configuration. (see https://webpack.js.org/configuration/module/)
 */
const module: ConfigurationFnc<Configuration['module']> = (cartridge, options) => ({
  rules: rules(cartridge, options),
});

export default module;
