'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/app/_state/store'
import TRPCProvider from '@/app/_trpc/Provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </TRPCProvider>
  );
}