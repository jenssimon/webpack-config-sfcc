/* eslint-disable unicorn/prefer-export-from */

/**
 * A shared Webpack configuration for Salesforce Commerce Cloud (SFCC) projects.
 */
import generateConfiguration from './standard/index.js'

import { DEFAULT_DEVELOPMENT, DEFAULT_PRODUCTION } from './defaults.js'


export {
  /**
   * Generate a Webpack configuration for a cartridge using the given options.
   *
   * @param {string} cartridge the name of the cartridge
   * @param {Object} opts The options
   */
  generateConfiguration,

  /**
   * Default configuration for development builds.
   */
  DEFAULT_DEVELOPMENT,

  /**
   * Default configuration for production builds.
   */
  DEFAULT_PRODUCTION,
}
