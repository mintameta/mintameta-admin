
type chainInfoProps = {
  [key:number]: {type:string,name:string,url:string,token:string,dec:number}
}
const chainInfo:chainInfoProps = {
  // 97: {type:'test', name: 'bsc',url: '',token: 'BNB',dec: 18},
  56: {type:'main',name: 'bsc',url: '',token: 'BNB',dec: 18},
  // 1: {type:'main',name: 'ethereum',url: '',token: 'ETH',dec: 18},
  // 4: {type:'Rinkeby',name: 'ethereum',url: '',token: 'ETH',dec: 18},
}
 export default chainInfo
