'use client';

import Item from '@/components/Item';
import SearchInput from '@/components/SearchInput';
import { Item as ItemType } from '@/entities/item';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Marketplace({
  params: { marketplaceAddress }
}: {
  params: { marketplaceAddress: string };
}) {
  const { getContract } = useMarketplaceContract();
  const [items, setItems] = useState<ItemType[]>([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const contract = getContract(marketplaceAddress);
    contract.then((contract) => contract.getUnsoldItems()).then(setItems);
  }, [getContract, marketplaceAddress]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 pb-3">
      <div className="md:col-span-4">
        <h1>Items</h1>
      </div>
      <div className="md:col-span-4">
        <SearchInput
          placeholder="Name"
          onChange={setQuery}
          onClear={setQuery}
        />
      </div>
      {items
        .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => (
          <Link
            href={`/marketplaces/${marketplaceAddress}/items/${item.id}`}
            key={item.id}
          >
            <Item item={item} />
          </Link>
        ))}
    </div>
  );
}
