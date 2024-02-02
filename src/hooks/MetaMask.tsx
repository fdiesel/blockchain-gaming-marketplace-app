'use client';

import { MetaMaskProvider } from 'metamask-react';

export default function MetaMask({ children }: { children: React.ReactNode }) {
  return <MetaMaskProvider>{children}</MetaMaskProvider>;
}
