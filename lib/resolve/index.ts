import { ResolveOptions } from 'webpack';
import { RESOLVE_FILE_EXTENSIONS } from '../constants';
import type { ConfigurationFnc } from '../types';

/**
 * The resolve configuration. (see https://webpack.js.org/configuration/resolve/)
 */
const resolve: ConfigurationFnc<ResolveOptions> = (cartridge, { dirname, resolver }) => {
  const alias = () => ({
    /* eslint-disable quote-props */

    'jquery': resolver('jquery'), // enforce only one version of jQuery
    'app_medipolis_core': `${dirname}/cartridges/app_medipolis_core/cartridge/client/default/js`,
    'app_medipolis_core_scss': `${dirname}/cartridges/app_medipolis_core/cartridge/client/default/scss`,

    /* eslint-enable quote-props */
  });

  return {
    alias: alias(),
    extensions: RESOLVE_FILE_EXTENSIONS,
  };
};

export default resolve;
