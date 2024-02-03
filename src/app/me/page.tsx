'use client';

import Card from '@/components/Card';
import Item from '@/components/Item';
import MarketplaceHeader from '@/components/MarketplaceHeader';
import { Item as ItemType } from '@/entities/item';
import { Marketplace as MarketplaceType } from '@/entities/marketplace';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useMarketplaceFactoryContract } from '@/hooks/marketplace-factory-contract';
import { useMetaMask } from 'metamask-react';
import { useEffect, useState } from 'react';

type Props = {
  marketplace: MarketplaceType;
  items: ItemType[];
};

export default function MePage() {
  const { account } = useMetaMask();
  const { getMarketplacesWithBoughtItems } = useMarketplaceFactoryContract();
  const { getContract } = useMarketplaceContract();
  const [data, setData] = useState<Props[]>([]);
  useEffect(() => {
    if (account) {
      getMarketplacesWithBoughtItems(account).then((marketplaceAddressList) => {
        Promise.all(
          marketplaceAddressList.map((marketplaceAddress) =>
            getContract(marketplaceAddress)
          )
        )
          .then((contracts) =>
            Promise.all(
              contracts.map((contract) =>
                Promise.all([contract.get(), contract.getItemsByBuyer(account)])
              )
            )
          )
          .then((results) =>
            results.map(([marketplace, items]) => ({ marketplace, items }))
          )
          .then(setData);
      });
    }
  }, [account, getMarketplacesWithBoughtItems, getContract]);
  return (
    <div className="p-3">
      <h1>Bought Items</h1>
      {data.map(({ marketplace, items }) => (
        <Card
          key={marketplace.address}
          className="my-3 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <div className="col-span-2 md:col-span-4">
            <MarketplaceHeader marketplace={marketplace} />
          </div>
          <div>
            {items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
