import type { ConfigurationFnc } from '../types';

/**
 * The output configuration. (see https://webpack.js.org/configuration/output/)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const output: ConfigurationFnc<any> = (cartridge: string, { pathPrefix, dirname }) => ({
  path: `${dirname}/${pathPrefix ?? ''}cartridges/${cartridge}/cartridge/static/default/js`,
  filename: '[name].js',
  // chunkFilename: '[name].js',
  sourceMapFilename: '[file].map',
  // publicPath: opts.publicPath,
});

export default output;
