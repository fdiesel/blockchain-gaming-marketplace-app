import Wallet from '@/components/wallet';
import MetaMask from '@/hooks/MetaMask';
import type { Metadata } from 'next';
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
            <div className="flex-1 min-h-0">{children}</div>
          </main>
        </MetaMask>
      </body>
    </html>
  );
}
