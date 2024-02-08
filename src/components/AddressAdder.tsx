import Card from '@/components/Card';
import { useMarketplaceContract } from '@/hooks/marketplace-contract';
import { FormEvent } from 'react';

export default function AddressAdder({ address }: { address: string }) {
  const { getContract } = useMarketplaceContract();
  function submit(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const input = formData.get('address') as string;
    getContract(address).then((contract) =>
      contract.addAuthorisedAddress(input)
    );
  }
  return (
    <Card className="w-full max-w-sm">
      <form className="flex flex-col gap-3" onSubmit={submit}>
        <input
          className="form-control"
          name="address"
          type="text"
          placeholder="Address"
        />
        <button className="form-control bg-black text-white" type="submit">
          Authorize Address
        </button>
      </form>
    </Card>
  );
}
