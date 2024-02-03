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
      <div>
        <div className="text-2xl">{marketplace.name}</div>
        <table>
          <tbody>
            <tr className="text-sm">
              <td className="font-light">Address:</td>
              <td className="font-mono">{marketplace.address}</td>
            </tr>
            <tr className="text-sm">
              <td className="font-light">Owner:</td>
              <td className="font-mono">{marketplace.owner}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
