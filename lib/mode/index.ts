import type { ConfigurationFnc } from '../types';

/**
 * The mode configuration (production or development). (see https://webpack.js.org/configuration/mode/)
 */
const mode: ConfigurationFnc<'production' | 'development' | 'none' | undefined> = (cartridge, { production }) => (
  production ? 'production' : 'development'
);

export default mode;
