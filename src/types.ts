import type {
  Compiler, WebpackPluginInstance, RuleSetRule, Configuration,
} from 'webpack';
import type { AcceptedPlugin } from 'postcss';

/**
 * Configuration for cartridge aliases.
 */
export interface CartridgeAliasConfig {
  /**
   * The name of the alias.
   * This is the alias you will use in code.
   */
  alias: string;

  /**
   * The name of the SFCC cartridge to alias.
   */
  cartridge: string;

  /**
   * Don't add an `-css` alias for this cartridge. Only JS.
   */
  noStyle?: boolean;
}

/**
 * Configuration options for the Webpack configuration.
 */
export interface SFCCWebpackConfigOptions {
  /**
   * The `__dirname` value of the outside `webpack.config.js` file.
   *
   * Required
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
   */
  dirname: string;

  /**
   * The `require.resolve` function of the package that consumes the generated Webpack configuration.
   * Used to resolve modules.
   *
   * Required
   *
   * Just add
   *
   * ```
   * {
   *   resolver: require.resolve,
   *   // ...
   * }
   * ```
   */
  resolver: RequireResolve;

  /**
   * The entrypoint of the application.
   *
   * Default: `index.js`
   */
  entryPoint?: string;

  /**
   * The name of the JS entrypoint.
   *
   * Default: `app`
   */
  entryName?: string;

  /**
   * The name of the CSS entrypoint.
   *
   * Default: `app`
   */
  cssEntryName?: string;

  /**
   * The path prefix for the generated bundles.
   *
   * Default: `undefined`
   *
   * This is used to bundle files to another subfolder during the production build (e.g. `dist/`)..
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
   * Aliases
   *
   * Default: `{}`
   */
  alias: {
    /**
     * New request.
     */
    alias: string | false | string[];
    /**
     * Request to be redirected.
     */
    name: string;
    /**
     * Redirect only exact matching request.
     */
    onlyModule?: boolean;
  }[] | { [index: string]: string | false | string[] };

  /**
   * Cartridges that needs an alias configuration.
   *
   * Example:
   *
   * ```
   * aliasCartridges: [
   *   { alias: 'foo', cartridge: 'app_foo' },
   * ],
   * ```
   *
   * This configuration creates the aliases `foo` (for JS) and `foo-css` (for CSS/SCSS).
   *
   * You can skip the generation of the `-css` alias using the `noStyle` flag:
   *
   * ```
   * aliasCartridges: [
   *   { alias: 'bar', cartridge: 'app_bar', noStyle: true },
   * ],
   * ```
   *
   * Aliases for `app_storefront_base` will be created by default.
   */
  aliasCartridges?: CartridgeAliasConfig[];

  /**
   * The target environment for swc (see https://swc.rs/docs/configuring-swc#jsctarget).
   *
   * Default: `"es2015"`
   */
  swcTarget?: string;

  /**
   * Some packages from `node_modules` need to be transpiled. You can specify a list of packages using this option.
   *
   * Default: `[]`
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
   */
  transformNodeModules?: string[];
}

/**
 * A function which generates a Webpack config section.
 */
export type ConfigurationFnc<T> = (cartridge: string, options: SFCCWebpackConfigOptions) => T;

export type WebpackConfigurationGenerator = (
  cartridge: string, opts: Partial<SFCCWebpackConfigOptions>
) => Configuration;
