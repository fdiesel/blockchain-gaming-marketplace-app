import Card from '@/components/Card';
import { Marketplace as MarketplaceType } from '@/entities/marketplace';

export default function Marketplace({
  marketplace
}: {
  marketplace: MarketplaceType;
}) {
  return (
    <Card className="flex flex-col items-center gap-3">
      <img
        className="w-32 h-32"
        src={marketplace.imageSrc}
        alt={marketplace.name}
      />
      <span className="text-xl font-extralight">{marketplace.name}</span>
    </Card>
  );
}
