'use client';

import { ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';
import { useCallback } from 'react';

export function useCustomContract(address: string, abi: any) {
  const { ethereum } = useMetaMask();

  const getContract = useCallback(async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(address, abi, signer);
  }, [ethereum, address, abi]);

  return {
    getContract
  };
}
