import Wallet from '@/components/wallet';
import MetaMask from '@/hooks/MetaMask';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Marketplace'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MetaMask>
          <main className="max-w-screen-xl mx-auto h-full flex flex-col md:flex-row">
            <div className="md:max-w-sm p-3">
              <Wallet />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="px-3 pt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  className="block text-center px-3 py-2 bg-zinc-100 rounded-lg font-semibold"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="block text-center px-3 py-2 bg-zinc-100 rounded-lg font-semibold"
                  href="/me"
                >
                  Me
                </Link>
                <Link
                  className="block text-center px-3 py-2 bg-zinc-100 rounded-lg font-semibold"
                  href="/marketplaces"
                >
                  Marketplaces
                </Link>
                <Link
                  className="block text-center px-3 py-2 bg-zinc-100 rounded-lg font-semibold"
                  href="/manager"
                >
                  Manager
                </Link>
              </div>
              <div>{children}</div>
            </div>
          </main>
        </MetaMask>
      </body>
    </html>
  );
}
