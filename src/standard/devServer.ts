/* eslint-disable unicorn/filename-case */
// eslint-disable-next-line unicorn/prevent-abbreviations
import type { WebpackOptionsNormalized } from 'webpack'
import type { ConfigurationFnc } from '../types.js'


// eslint-disable-next-line unicorn/prevent-abbreviations
const devServerConfig: ConfigurationFnc<WebpackOptionsNormalized['devServer']> = (cartridge, {
  devServer, site, locale, hostname,
}) => (devServer
  ? {
    server: 'https',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    proxy: {
      '*': {
        target: `https://${hostname}/`,
        secure: false,
        changeOrigin: true,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setupMiddlewares: (middlewares: any, server: any) => {
      if (!server) {
        throw new Error('webpack-dev-server is not defined')
      }

      server.app.get(
        `/on/demandware.static/Sites-${
          site
        }-Site/-/${locale}/:hash(v(\\w{0,}))/:staticfile(\\S*)`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (request: any, response: any) => {
          response.redirect(`/on/demandware.static/Sites-${
            site
          }-Site/-/${locale}/${request.params.staticfile}`)
        },
      )
      return middlewares
    },
  }
  : undefined)


export default devServerConfig
