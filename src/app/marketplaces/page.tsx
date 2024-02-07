'use client';

import Marketplace from '@/components/Marketplace';
import SearchInput from '@/components/SearchInput';
import { Marketplace as MarketplaceType } from '@/entities/marketplace';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useMarketplaceFactoryContract } from '@/hooks/marketplace-factory-contract';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Marketplaces() {
  const { getMarketplaces } = useMarketplaceFactoryContract();
  const { getContract } = useMarketplaceContract();
  const [marketplaces, setMarketplaces] = useState<MarketplaceType[]>([]);
  const [query, setQuery] = useState('');
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
      <div className="col-span-3">
        <h1>Marketplaces</h1>
      </div>
      <div className="col-span-3">
        <SearchInput
          placeholder="Name / Address"
          onChange={setQuery}
          onClear={setQuery}
        />
      </div>
      {marketplaces
        .filter(
          (m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.address.toLowerCase().includes(query.toLowerCase())
        )
        .map((marketplace, i) => (
          <Link
            href={`/marketplaces/${marketplace.address}/items`}
            key={marketplace.address}
          >
            <Marketplace marketplace={marketplace} />
          </Link>
        ))}
    </div>
  );
}
