import Card from '@/components/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-3 p-3">
      <Link href="/marketplaces">
        <Card className="text-center py-32">
          <span className="text-2xl font-thin">Marketplace</span>
        </Card>
      </Link>
      <Link href="/manager">
        <Card className="text-center py-32">
          <span className="text-2xl font-thin">Manager</span>
        </Card>
      </Link>
    </div>
  );
}
