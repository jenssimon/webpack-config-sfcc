import { HotModuleReplacementPlugin } from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { FILE_EXTENSIONS } from '../../constants';

import type { Configuration, WebpackPluginInstance } from 'webpack';
import type { ConfigurationFnc } from '../../types';

/**
 * The plugins configuration. (see https://webpack.js.org/configuration/plugins/)
 */
const plugins: ConfigurationFnc<Configuration['plugins']> = (cartridge, {
  cssEntryName, additionalPlugins, devServer,
}) => [
  // check case sensitive paths
  new CaseSensitivePathsPlugin() as unknown as WebpackPluginInstance,

  // check for circular dependencies
  new CircularDependencyPlugin({
    exclude: /node_modules/, // exclude detection of files based on a RegExp
    failOnError: true, // add errors to webpack instead of warnings
    cwd: process.cwd(), // set the current working directory for displaying module paths
  }) as unknown as WebpackPluginInstance,

  // Extract CSS files from JS bundle
  new MiniCssExtractPlugin({
    filename: `../css/${cssEntryName}core.css`,
    chunkFilename: `../css/${cssEntryName}core.css`,
  }) as unknown as WebpackPluginInstance,

  // Use Webpack to lint files
  new ESLintPlugin({
    extensions: FILE_EXTENSIONS,
    fix: true,
    lintDirtyModulesOnly: true, // TODO
  }),

  ...additionalPlugins as unknown as WebpackPluginInstance[],

  // HMR support for dev server
  ...devServer ? [
    new HotModuleReplacementPlugin() as unknown as WebpackPluginInstance,
  ] : [],
];

export default plugins;
