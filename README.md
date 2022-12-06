[![NPM version][npm-image]][npm-url] [![Downloads][npm-downloads-image]][npm-url] [![star this repo][gh-stars-image]][gh-url] [![fork this repo][gh-forks-image]][gh-url] [![Build Status][travis-image]][travis-url] ![Code Style][codestyle-image]

# @jenssimon/webpack-config-sfcc

> A shareable Webpack configuration for SFCC projects

## General

This is a battle-proof Webpack configuration used and matured in multiple Salesforce Commerce Cloud storefront projects. To make these configurations shareable and maintainable this package was created.

## Table of Contents
- [@jenssimon/webpack-config-sfcc](#jenssimonwebpack-config-sfcc)
  - [General](#general)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Webpack configuration files](#webpack-configuration-files)
    - [`webpack.config.js`](#webpackconfigjs)
    - [`webpack.config.prod.js`](#webpackconfigprodjs)
    - [`webpack.cartridges.js`](#webpackcartridgesjs)
  - [Configurations](#configurations)
    - [Base configuration](#base-configuration)
    - [Frontend Standard](#frontend-standard)
    - [Frontend React](#frontend-react)
  - [License](#license)
## Features

- Webpack 5
- JavaScript and/or TypeScript
  - Usage of modern JavaScript/TypeScript
  - Optional support for polyfills
  - Transpilation using [swc](https://swc.rs/)
  - Configuration of transpilation target via [Browserslist](https://github.com/browserslist/browserslist#readme)
- SCSS and/or CSS
  - Compiles SCSS using [Dart Sass](https://sass-lang.com/dart-sass)
  - Uses [PostCSS](https://postcss.org/)
    - [Autoprefixer](https://github.com/postcss/autoprefixer#readme)
    - [postcss-preset-env](https://preset-env.cssdb.org/)
    - Configuration via [Browserslist](https://github.com/browserslist/browserslist#readme)
    - Extraction of CSS bundles using [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin#readme)
- Source Maps
- Linting using [ESLint](https://eslint.org/) via [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin#readme)
- Check for case-sensitive file names via [case-sensitive-paths-webpack-plugin](https://github.com/Urthen/case-sensitive-paths-webpack-plugin#readme) - Important for Windows and macOS environemnts
- Prevent circular module dependencies via [circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin#readme)
- Dev Server support
- Support for Hot Module Replacement

## Installation

1. Install the package:
    ```sh
    $ yarn add @jenssimon/webpack-config-sfcc --dev
    ```
1. Create the development webpack configuration `webpack.config.js`
1. Create the production webpack configuration `webpack.config.prod.js`

## Webpack configuration files

### `webpack.config.js`

Add a `webpack.config.js` file in your project root. This is the configuration for the development environment.

```javascript
const webpackConfig = require('@jenssimon/webpack-config-sfcc');
const cartridges = require('./webpack.cartridges');

module.exports = () => Object.entries(cartridges).map(([cartridge, config]) => webpackConfig(cartridge, {
  dirname: __dirname,
  resolver: require.resolve,
  ...webpackConfig.DEFAULT_DEVELOPMENT,
  ...config,
}));
```

### `webpack.config.prod.js`

Add a `webpack.config.prod.js` file in your project root. This is the configuration for the production environment.

```javascript
/**
 * Webpack configuration for production build.
 */
const webpackConfig = require('@jenssimon/webpack-config-sfcc');
const cartridges = require('./webpack.cartridges');

module.exports = () => Object.entries(cartridges).map(([cartridge, config]) => webpackConfig(cartridge, {
  dirname: __dirname,
  resolver: require.resolve,
  ...webpackConfig.DEFAULT_PRODUCTION,
  ...config,
}));
```

### `webpack.cartridges.js`

Add a `webpack.cartridges.js` file in yout project root. This files contains specific additional configuration for each storefront cartridge within your project.

```javascript
module.exports = {
  app_storefront_foo: {
    // special configuration for `app_storefront_foo`
  },
  app_storefront_bar: {
    // special configuration for `app_storefront_bar`
  },
};
```

Those configurations can contain additional Webpack rules, aliases, ... For more details see the configuration section.

## Configuration

For configuration the following object is used:

| Property  | Type     | Description                               | Default | Required |
| --------- | -------- | ----------------------------------------- | ------- | -------- |
| `dirname` | `string` | The value of `__dirname` from the project |

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

  entryPoint?: string;

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

## License

MIT © 2021 [Jens Simon](https://github.com/jenssimon)

[npm-url]: https://www.npmjs.com/package/@jenssimon/webpack-config-sfcc
[npm-image]: https://badgen.net/npm/v/@jenssimon/webpack-config-sfcc
[npm-downloads-image]: https://badgen.net/npm/dw/@jenssimon/webpack-config-sfcc

[gh-url]: https://github.com/jenssimon/webpack-config-sfcc
[gh-stars-image]: https://badgen.net/github/stars/jenssimon/webpack-config-sfcc
[gh-forks-image]: https://badgen.net/github/forks/jenssimon/webpack-config-sfcc

[travis-url]: https://travis-ci.com/jenssimon/webpack-config-sfcc
[travis-image]: https://travis-ci.com/jenssimon/webpack-config-sfcc.svg?branch=master

[codestyle-image]: https://badgen.net/badge/code%20style/airbnb/f2a
