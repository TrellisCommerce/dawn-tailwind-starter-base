import { defineConfig } from 'vite';
import adastra from 'adastra-plugin';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

const PACKAGE_PREFIX = 'wan';

export default ({ command, mode }) => {
  return defineConfig({
    server: {
      port: 3000,
      // https: true,
    },
    build: {
      emptyOutDir: false,
      rollupOptions: {
        output: {
          assetFileNames: `${PACKAGE_PREFIX}-[name]-[hash][extname]`,
          entryFileNames: `${PACKAGE_PREFIX}-[name]-[hash].js`,
          chunkFileNames: `${PACKAGE_PREFIX}-chunk-[name]-[hash].js`,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    app: 'mpa',
    plugins: [
      adastra(),
      delayFullReload(),
      basicSsl({
        /** name of certification */
        name: 'model-motorcars',
      }),
    ],
  });
};

const delayFullReload = () => ({
  name: 'delay-full-reload',
  handleHotUpdate({ server }) {
    setTimeout(() => {
      server.ws.send({
        type: 'full-reload',
      });
    }, 1000);

    return [];
  },
});
