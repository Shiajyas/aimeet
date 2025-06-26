'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
/**
 * Returns a React Query client instance, creating a new one per request on the server and reusing a singleton on the browser.
 *
 * Ensures that only one query client is used on the client side to prevent issues with React Suspense and re-renders.
 * On the server, a new client is created for each invocation to avoid cross-request state sharing.
 *
 * @returns The React Query client instance
 */
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
/**
 * Returns the tRPC API endpoint URL based on the current environment.
 *
 * On the client, returns a relative path. On the server, constructs the URL using the `NEXT_PUBLIC_VERCEL_URL` environment variable as the base.
 *
 * @returns The tRPC API endpoint URL as a string.
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return process.env.NEXT_PUBLIC_VERCEL_URL;
  })();
  return `${base}/api/trpc`;
}
/**
 * Provides React Query and tRPC context to its child components for client-side data fetching and tRPC hook usage.
 *
 * Wraps children with both `QueryClientProvider` and `TRPCProvider`, ensuring a properly configured React Query client and tRPC client are available throughout the component tree.
 *
 * @param children - The React elements to receive the provider context
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          // transformer: superjson, <-- if you use a data transformer
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}