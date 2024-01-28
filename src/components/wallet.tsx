'use client';

import { useWallet } from '@/hooks/wallet';

export default function Wallet() {
  const [wallet] = useWallet();

  return (
    <div className="max-w-xs h-44 rounded-xl bg-gradient-to-br from-slate-300 via-zinc-50 to-slate-300 shadow-lg px-8 py-8 flex flex-col justify-between">
      <div className="flex justify-between">
        <span className="font-semibold text-zinc-400">ETH</span>
        <span className="text-2xl font-thin text-gray-800">
          {wallet.balance}
        </span>
      </div>
      <div className="w-[155px] text-ellipsis break-words">
        <span className="text-xs font-mono text-gray-800">
          {wallet.address}
        </span>
      </div>
    </div>
  );
}
