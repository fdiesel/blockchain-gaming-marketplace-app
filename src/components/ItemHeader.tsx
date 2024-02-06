import Card from '@/components/Card';
import { Item as ItemType } from '@/entities/item';
import { useCurrency } from '@/hooks/currency';

export default function ItemHeader({ item }: { item: ItemType }) {
  const [getValue, currency] = useCurrency();
  return (
    <Card className="flex items-start gap-3">
      <img className="w-28 h-28" src={item.imageSrc} alt={item.name} />
      <div>
        <p className="text-2xl">{item.name}</p>
        <p>{item.description}</p>
      </div>
    </Card>
  );
}
