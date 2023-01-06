import { generateWebpackConfiguration } from '../utils';

import type { WebpackConfigurationGenerator } from '../types';

/**
 * Generate a Webpack configuration for a cartridge using the given options.
 *
 * @param {string} cartridge the name of the cartridge
 * @param {Object} opts The options
 */
const getConfiguration: WebpackConfigurationGenerator = (...args) => generateWebpackConfiguration({}, ...args);

export default getConfiguration;
