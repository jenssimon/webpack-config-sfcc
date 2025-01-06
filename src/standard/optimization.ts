import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

import { normalizeWebpack5ChunkName } from '../utils.js'

import type { Configuration, Module } from 'webpack'
import type { ConfigurationFnc } from '../types.js'


/**
 * The optimization configuration. (see https://webpack.js.org/configuration/optimization/)
 */
const optimization: ConfigurationFnc<Configuration['optimization']> = () => ({
  splitChunks: {
    // Change the name of the chunks. There are several problems with the default naming (like too long names).
    name: (module: Module) => normalizeWebpack5ChunkName(
      module
        .identifier()
        .split('/')
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduceRight((item) => item)
        .replaceAll('/', '-'),
    ),
    // minSize: 400000,
  },

  minimizer: [
    '...',
    new CssMinimizerPlugin(),
  ],
})


export default optimization
