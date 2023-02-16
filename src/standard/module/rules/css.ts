import sass from 'sass';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import postcssMergeLonghand from 'postcss-merge-longhand';

import type { RuleSetRule } from 'webpack';
import type { ConfigurationFnc } from '../../../types';

/**
 * Rules to transform CSS.
 *
 * For SFCC projects it's common to use SCSS to produce CSS. These rules transform the SCSS to CSS and
 * add some PostCSS transformations as well. `mini-css-extract-plugin` is used to extract the resulting
 * CSS into a separate file.
 */
const css: ConfigurationFnc<RuleSetRule[]> = () => [
  {
    test: /\.(sass|scss|css)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // hmr: !options.devServer,
        },
      },
      {
        loader: 'css-loader',
        options: {
          url: false,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              postcssPresetEnv,
              postcssMergeLonghand,
              autoprefixer(),
              // ...additionalPostCSSPluginsInt,
              // ...options.additionalPostCSSPlugins,
            ],
          },
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: sass,
          sourceMap: true,
          sassOptions: {
            precision: 10,
          },
        },
      },
    ],
  },
];

export default css;
