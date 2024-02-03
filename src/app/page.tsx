import Card from '@/components/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
      <div className="md:col-span-3">
        <h1>Home</h1>
      </div>
      <Link href="/me">
        <Card className="text-center py-20">
          <span className="text-2xl font-thin">Me</span>
        </Card>
      </Link>
      <Link href="/marketplaces">
        <Card className="text-center py-20">
          <span className="text-2xl font-thin">Marketplaces</span>
        </Card>
      </Link>
      <Link href="/manager">
        <Card className="text-center py-20">
          <span className="text-2xl font-thin">Manager</span>
        </Card>
      </Link>
    </div>
  );
}
