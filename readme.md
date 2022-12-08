# Replicate `vite-plugin-ssr` pre-rendering + `AWS Amplify UI` issue

Vite codebase is copied from `react-full` example of `vite-plugin-ssr`:
https://github.com/brillout/vite-plugin-ssr/tree/main/examples/react-full

Installed `aws-amplify` and added the [required workarounds](https://github.com/aws/aws-sdk-js/issues/3673) for Vite:

- `_default.page.server.tsx` -> add `window.global`
- `vite.config.ts` -> add `runtimeConfig.browser` alias

Installed `@aws-amplify/ui-react`, imported any of it's modules (e.g. `useAuthenticator`), and then `vite build` stopped working. Getting error:

```bash
vite-plugin-ssr v0.4.54 pre-rendering HTML...
file:///Users/micah/Sites/vite-prerender-aws-amplify-compat/dist/server/assets/index.page.1542a395.js:2
import { useAuthenticator } from "@aws-amplify/ui-react";
         ^^^^^^^^^^^^^^^^
SyntaxError: Named export 'useAuthenticator' not found. The requested module '@aws-amplify/ui-react' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '@aws-amplify/ui-react';
const { useAuthenticator } = pkg;

    at ModuleJob._instantiate (node:internal/modules/esm/module_job:123:21)
    at async ModuleJob.run (node:internal/modules/esm/module_job:189:5)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async pageFile.loadFile (/Users/micah/Sites/vite-prerender-aws-amplify-compat/node_modules/vite-plugin-ssr/dist/cjs/shared/getPageFiles/parseGlobResults.js:25:40)
    at async Promise.all (index 0)
    at async loadPageFilesServerSide (/Users/micah/Sites/vite-prerender-aws-amplify-compat/node_modules/vite-plugin-ssr/dist/cjs/shared/getPageFiles/analyzePageServerSide/loadPageFilesServerSide.js:8:5)
    at async Promise.all (index 0)
    at async loadPageFilesServer (/Users/micah/Sites/vite-prerender-aws-amplify-compat/node_modules/vite-plugin-ssr/dist/cjs/node/renderPage.js:383:69)
    at async /Users/micah/Sites/vite-prerender-aws-amplify-compat/node_modules/vite-plugin-ssr/dist/cjs/node/prerender.js:203:48
```

## Steps

```bash
git clone https://github.com/micah-redwood/vite-prerender-aws-amplify-compat.git
cd vite-prerender-aws-amplify-compat
npm install
npm run build
```
