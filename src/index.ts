/**
 * A shared Webpack configuration for Salesforce Commerce Cloud (SFCC) projects.
 */
import generateConfiguration from './standard';

import { DEFAULT_DEVELOPMENT, DEFAULT_PRODUCTION } from './defaults';

export = {
  /**
   * Generate a Webpack configuration for a cartridge using the given options.
   *
   * @param {string} cartridge the name of the cartridge
   * @param {Object} opts The options
   */
  generateConfiguration,

  /* eslint-disable @typescript-eslint/naming-convention */

  /**
   * Default configuration for development builds.
   */
  DEFAULT_DEVELOPMENT,

  /**
   * Default configuration for production builds.
   */
  DEFAULT_PRODUCTION,

  /* eslint-enable @typescript-eslint/naming-convention */
}
