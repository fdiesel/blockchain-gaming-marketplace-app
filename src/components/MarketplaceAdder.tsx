'use client';

import { useMarketplaceFactoryContract } from '@/hooks/marketplace-factory-contract';
import { FormEvent, useState } from 'react';

export default function MarketplaceAdder() {
  const { createMarketPlace } = useMarketplaceFactoryContract();
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  function addMarketplace(event: FormEvent) {
    event.preventDefault();
    setStatus('loading');
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const imageSrc = formData.get('imageSrc') as string;
    createMarketPlace(name, imageSrc)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }
  return (
    <form
      className="w-full max-w-sm bg-zinc-100/30 rounded-xl shadow-xl p-3 flex flex-col gap-3"
      onSubmit={addMarketplace}
    >
      <input
        className="form-control"
        type="text"
        placeholder="Name"
        name="name"
      />
      <input
        className="form-control"
        type="text"
        placeholder="Image Source"
        name="imageSrc"
        value="https://picsum.photos/200"
        readOnly
      />
      <button className="form-control bg-black text-white" type="submit">
        Create Marketplace
      </button>
    </form>
  );
}
