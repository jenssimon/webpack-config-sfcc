import swcRules from './module/rules/swc.js'
import cssRules from './module/rules/css.js'

import type { Configuration } from 'webpack'
import type { ConfigurationFnc } from '../types.js'


/**
 * The module configuration. (see https://webpack.js.org/configuration/module/)
 */
const theModule: ConfigurationFnc<Configuration['module']> = (cartridge, options) => ({
  rules: [
    // SWC is used to transpile JavaScript and TypeScript files.
    ...swcRules(cartridge, options),

    // CSS usally written using SCSS will be transpiled and in an additional step processed by PostCSS.
    ...cssRules(cartridge, options),

    ...options.projectSpecificRules,
  ],
})


export default theModule
