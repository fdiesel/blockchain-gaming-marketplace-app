'use client';

import Item from '@/components/Item';
import { Item as ItemType } from '@/entities/item';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useEffect, useState } from 'react';

export default function Marketplace({
  params: { marketplaceAddress }
}: {
  params: { marketplaceAddress: string };
}) {
  const { getContract } = useMarketplaceContract();
  const [items, setItems] = useState<ItemType[]>([]);
  useEffect(() => {
    const contract = getContract(marketplaceAddress);
    contract.then((contract) => contract.getAllItems()).then(setItems);
  }, [getContract, marketplaceAddress]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-3 pb-3">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
