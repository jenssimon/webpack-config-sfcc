import type { Configuration } from 'webpack';
import type { ConfigurationFnc } from '../types';

/**
 * The output configuration. (see https://webpack.js.org/configuration/output/)
 */
const output: ConfigurationFnc<Configuration['output']> = (cartridge: string, {
  pathPrefix, dirname, production, devServer, site, locale,
}) => ({
  path: `${dirname}/${pathPrefix ?? ''}cartridges/${cartridge}/cartridge/static/default/js`,
  filename: '[name].js',
  // chunkFilename: '[name].js',
  sourceMapFilename: '[file].map',
  publicPath: devServer && site && locale
    ? `/on/demandware.static/Sites-${site}-Site/-/${locale}/js/`
    : undefined,
  clean: production,
});

export default output;
