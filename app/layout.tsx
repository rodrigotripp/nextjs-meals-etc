import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/app/components/AppProviders';
import Footer from './components/Footer';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TheMealDB Explorer',
  description: 'TheMealDB Explorer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {' '}
        <main className="flex min-h-screen flex-col items-center justify-between ">
          <AppProviders>
            <Header />
            {children}
            <Footer />
          </AppProviders>
        </main>
      </body>
    </html>
  );
}
