import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/index';
import { ssrPrepass } from '@trpc/next/ssrPrepass';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // In the browser, we return a relative URL
    return '';
  }
  // When rendering on the server, we return an absolute URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// Create tRPC client
export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
      };
    }
    return {
      links: [
        httpBatchLink({
          // The server needs to know your app's full url
          url: `${getBaseUrl()}/api/trpc`,

          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            // To use SSR properly, you need to forward client headers to the server
            // This is so you can pass through things like cookies when we're server-side rendering
            return {
              cookie: ctx.req.headers.cookie,
            };
          },
        }),
      ],
    };
  },
});
