import { RESOLVE_FILE_EXTENSIONS } from '../constants.js'

import type { Configuration } from 'webpack'
import type { ConfigurationFnc } from '../types.js'


/**
 * The resolve configuration. (see https://webpack.js.org/configuration/resolve/)
 */
const resolve: ConfigurationFnc<Configuration['resolve']> = (_cartridge, { alias, aliasCartridges, dirname }) => ({
  alias: {
    ...[
      // standard aliases
      { alias: 'base', cartridge: 'app_storefront_base' },

      // custom aliases
      ...aliasCartridges ?? [],
    // eslint-disable-next-line unicorn/no-array-reduce
    ].reduce((accumulator, { cartridge, alias: cartridgeAlias, noStyle }) => ({
      ...accumulator,
      [cartridgeAlias]: `${dirname}/cartridges/${cartridge}/cartridge/client/default/js`,
      ...noStyle ? {} : {
        // I will not comment why we use the -css postfix. Spoiler: Really hackish!
        [`${cartridgeAlias}-css`]: `${dirname}/cartridges/${cartridge}/cartridge/client/default/scss`,
      },
    }), {}),

    ...alias,
  },
  extensions: RESOLVE_FILE_EXTENSIONS,
  extensionAlias: {
    '.js': ['.ts', '.js'],
    '.mjs': ['.mts', '.mjs'],
  },
})


export default resolve
