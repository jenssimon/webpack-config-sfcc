import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { normalizeWebpack5ChunkName } from '../utils';

import type { Module } from 'webpack';
import type { ConfigurationFnc } from '../types';

/**
 * The optimization configuration. (see https://webpack.js.org/configuration/optimization/)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const optimization: ConfigurationFnc<any> = (config, env) => ({
  splitChunks: {
    // Change the name of the chunks. There are several problems with the default naming (like too long names).
    name: (mod: Module) => normalizeWebpack5ChunkName(
      mod
        .identifier()
        .split('/')
        .reduceRight((item) => item)
        .replace(/\//g, '-'),
    ),
    // minSize: 400000,
  },

  minimizer: [
    '...',
    new CssMinimizerPlugin(),
  ],
});

export default optimization;
