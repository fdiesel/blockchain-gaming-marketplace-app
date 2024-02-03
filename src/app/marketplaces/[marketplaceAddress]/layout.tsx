'use client';

import MarketplaceHeader from '@/components/MarketplaceHeader';
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
  useEffect(() => {
    const contract = getContract(marketplaceAddress);
    contract.then((contract) => contract.get()).then(setMarketplace);
  }, [getContract, marketplaceAddress]);
  return (
    <div>
      <div className="p-3">
        <h1 className="mb-3">Marketplace</h1>
        {marketplace && <MarketplaceHeader marketplace={marketplace} />}
      </div>
      <div>{children}</div>
    </div>
  );
}
