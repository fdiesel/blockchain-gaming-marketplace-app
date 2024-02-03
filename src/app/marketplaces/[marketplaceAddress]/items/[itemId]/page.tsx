'use client';

import Item from '@/components/Item';
import Purchase from '@/components/Purchase';
import { Item as ItemType } from '@/entities/item';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useEffect, useState } from 'react';

export default function ItemPage({
  params: { marketplaceAddress, itemId }
}: {
  params: { marketplaceAddress: string; itemId: string };
}) {
  const { getContract } = useMarketplaceContract();
  const [item, setItem] = useState<ItemType>();
  useEffect(() => {
    getContract(marketplaceAddress).then((contract) =>
      contract.getItemById(itemId).then(setItem)
    );
  }, [getContract, marketplaceAddress, itemId]);
  return (
    <div className="px-3 pb-3 grid grid-cols-1 md:grid-cols-12 gap-3">
      <div className="md:col-span-12">
        <h1>Item</h1>
      </div>
      {item && (
        <>
          <div className="md:col-span-8">
            <Item item={item} />
          </div>
          <div className="md:col-span-4">
            <Purchase marketplaceAddress={marketplaceAddress} item={item} />
          </div>
        </>
      )}
    </div>
  );
}
