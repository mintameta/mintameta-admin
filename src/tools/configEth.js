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
    nodeLink: 'https://mainnet.infura.io/v3/',
    // ipfsAddr: {host: '13.212.54.207',port: '5001',protocol: 'http'},
    // ipfsHost: 'http://13.212.54.207:8080',
    ipfsAddr: {host: 'ipfs.mintameta.com',port: '',protocol: 'https'},
    ipfsHost: 'https://select.ipfs.mintameta.com',
    graphAddr: '',
    chainId: 1,
    okexchainLink: 'https://etherscan.io/tx/',
    okexchainLink1: 'https://etherscan.io/address/',
    etherscanUrl: 'https://etherscan.io/address/',
    inviteLink: '',
    startBlock: 6310931,
    NFTAddr: "",
    BoxNFTAddr: "",
    dexToolsAddr: "",
  },
  dev: {
    name: 'dev',
    httpsApi: 'https://dex-api.mintameta.com',
    nodeLink: 'https://rinkeby.infura.io/v3/',
    // ipfsAddr: {host: '13.212.54.207',port: '5001',protocol: 'http'},
    // ipfsHost: 'http://13.212.54.207:8080',
    ipfsAddr: {host: 'ipfs.mintameta.com',port: '',protocol: 'https'},
    ipfsHost: 'https://select.ipfs.mintameta.com',
    graphAddr: 'https://api.thegraph.com/subgraphs/name/wyfblues/mintametarinkeby',
    chainId: 4,
    okexchainLink: 'https://rinkeby.etherscan.io/tx/',
    okexchainLink1: 'https://rinkeby.etherscan.io/address/',
    etherscanUrl: 'https://rinkeby.etherscan.io/address/',
    inviteLink: '',
    startBlock: 6668147,
    NFTAddr: "0xdbA8504F8f33B8c4913253fEE0424c9910A8B686",
    BoxNFTAddr: "0x6064BB9f9DCB186D50313804309559Cea639e94D",
    dexToolsAddr: "0x7CDB957b3Fd4F95160e8D59285Af29a2799ca34F",
  }
}

let configAll = data.build
if (debug) {
  configAll = data.dev
}
// //console.log('configAll', configAll)
export default configAll
