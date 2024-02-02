'use client';

import ItemAdder from '@/components/ItemAdder';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useEffect, useState } from 'react';

export default function Marketplace({
  params: { address }
}: {
  params: { address: string };
}) {
  const { getContract } = useMarketplaceContract();
  const [marketplace, setMarketplace] = useState<any>();
  const [items, setItems] = useState([]);
  useEffect(() => {
    const contract = getContract(address);
    contract.then((contract) => contract.get()).then(setMarketplace);
    contract.then((contract) => contract.getAllItems()).then(console.log);
  }, [getContract, address]);
  return (
    <div>
      <div className="p-3 bg-zinc-100 rounded-xl shadow-xl flex gap-3">
        <div>
          <img
            className="w-20 h-20"
            src={marketplace?.imageSrc}
            alt={marketplace?.name}
          />
        </div>
        <div>
          <table>
            <tbody>
              <tr className="text-2xl">
                <td className="font-light">Marketplace:</td>
                <td>{marketplace?.name}</td>
              </tr>
              <tr>
                <td className="font-light">Address:</td>
                <td>{address}</td>
              </tr>
              <tr>
                <td className="font-light">Owner</td>
                <td>{marketplace?.owner}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ItemAdder address={address} />
      <div>
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}
