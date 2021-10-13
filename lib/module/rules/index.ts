import { RuleSetRule } from 'webpack';
import type { ConfigurationFnc } from '../../types';
import swcRules from './swc';
import cssRules from './css';

/**
 * The rules configuration (see https://webpack.js.org/configuration/module/#modulerules)
 *
 * SWC is used to transpile JavaScript and TypeScript files.
 * CSS usally written using SCSS will be transpiled and in an additional step processed by PostCSS.
 *
 * Additional project specific rules will also be appended here.
 */
const rules: ConfigurationFnc<RuleSetRule[]> = (cartridge, options): RuleSetRule[] => [
  ...swcRules(cartridge, options),
  ...cssRules(cartridge, options),
  ...options.projectSpecificRules,
];

export default rules;
