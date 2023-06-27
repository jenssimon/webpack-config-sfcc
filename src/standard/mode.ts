import type { Configuration } from 'webpack'

import type { ConfigurationFnc } from '../types'

/**
 * The mode configuration (production or development). (see https://webpack.js.org/configuration/mode/)
 */
const mode: ConfigurationFnc<Configuration['mode']> = (cartridge, { production }) => (
  production ? 'production' : 'development'
)

export default mode
