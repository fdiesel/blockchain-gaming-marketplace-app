'use client';

import { useCustomContract } from '@/hooks/custom-contract';
import { useCallback } from 'react';

export function useMarketplaceFactoryContract() {
  const { getContract } = useCustomContract(
    process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE_FACTORY_ADDRESS!,
    require('@/abis/marketplace-factory.json')
  );

  return {
    createMarketPlace: useCallback(
      async (name: string, image: string) => {
        const contract = await getContract();
        contract.createMarketplace(name, image);
      },
      [getContract]
    ),
    getMarketplaces: useCallback(async (): Promise<string[]> => {
      const contract = await getContract();
      const marketplacesObject = await contract.getMarketplaces();
      return Object.values(marketplacesObject);
    }, [getContract])
  };
}
