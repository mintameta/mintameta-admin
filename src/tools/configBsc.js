// debug true:test  false:master
const devUrl = ["test","ttool","dectest", "localhost", "192.168","8.210.239.89"]

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
//console.log('debug', debug)

const data = {
  build: {
    name: 'build',
    httpsApi: '',
    nodeLink: 'https://bsc-dataseed1.binance.org/',
    // ipfsAddr: {host: '13.212.54.207',port: '5001',protocol: 'http'},
    // ipfsHost: 'http://13.212.54.207:8080',
    ipfsAddr: {host: 'ipfs.mintameta.com',port: '',protocol: 'https'},
    ipfsHost: 'https://select.ipfs.mintameta.com',
    graphAddr: '',
    chainId: 56,
    okexchainLink: 'https://bscscan.com/tx/',
    okexchainLink1: 'https://bscscan.com/address/',
    etherscanUrl: 'https://bscscan.com/address/',
    inviteLink: '',
    startBlock: 6310931,
    NFTAddr: "0xdbA8504F8f33B8c4913253fEE0424c9910A8B686",
    BoxNFTAddr: "0x6064BB9f9DCB186D50313804309559Cea639e94D",
    dexToolsAddr: "",
  },
  dev: {
    name: 'dev',
    httpsApi: 'https://dex-api.mintameta.com',
    nodeLink: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    // ipfsAddr: {host: '13.212.54.207',port: '5001',protocol: 'http'},
    // ipfsHost: 'http://13.212.54.207:8080',
    ipfsAddr: {host: 'ipfs.mintameta.com',port: '',protocol: 'https'},
    ipfsHost: 'https://select.ipfs.mintameta.com',
    graphAddr: '',
    chainId: 97,
    okexchainLink: 'https://testnet.bscscan.com/tx/',
    okexchainLink1: 'https://testnet.bscscan.com/address/',
    etherscanUrl: 'https://testnet.bscscan.com/address/',
    inviteLink: '',
    startBlock: 6668147,
    NFTAddr: "",
    BoxNFTAddr: "",
    dexToolsAddr: "",
  }
}

let configAll = data.build
if (debug) {
  configAll = data.dev
}
// //console.log('configAll', configAll)
export default configAll
