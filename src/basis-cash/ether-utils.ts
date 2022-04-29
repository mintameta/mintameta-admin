//@ts-nocheck
import Web3 from "web3";
import { defaultEthereumConfig, EthereumConfig } from "./config";
import BigNumber from "bignumber.js";

export function web3ProviderFrom(
  endpoint: string,
  config?: EthereumConfig
): any {
  const ethConfig = Object.assign(defaultEthereumConfig, config || {});

  const providerClass = endpoint.includes("wss")
    ? Web3.providers.WebsocketProvider
    : Web3.providers.HttpProvider;

  return new providerClass(endpoint, {
    timeout: ethConfig.ethereumNodeTimeout,
  });
}

export function decimalToBalance(d: string | number, decimals = 18): BigNumber {
  return new BigNumber(d).times(Math.pow(10, decimals)).toFixed(0,1);
}
