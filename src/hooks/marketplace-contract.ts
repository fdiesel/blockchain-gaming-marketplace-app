import { ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';
import { useCallback } from 'react';

class MarketplaceContract {
  private contract: ethers.Contract;

  constructor(
    address: string,
    runner?: ethers.ContractRunner | null | undefined
  ) {
    this.contract = new ethers.Contract(
      address,
      require('@/abis/marketplace.json'),
      runner
    );
  }

  async get() {
    const [name, imageSrc, isOpen, owner] = await Promise.all([
      this.contract.name(),
      this.contract.imageSrc(),
      this.contract.isOpen(),
      this.contract.owner()
    ]);
    return {
      address: await this.contract.getAddress(),
      name,
      imageSrc,
      isOpen,
      owner
    };
  }

  async getAllItems() {
    return this.contract.getAllItems();
  }

  async addItem(
    name: string,
    imageSrc: string,
    description: string,
    price: number
  ) {
    return this.contract.addItem(
      name,
      imageSrc,
      description,
      ethers.parseEther(price.toString())
    );
  }
}

export function useMarketplaceContract() {
  const { ethereum } = useMetaMask();

  const getContract = useCallback(
    async (address: string) => {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      return new MarketplaceContract(address, signer);
    },
    [ethereum]
  );

  return {
    getContract
  };
}
