'use client';

import Item from '@/components/Item';
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
  return <div className="px-3 pb-3">{item && <Item item={item} />}</div>;
}
