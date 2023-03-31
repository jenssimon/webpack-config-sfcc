import type { WebpackOptionsNormalized } from 'webpack';
import type { ConfigurationFnc } from '../../types';

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
      '*': { // eslint-disable-line @typescript-eslint/naming-convention
        target: `https://${hostname}/`,
        secure: false,
        changeOrigin: true,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setupMiddlewares: (middlewares: any, server: any) => {
      if (!server) {
        throw new Error('webpack-dev-server is not defined');
      }

      server.app.get(
        `/on/demandware.static/Sites-${
          site
        }-Site/-/${locale}/:hash(v(\\w{0,}))/:staticfile(\\S*)`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (req: any, res: any) => {
          res.redirect(`/on/demandware.static/Sites-${
            site
          }-Site/-/${locale}/${req.params.staticfile}`);
        },
      );
      return middlewares;
    },
  }
  : undefined);

export default devServerConfig;
