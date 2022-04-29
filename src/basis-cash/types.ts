import ERC20 from './ERC20';

export type ContractName = string;

export interface MineInfo {
  name: string;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
}

export interface Mine extends  MineInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type TokenStat = {
  priceInDAI: string;
  TokenSymboltotalSupply: string;
};

export type TreasuryAllocationTime = {
  prevAllocation: Date;
  nextAllocation: Date;
}
