# Adastra Necessary Template ✨

```bash
npm create adastra@latest -- --template necessary
```

Using Yarn/PNPM

```bash
yarn create adastra@latest --template necessary
# pnpm create adastra@latest --template necessary
```

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=603560480)

> 🧑‍🚀 **Hey astronaut?** Have fun building Shopify themes with Adastra!

![necessary](https://raw.githubusercontent.com/odestry/adastra/main/.github/assets/minimal-template-banner.png)

## Launch development server

### Using Adastra CLI ✨

To launch the development server for the first time, you will need to replace the development command inside the `package.json` with the following:

```json
"scripts": {
  - "dev": "adastra dev",
  "dev": "adastra dev -s example-store.myshopify.com",
  ...
}
```

> 💡 The command will launch two dev servers, the first for Vite at `localhost:5173` to server static files from the `src` directory and the second for Shopify at `localhost:9292` to serve your theme.

### Using Vite and Shopify CLI

```json
"scripts": {
  - "dev": "adastra dev",
  "dev": "vite",
  "dev:shopify": "shopify theme dev -s example-store.myshopify.com",
  "build": "vite build",
  ...
}
```

> 💡 Both commands will launch two dev servers, however you will need to spawn two terminal sessions for each server.

## Theme Structure

Inside your Adastra ✨ theme project, you'll see the following folders and files.

1. Most Shopify themes files and folders remain the same.
2. There is only one additional **Super Special** folder called `src` (you can change its name in `vite.config.js` file).
3. Instead of directly editing static assets in the theme `assets` directory, you will use the new `src` directory instead.
4. Static files inside the `src` directory are served by [Vite](https://vitejs.dev).
5. When launching the developement sever command `npm run dev` the command launches two dev servers, one for [Vite](https://vitejs.dev) to serve static files and the other one for Shopify to upload the development theme to remote Shopify server (Takes a bit of time).

```shell
/
├── assets
├── config
├── layout
├── locales
├── sections/
│   └── hello-world.liquid
├── snippets/
│   └── colors.liquid
├── src/  # Source directory (name can be changed in vite.config.js)
│   ├── entrypoints/ # Entrypoints directory (name can be changed in vite.config.js)
│   │   ├── base.css
│   │   └── index.js
│   └── hello-world.js
├── templates
├── vite.config.js
└── package.json
```

Adastra ✨ detects entrypoint files automatically in the `entrypoints/` directory. In this case `base.css` for styles and `index.js` for modules.

So everything you import to these two files will be shipped to the theme `assets` folder when building for production.

You can create other folders like `src/utils/` if you want, or a `src/components/` folder for Native/React/Vue/Lit/Preact components. Only the files/modules imported in the entrypoint files will be served by Vite.

Any static assets, like custom fonts, manifest files, `.css.liquid` or `.js.liquid`, can be placed inside the `assets` theme folder, just make sure to add the configuration below to avoid clearing the assets directory when building for production.

```js
// vite.config.js

import { defineConfig } from 'vite'
import adastra from 'adastra-plugin'

export default defineConfig({
  plugins: [adastra()],
  build: {
    emptyOutDir: false
  }
})
```

## Commands

Adastra CLI ✨ is built on top of Shopify CLI 3.X, this means that existing Adastra commands are the same as Shopify's.

```bash
adastra dev -s example-store.myshopify.com
# same as shopify theme dev -s example-store.myshopify.com
```

All commands are run from the root of the theme project, from a terminal:

### Other commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run build`        | Build and minifies your production static files to `./assets/` folder |
| `npm run preview`      | Preview of your remote development theme, before deploying |
| `npm run check`        | Run theme check to lint the theme |
| `npm run adastra ...`    | Run CLI commands like `adastra dev`, `adastra check` |
| `npm run adastra --help` | Get help using the Adastra CLI |

## Want to learn more?

Feel free to check [our documentation](https://docs.odestry.com) or jump into our [Discord server](https://help.odestry.com).
