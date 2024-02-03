'use client';

import MarketplaceHeader from '@/components/MarketplaceHeader';
import { Item as ItemType } from '@/entities/item';
import { Marketplace } from '@/entities/marketplace';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useEffect, useState } from 'react';

export default function MarketplaceLayout({
  params: { marketplaceAddress },
  children
}: {
  params: { marketplaceAddress: string };
  children: React.ReactNode;
}) {
  const { getContract } = useMarketplaceContract();
  const [marketplace, setMarketplace] = useState<Marketplace>();
  const [items, setItems] = useState<ItemType[]>([]);
  useEffect(() => {
    const contract = getContract(marketplaceAddress);
    contract.then((contract) => contract.get()).then(setMarketplace);
    contract.then((contract) => contract.getAllItems()).then(setItems);
  }, [getContract, marketplaceAddress]);
  return (
    <div>
      <div className="p-3">
        {marketplace && <MarketplaceHeader marketplace={marketplace} />}
      </div>
      <div>{children}</div>
    </div>
  );
}
