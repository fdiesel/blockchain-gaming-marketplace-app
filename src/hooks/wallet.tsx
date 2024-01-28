'use client';

import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { Wallet } from '../models/wallet';

function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useCtx, CtxProvider] = createCtx<readonly [Wallet]>();

export function useWallet(): ReturnType<typeof useCtx> {
  return useCtx();
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet>({
    address: '',
    balance: 'NaN'
  });

  const load = useCallback(async () => {
    try {
      // Check if MetaMask is available
      // @ts-ignore
      if (typeof window.ethereum !== 'undefined') {
        // Request account access if needed
        // @ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a new Ethereum provider
        // @ts-ignore
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Get the user's address
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWallet((w) => ({ ...w, address }));

        // Fetch the balance
        const balance = await provider.getBalance(address);
        setWallet((w) => ({ ...w, balance: ethers.formatEther(balance) }));
      }
    } catch (error: any) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return <CtxProvider value={[wallet] as const}>{children}</CtxProvider>;
}
