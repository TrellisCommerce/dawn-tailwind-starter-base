import { defineConfig } from 'vite';
import adastra from 'adastra-plugin';
import path from 'path';
import glob from 'glob';
import fs from 'fs/promises';
import basicSsl from '@vitejs/plugin-basic-ssl';

const PACKAGE_PREFIX = 'mm';

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
      cleanOldAssets(),
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

const cleanOldAssets = () => ({
  name: 'clean-old-assets',
  closeBundle: async (code, id) => {
    try {
      // Load the JSON data directly
      const data = JSON.parse(
        await fs.readFile('assets/adastra.manifest.json', 'utf-8'),
      );
      const allowed_files = Object.values(data).map((item) => item.file);
      // find all files from previous builds
      const files = glob.sync(`assets/**/${PACKAGE_PREFIX}-*.{css,js}`);

      // loop through each file
      for (const file of files) {
        // check if the file is in the allowed list
        if (!allowed_files.includes(path.basename(file))) {
          // if not, delete the file
          await fs.unlink(file, () => {
            console.log(`Deleted ${file}`);
          });
        }
      }

      console.log('Cleaned up assets folder');
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  },
});
