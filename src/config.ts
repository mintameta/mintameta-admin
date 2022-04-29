//@ts-nocheck
// import { ChainId } from "@uniswap/sdk";
// import { Configuration } from "./basis-cash/config";
import { MineInfo } from "./basis-cash";
import { formatUnits } from "ethers/lib/utils";
import { BigNumber } from "ethers";

// debug true:测试  false:正式
const devUrl = ["test","dectest", "localhost", "192.168","8.210.239.89"]

const getEnv = () => {
  const link = window.location.href
  let isDebug = false
  for (let k in devUrl) {
    if (link.indexOf(devUrl[k]) !== -1){
      isDebug = true
    }
  }
  return isDebug
}
let debug = getEnv()
// debug = false
console.log('debug', debug)

const data = {
  build: {
    name: 'build',
    httpsApi: 'https://api.tia.finance/',
    chainId: 56,
    etherscanUrl: "https://bscscan.com/address/",
    defaultProvider:
        "https://bsc-dataseed1.binance.org/",
    deployments: require("./basis-cash/deployments/deployments.mainnet.json"),
    externalTokens: {
      ASET: ["0x139cec55d1ec47493dfa25ca77c9208aba4d3c68", 18],
      USDT: ["0xdac17f958d2ee523a2206206994597c13d831ec7", 6],
      NEST: ["0x04abEdA201850aC0124161F037Efd70c74ddC74C", 18],
      PUSD: ["0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0", 18],
      PETH: ["0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD", 18],
      ETH: ["0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD", 18],
    },
    refreshInterval: 1000,
    asetPrice:2
  },
  dev: {
    name: 'dev',
    httpsApi: 'https://api.ssp.finance/',
    chainId: 97,
    etherscanUrl: "https://testnet.bscscan.com/address/",
    defaultProvider:
      "https://data-seed-prebsc-1-s1.binance.org:8545",
    deployments: require("./basis-cash/deployments/deployments.mainnet.json"),
    externalTokens: {
      ASET: ["0x139cec55d1ec47493dfa25ca77c9208aba4d3c68", 18],
      USDT: ["0xdac17f958d2ee523a2206206994597c13d831ec7", 6],
      NEST: ["0x04abEdA201850aC0124161F037Efd70c74ddC74C", 18],
      PUSD: ["0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0", 18],
      PETH: ["0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD", 18],
      ETH: ["0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD", 18],
    },
    refreshInterval: 1000,
    asetPrice:2
  }
};

let configAll = data.build
if (debug) {
  configAll = data.dev
}
// console.log('configAll', configAll)
export default configAll
