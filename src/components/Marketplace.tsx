import { Marketplace as MarketplaceType } from '@/entities/marketplace';
import Link from 'next/link';

export default function Marketplace({
  marketplace
}: {
  marketplace: MarketplaceType;
}) {
  return (
    <Link
      className="p-3 bg-zinc-100/50 rounded-xl shadow-xl flex flex-col items-center gap-3"
      href={`marketplaces/${marketplace.address}/items`}
    >
      <img
        className="w-32 h-32"
        src={marketplace.imageSrc}
        alt={marketplace.name}
      />
      <span className="text-xl font-extralight">{marketplace.name}</span>
    </Link>
  );
}
