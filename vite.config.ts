import { UserConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';

import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';

export default {
  plugins: [
    react(),
    mdx(),
    ssr({
      prerender: true,
    }),
  ],
  // We manually add a list of dependencies to be pre-bundled, in order to avoid a page reload at dev start which breaks vite-plugin-ssr's CI
  // (The 'react/jsx-runtime' entry is not needed in Vite 3 anymore.)
  optimizeDeps: { include: ["cross-fetch", "react/jsx-runtime"] },
  // Fix AWS Amplify issue where incorrect entry point is used
  // Error: 'request' is not exported by __vite-browser-external, imported by node_modules/@aws-sdk/credential-provider-imds/dist/es/remoteProvider/httpRequest.js
  // Github Issue: https://github.com/aws/aws-sdk-js/issues/3673
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
} as UserConfig;
