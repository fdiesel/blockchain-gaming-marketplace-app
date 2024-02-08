'use client';

import { Currency, useCurrency } from '@/hooks/currency';
import { useMetaMask } from 'metamask-react';
import Link from 'next/link';

function NavItem({
  children,
  href,
  className
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      className={`form-control text-center bg-zinc-100 text-gray-600 shadow-lg font-semibold ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}

export default function Menu() {
  const { status, connect } = useMetaMask();
  const [getValue, currency, setCurrency] = useCurrency();
  return (
    <nav className="grid grid-cols-6 gap-3">
      <div className="col-span-4">
        <button
          className="form-control w-full btn"
          type="button"
          onClick={connect}
          disabled={status === 'connected'}
        >
          {status === 'connected' ? 'Wallet Connected' : 'Connect MetaMask'}
        </button>
      </div>
      <div className="col-span-2">
        <select
          className="form-control w-full bg-zinc-100 text-gray-600"
          value={currency}
          onChange={(event) => setCurrency(event.target.value as Currency)}
        >
          {Object.values(Currency).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <NavItem className="col-span-6" href="/">
        Home
      </NavItem>
      <NavItem className="col-span-6" href="/me">
        Me
      </NavItem>
      <NavItem className="col-span-6" href="/marketplaces">
        Marketplaces
      </NavItem>
      <NavItem className="col-span-6" href="/manager">
        Manager
      </NavItem>
    </nav>
  );
}
