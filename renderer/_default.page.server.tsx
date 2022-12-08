import React from 'react';
import { renderToStream } from 'react-streaming/server';
import { escapeInject } from 'vite-plugin-ssr';

import { getPageTitle } from './getPageTitle';
import { PageShell } from './PageShell';

import type { PageContextServer } from "./types";

export { render };
export { passToClient };

const passToClient = ["pageProps", "documentProps", "someAsyncProps"];

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;

  const stream = await renderToStream(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
    // We don't need streaming for a pre-rendered app.
    // (We still use react-streaming to enable <Suspsense>.)
    { disable: true }
  );

  const title = getPageTitle(pageContext);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <script>
          // AWS Amplify needs this to work. See https://github.com/aws/aws-sdk-js/issues/3673
          const isBrowser = () => typeof window !== 'undefined';
          const isGlobal = () => typeof global !== 'undefined';
          if (!isGlobal() && isBrowser()) {
            var global = window;
          }
        </script>
        <div id="page-view">${stream}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    // We can return a `pageContext` promise
    pageContext: (async () => {
      return {
        someAsyncProps: 42,
      };
    })(),
  };
}
