'use client';

import { Item } from '@/entities/item';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useMetaMask } from 'metamask-react';
import Card from './Card';

export default function Purchase({
  marketplaceAddress,
  item
}: {
  marketplaceAddress: string;
  item: Item;
}) {
  const { account } = useMetaMask();
  const { getContract } = useMarketplaceContract();
  function purchase() {
    getContract(marketplaceAddress).then((contract) => {
      contract.purchaseItem(item.id, item.price);
    });
  }
  return (
    <Card className="flex flex-col gap-3">
      <div>
        <p className="text-xs">From</p>
        <p className="break-words">{item.seller.toLowerCase()}</p>
      </div>
      <div>
        <p className="text-xs">To</p>
        <p className="break-words">{account}</p>
      </div>
      <div>
        <p className="text-xs">Price</p>
        <p className="break-words">{item.price} ETH</p>
      </div>
      <button className="bg-black text-white" type="button" onClick={purchase}>
        Buy
      </button>
    </Card>
  );
}
