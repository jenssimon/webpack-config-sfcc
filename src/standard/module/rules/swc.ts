import type { RuleSetRule } from 'webpack';
import type { ConfigurationFnc } from '../../../types';

/**
 * Rules to transpile JavaScript and TypeScript files using swc (https://swc.rs/).
 *
 * You can change setting by providing a `.swcrc` file in the root of your project
 * (see https://swc.rs/docs/configuring-swc).
 * This also uses the browserslist configuration (see https://github.com/browserslist/browserslist#config-file).
 */
const swc: ConfigurationFnc<RuleSetRule[]> = (cartridge, {
  swcTarget: target,
  transformNodeModules,
  sourceMap,
}) => {
  // Some packages from `node_modules` need to be transpiled. You can specify a list of packages using the
  // `transformNodeModules` option.
  const exclude = (name: string): boolean => (
    name.includes('node_modules')
      ? !(transformNodeModules ?? []).some((module) => new RegExp(`node_modules[/\\\\]?${module}`).test(name))
      : false
  );

  // to reduce DRY code
  const swcConfig = (test: RegExp, syntax?: string): RuleSetRule => ({
    test,
    exclude,
    use: {
      loader: 'swc-loader',
      options: {
        jsc: {
          parser: {
            syntax,
            decorators: true,
          },
          transform: {
            useDefineForClassFields: false,
          },
          target,
          externalHelpers: true,
        },
        ...sourceMap ? {
          sourceMap: true,
          inlineSourcesContent: true,
        } : {},
      },
    },
  });

  return [
    swcConfig(/\.m?js$/),
    swcConfig(/\.ts$/, 'typescript'),
  ];
};

export default swc;
