'use client';

import { ethers } from 'ethers';
import React, { useCallback, useState } from 'react';

export enum Currency {
  WEI = 'wei',
  KWEI = 'kwei',
  MWEI = 'mwei',
  GWEI = 'gwei',
  SZABO = 'szabo',
  FINNEY = 'finney',
  ETHER = 'ether'
}

function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useCtx, CtxProvider] =
  createCtx<
    readonly [
      (wei: string) => string,
      Currency,
      React.Dispatch<React.SetStateAction<Currency>>
    ]
  >();

export function useCurrency(): ReturnType<typeof useCtx> {
  return useCtx();
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(Currency.ETHER);

  const getValue = useCallback(
    (wei: string): string => ethers.formatUnits(wei, currency),
    [currency]
  );

  return (
    <CtxProvider value={[getValue, currency, setCurrency] as const}>
      {children}
    </CtxProvider>
  );
}
