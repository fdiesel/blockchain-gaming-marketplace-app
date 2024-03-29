import Card from '@/components/Card';
import { Item as ItemType } from '@/entities/item';
import { useCurrency } from '@/hooks/currency';

export default function Item({ item }: { item: ItemType }) {
  const [getValue, currency] = useCurrency();
  return (
    <Card className="flex flex-col items-center gap-3">
      <img className="w-28 h-28" src={item.imageSrc} alt={item.name} />
      <span className="font-thin text-2xl">{item.name}</span>
      <span>
        {getValue(item.price)} <span className="font-thin">{currency}</span>
      </span>
    </Card>
  );
}
