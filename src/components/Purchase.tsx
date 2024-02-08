'use client';

import { Item } from '@/entities/item';
import { useCurrency } from '@/hooks/currency';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useMetaMask } from 'metamask-react';
import { useState } from 'react';
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
  const [getValue, currency] = useCurrency();
  const [msg, setMsg] = useState<string>();
  function purchase() {
    getContract(marketplaceAddress).then((contract) => {
      contract
        .purchaseItem(item.id, item.price)
        .then(() => setMsg('Purchased'))
        .catch(() => setMsg('Purchase Rejected'));
    });
  }
  return (
    <Card className="flex flex-col gap-3">
      <div>
        <p className="text-xs">Item From</p>
        <p className="break-words">{item.seller.toLowerCase()}</p>
      </div>
      <div>
        <p className="text-xs">Item To</p>
        <p className="break-words">{account}</p>
      </div>
      <div>
        <p className="text-xs">Price</p>
        <p className="break-words">
          {getValue(item.price)} <span className="font-thin">{currency}</span>
        </p>
      </div>
      <button
        className="form-control btn"
        type="button"
        onClick={purchase}
        disabled={!!msg}
      >
        {msg ?? 'Buy'}
      </button>
    </Card>
  );
}
