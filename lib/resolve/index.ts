import { RESOLVE_FILE_EXTENSIONS } from '../constants';

import type { ResolveOptions } from 'webpack';
import type { ConfigurationFnc } from '../types';

/**
 * The resolve configuration. (see https://webpack.js.org/configuration/resolve/)
 */
const resolve: ConfigurationFnc<ResolveOptions> = (cartridge, { alias }) => ({
  alias,
  extensions: RESOLVE_FILE_EXTENSIONS,
});

export default resolve;
