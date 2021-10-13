import { Compiler, WebpackPluginInstance, RuleSetRule } from 'webpack';
import { AcceptedPlugin } from 'postcss';

/**
 * Configuration options for the Webpack configuration.
 */
export interface SFCCWebpackConfigOptions {
  /**
   * The `__dirname` value of the outside `webpack.config.js` file.
   *
   * Used to resolve paths from the package that consumes the generated Webpack configuration.
   * Just add
   *
   * ```
   * {
   *   dirname: __dirname,
   *   // ...
   * }
   * ```
   *
   * *required*
   */
  dirname: string;

  /**
   * The `require.resolve` function of the package that consumes the generated Webpack configuration.
   *
   * Used to resolve modules.
   * Just add
   *
   * ```
   * {
   *   resolver: require.resolve,
   *   // ...
   * }
   * ```
   *
   * *required*
   */
  resolver: RequireResolve;

  /**
   * The path prefix for the generated bundles.
   *
   * This is used to bundle files to another subfolder during the production build (e.g. `dist/`)..
   *
   * Default: `undefined`
   */
  pathPrefix?: string;

  /**
   * Generate source maps for `.js` and `.css` files.
   *
   * Default: `false`
   */
  sourceMap: boolean;

  /**
   * Build Webpack config for usage with dev server.
   *
   * Default: `false`
   */
  devServer: boolean;

  /**
   * TODO
   */
  publicPath?: string;

  /**
   * TODO
   */
  hmrPath?: string;

  /**
   * Use production mode.
   *
   * Default: `false`
   */
  production: boolean;

  /**
   * Loaders executed before `mini-css-extract-plugin` loader.
   *
   * Default: `[]`
   * TODO
   */
  preCSSExtractLoaders: string[];

  /**
   * TODO
   */
  additionalPlugins: ((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance[];

  /**
   * TODO
   */
  additionalPostCSSPlugins: AcceptedPlugin[];

  /**
   * TODO
   */
  additionalDefine: Record<string, unknown>;

  /**
   * Disable linting.
   * Useful when linting was already done before Webpack build.
   *
   * Default: `false`
   */
  noLint: boolean;

  /**
   * TODO
   */
  onlyCartridge?: string;

  /**
   * Additional Webpack rules (see https://webpack.js.org/configuration/module/#modulerules) used for your cartridge.
   *
   * Default: `[]`
   */
  projectSpecificRules: RuleSetRule[];

  /**
   * The target environment for swc (see https://swc.rs/docs/configuring-swc#jsctarget).
   *
   * Default: `"es2015"`
   */
  swcTarget?: string;

  /**
   * Some packages from `node_modules` need to be transpiled. You can specify a list of packages using this option.
   *
   * Example:
   * ```
   * transformNodeModules: [
   *   'lit',
   *   'lit-element',
   *   'lit-html',
   * ],
   * ```
   *
   * Default: `[]`
   */
  transformNodeModules?: string[];
}

export type ConfigurationFnc<T> = (cartridge: string, options: SFCCWebpackConfigOptions) => T;
