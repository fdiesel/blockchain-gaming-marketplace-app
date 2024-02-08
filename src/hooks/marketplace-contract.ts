import { Item } from '@/entities/item';
import { Marketplace } from '@/entities/marketplace';
import { Result, ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';
import { useCallback } from 'react';

export class MarketplaceContract {
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

  parseItem(result: Result): Item {
    return {
      id: result['0'].toString(),
      seller: result['1'],
      soldTo: result['2'],
      name: result['3'],
      imageSrc: result['4'],
      description: result['5'],
      price: result['6']
    };
  }

  matchValid(item: Item): boolean {
    return item.seller !== '0x0000000000000000000000000000000000000000';
  }

  async get(): Promise<Marketplace> {
    const [name, imageSrc, isOpen, owner] = await Promise.all([
      this.contract.name(),
      this.contract.imageSrc(),
      this.contract.isOpen(),
      this.contract.getOwner()
    ]);
    return {
      address: await this.contract.getAddress(),
      owner,
      name,
      imageSrc,
      isOpen
    };
  }

  async getUnsoldItems(): Promise<Item[]> {
    const itemsObject: Result = await this.contract.getAllItems();
    return Object.values(itemsObject)
      .map(this.parseItem)
      .filter(this.matchValid)
      .filter(
        (item) => item.soldTo === '0x0000000000000000000000000000000000000000'
      );
  }

  async getItemById(id: string): Promise<Item> {
    const itemObject: Result = await this.contract.getItemById(id);
    return this.parseItem(itemObject);
  }

  async getItemsByBuyer(buyer: string): Promise<Item[]> {
    const itemsObject: Result = await this.contract.getItemsByBuyer(buyer);
    return Object.values(itemsObject)
      .map(this.parseItem)
      .filter(this.matchValid);
  }

  async getItemsBySeller(seller: string): Promise<Item[]> {
    const itemsObject: Result = await this.contract.getItemsBySeller(seller);
    return Object.values(itemsObject)
      .map(this.parseItem)
      .filter(this.matchValid);
  }

  async addItem(
    name: string,
    imageSrc: string,
    description: string,
    price: bigint
  ) {
    return this.contract.addItem(name, imageSrc, description, price);
  }

  async purchaseItem(id: string, price: bigint) {
    const options = { value: price };
    return this.contract.purchaseItem(id, options);
  }

  async addAuthorisedAddress(address: string) {
    return this.contract.addAuthorisedAddresses([ethers.getAddress(address)]);
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
