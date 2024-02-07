'use client';

import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { ethers } from 'ethers';
import { FormEvent } from 'react';

export default function ItemAdder({ address }: { address: string }) {
  const { getContract } = useMarketplaceContract();

  function addItem(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const imageSrc = formData.get('imageSrc') as string;
    const description = formData.get('description') as string;
    const priceInWei = ethers.parseEther(formData.get('price') as string);
    getContract(address).then((contract) =>
      contract.addItem(name, imageSrc, description, priceInWei)
    );
  }

  return (
    <form
      className="w-full max-w-sm bg-zinc-100/30 rounded-xl shadow-xl p-3 flex flex-col gap-3"
      onSubmit={addItem}
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
      <input
        className="form-control"
        type="text"
        placeholder="Description"
        name="description"
      />
      <input
        className="form-control"
        type="number"
        step="0.000000000000000001"
        pattern="([0-9].,)+"
        placeholder="ETH"
        name="price"
      />
      <button className="form-control bg-black text-white" type="submit">
        Add Item
      </button>
    </form>
  );
}
