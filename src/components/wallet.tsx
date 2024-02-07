'use client';

import { ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';
import { useEffect, useState } from 'react';

export default function Wallet() {
  const { account, status, connect, ethereum } = useMetaMask();
  const [balance, setBalance] = useState<string>('NaN');
  useEffect(() => {
    if (account !== null) {
      new ethers.BrowserProvider(ethereum)
        .getBalance(account)
        .then(ethers.formatEther)
        .then(setBalance)
        .catch(console.error);
    }
  }, [account, ethereum]);
  return (
    <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-300 via-zinc-50 to-slate-300 shadow-lg px-8 py-8 flex flex-col justify-between">
      {status === 'connected' && (
        <>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-400">ETH</span>
            <span className="text-2xl font-thin text-gray-800 ms-3 truncate">
              {balance}
            </span>
          </div>
          <div className="w-[155px] text-ellipsis break-words">
            <span className="text-xs font-mono text-gray-800">{account}</span>
          </div>
        </>
      )}
      {status === 'notConnected' && (
        <div className="h-full flex justify-center items-center">
          <button
            className="form-control bg-zinc-300 rounded-full"
            type="button"
            onClick={connect}
          >
            Connect MetaMask
          </button>
        </div>
      )}
    </div>
  );
}
