'use client';

import ItemAdder from '@/components/ItemAdder';
import MarketplaceAdder from '@/components/MarketplaceAdder';
import MarketplaceHeader from '@/components/MarketplaceHeader';
import { Marketplace } from '@/entities/marketplace';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useMarketplaceFactoryContract } from '@/hooks/marketplace-factory-contract';
import { useMetaMask } from 'metamask-react';
import { useEffect, useState } from 'react';

export default function Manager() {
  const { account } = useMetaMask();
  const { getMarketplaceByOwner } = useMarketplaceFactoryContract();
  const { getContract } = useMarketplaceContract();
  const [marketplace, setMarketplace] = useState<Marketplace | null>();
  useEffect(() => {
    if (account) {
      getMarketplaceByOwner(account).then((address) => {
        if (address) {
          getContract(address).then((contract) =>
            contract.get().then((marketplace) => setMarketplace(marketplace))
          );
        } else {
          setMarketplace(null);
        }
      });
    }
  }, [account, getMarketplaceByOwner, getContract]);
  return (
    <div className="flex flex-col gap-3 p-3">
      <div>
        <h1>Manager</h1>
      </div>
      {marketplace && (
        <>
          <MarketplaceHeader marketplace={marketplace} />
          <ItemAdder address={marketplace.address} />
        </>
      )}
      {marketplace === null && <MarketplaceAdder />}
    </div>
  );
}
