/* eslint-disable unicorn/prevent-abbreviations */
import fs from 'node:fs'

import { parse } from 'yaml'

import type { WebpackOptionsNormalized } from 'webpack'
import type { ConfigurationFnc, SFCCWebpackConfigOptions } from './types.js'


/**
 * Process options, add defaults and validate.
 */
const getOptions = (options: Partial<SFCCWebpackConfigOptions>): SFCCWebpackConfigOptions => {
  if (!options.dirname) throw new Error('"dirname" option is mandatory. Please use "__dirname" as value.')
  if (!options.resolver) throw new Error('"resolver" option is mandatory. Please use "require.resolve" as value.')

  const defaults: Omit<SFCCWebpackConfigOptions, 'dirname' | 'resolver'> = {
    sourceMap: false,
    devServer: false,
    production: false,
    entryPoint: 'index.js',
    entryName: 'app',
    cssEntryName: 'core',
    preCSSExtractLoaders: [],
    additionalPlugins: [],
    additionalPostCSSPlugins: [],
    additionalDefine: {},
    noLint: false,
    projectSpecificRules: [],
    alias: {},
    transformNodeModules: [],
    swcTarget: 'es2019',
    allowCircularDependendies: false,
  }


  const devServer = options?.env?.WEBPACK_SERVE === true

  let hostname: string | undefined
  let site: string | undefined
  let locale: string | undefined

  try {
    const dwJson = fs.readFileSync('dw.json', 'utf8');
    ({ hostname } = JSON.parse(dwJson))

    const devserverYml = fs.readFileSync('devserver.yml', 'utf8');
    ({ site, locale } = parse(devserverYml))
  } catch {
    hostname = undefined
    site = undefined
    locale = undefined
  }

  return {
    ...defaults,
    ...options,

    devServer,

    site,
    locale,
    hostname,
  } as SFCCWebpackConfigOptions
}


/**
 * Generates a Webpack configuration by using an array of configuration functions which create webpack config sections.
 *
 * @param sections configuration functions which create a webpack config section
 * @param cartridge cartridge name
 * @param opts config options
 * @returns a Webpack config containing the generated config sections
 */
export const generateWebpackConfiguration = (
  sections: Record<string, ConfigurationFnc<unknown>>,
  cartridge: string,
  options: Partial<SFCCWebpackConfigOptions>,
): WebpackOptionsNormalized => {
  const intOptions = getOptions(options)

  return Object
    .entries(sections)
    // eslint-disable-next-line unicorn/no-array-reduce
    .reduce((previous, [key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (previous as any)[key] = value(cartridge, intOptions)
      return previous
    }, {}) as WebpackOptionsNormalized
}


/**
 * Change the name of the chunks. There are several problems with the default naming (like too long names).
 */
export const normalizeWebpack5ChunkName = (name: string): string => name
  .replaceAll('node_modules', 'nodemodules')
  .replaceAll(/[._|-]+/g, ' ')
  .replaceAll(/\b(vendors|nodemodules|js|modules|es)\b/g, '')
  .trim()
  .replaceAll(/ +/g, '-')
