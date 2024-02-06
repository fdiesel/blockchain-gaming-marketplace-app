import { Marketplace } from '@/entities/marketplace';

export default function MarketplaceHeader({
  marketplace
}: {
  marketplace: Marketplace;
}) {
  return (
    <div className="p-3 bg-zinc-100/30 rounded-xl shadow-xl flex gap-3">
      <div>
        <img
          className="w-20 h-20"
          src={marketplace.imageSrc}
          alt={marketplace.name}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-2xl">{marketplace.name}</div>
        <div>
          <p className="text-xs">Address</p>
          <p className="break-words">{marketplace.address}</p>
        </div>
        <div>
          <p className="text-xs">Owner</p>
          <p className="break-words">{marketplace.owner}</p>
        </div>
      </div>
    </div>
  );
}
