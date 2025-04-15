import { trpc } from '@/app/_utils/trpc';
import type { AppProps } from 'next/app';
import React from 'react';
const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);