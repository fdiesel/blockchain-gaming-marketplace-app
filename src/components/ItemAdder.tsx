'use client';

import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { FormEvent } from 'react';

export default function ItemAdder({ address }: { address: string }) {
  const { getContract } = useMarketplaceContract();

  function addItem(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const imageSrc = formData.get('imageSrc') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    getContract(address).then((contract) =>
      contract.addItem(name, imageSrc, description, price)
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={addItem}>
      <h3>Add Item</h3>
      <input type="text" placeholder="Name" name="name" />
      <input type="text" placeholder="Image Source" name="imageSrc" />
      <input type="text" placeholder="Description" name="description" />
      <input type="number" pattern="[0-9]+" placeholder="Pricce" name="price" />
      <button type="submit">Add Item</button>
    </form>
  );
}
