'use client';

import Card from '@/components/Card';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { useMarketplaceFactoryContract } from '@/hooks/marketplace-factory-contract';
import { ethers } from 'ethers';

export default function Init() {
  const { createMarketPlace, getMarketplaces } =
    useMarketplaceFactoryContract();
  const { getContract } = useMarketplaceContract();
  function initMarketplaces() {
    Promise.all([
      createMarketPlace(
        'Dota 2',
        'https://upload.wikimedia.org/wikipedia/de/e/ef/Dota_2_logo.jpg'
      )
    ]);
  }
  function initItems() {
    getMarketplaces()
      .then((addresses) => Promise.all(addresses.map(getContract)))
      .then(([dota2]) =>
        Promise.all([
          dota2.addItem(
            'Staff',
            'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KW1Zwwo4NUX4oFJZEHLbXK9QlSPcU0qBhYQEnDVNu72MbXHFB1JgFoubyaKgJv3eCHfDxB6eO5kr-Kkvj6IPWFwmlUupxw3L-VoY6kigWx_EVtY2uictLAcgE8NFmE_VC4yO3u0cC7ot2Xnp3Azok9/160x160',
            'Staff of the Master',
            ethers.parseEther('1')
          )
        ])
      );
  }
  return (
    <div className="p-3">
      <Card className="flex gap-3">
        <button
          className="form-control bg-black text-white"
          type="button"
          onClick={initMarketplaces}
        >
          Create Sample Marketplaces
        </button>
        <button
          className="form-control bg-black text-white"
          type="button"
          onClick={initItems}
        >
          Create Sample Items
        </button>
      </Card>
    </div>
  );
}
