import MetaMask from '@/hooks/MetaMask';
import { CurrencyProvider } from '@/hooks/currency';
import type { Metadata } from 'next';
import Menu from './Menu';
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
          <CurrencyProvider>
            <main className="max-w-screen-xl mx-auto h-full flex flex-col md:flex-row">
              <div className="md:flex-1 md:max-w-xs p-3">
                <Menu />
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
            </main>
          </CurrencyProvider>
        </MetaMask>
      </body>
    </html>
  );
}
