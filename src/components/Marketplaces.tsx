'use client';

import Marketplace from '@/components/Marketplace';
import { Marketplace as MarketplaceType } from '@/entities/marketplace';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useMarketplaceFactoryContract } from '@/hooks/marketplace-factory-contract';
import { useEffect, useState } from 'react';

export default function Marketplaces() {
  const { getMarketplaces } = useMarketplaceFactoryContract();
  const { getContract } = useMarketplaceContract();
  const [marketplaces, setMarketplaces] = useState<MarketplaceType[]>([]);
  useEffect(() => {
    getMarketplaces().then((marketplaces) => {
      Promise.all(marketplaces.map((address) => getContract(address)))
        .then((contracts) =>
          Promise.all(contracts.map((contract) => contract.get()))
        )
        .then(setMarketplaces);
    });
  }, [getMarketplaces, getContract]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3">
      {marketplaces.map((marketplace, i) => (
        <Marketplace key={i} marketplace={marketplace} />
      ))}
    </div>
  );
}
