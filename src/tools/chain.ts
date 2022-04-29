/*************
 * API
 * v1.0
 * lx
*/

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useStore from './store';
// import usePublicCall from './publicCall'
import Toast from 'light-toast';
import Web3 from 'web3';
import {BigNumberStr,BigNumberDiv,BigNumberMul,BigNumberAdd,BigNumberSub} from "./index";
import useConfigCommon from "./configCommon"
import abiAll from "./abiAll";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import localStore from "./localstorage";
import {getTonumber} from "../utils/formatBalance";
import {type} from "os";
import chainInfo from "./chainInfo";

declare var window: any
/* ---------------------------------line--------------------------------- */
export const initMetaMask = () => {
  return new Promise(async (resolve,reject) => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.ethereum.request({method: 'eth_requestAccounts'}).then((accounts: any) => {
        resolve(accounts)
        // Request account access if needed
      }).catch(() => {
        Toast.fail('User denied account access...')
        reject('User denied account access...')
      })
    } else {
      Toast.fail('Please install MetaMask!')
    }
  })
}
export const initWallet = () => {
  return new Promise(async (resolve,reject) => {
    window.connector = null;
    window.connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
    // this.connector.killSession();
    if (!window.connector.connected) {
      // create new session
      await window.connector.createSession();
    } else {
      await window.connector.killSession();
    }
// Subscribe to connection events
    window.connector.on("connect", (error:any, payload:any) => {
      if (error) {
        ////console.log('connect error',error)
        reject('User denied account access...')
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
      ////console.log('accounts',accounts)
      resolve(accounts)
    });

    window.connector.on("session_update", (error:any, payload:any) => {
      if (error) {
        reject('User denied account access...')
        ////console.log('session_update error',error)
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
      ////console.log('session_update error',accounts)
      resolve(accounts)
    });

    window.connector.on("disconnect", (error:any, payload:any) => {
      if (error) {
        ////console.log('disconnect error',error)
      }
      ////console.log('disconnect error1',error)
      // Delete connector
      // this.connector = null;
    });
  })
}
export const useLogout = () => {
    const { stateStore,getStore,setStore } = useStore()
    const onLogout = useCallback(()=>{
      setStore('restore',stateStore)
      localStore.save('accounts',[])
    },[])
    return {onLogout}
}

export default function useIsMobile () {
  const [isMobile, setIsMobile] = useState(false);
  window.onresize = function () {
    setSize();
  };
  function setSize() {
    let isMobile = !(document.documentElement.offsetWidth > 768);
    setIsMobile(isMobile);
  }
  useEffect(() => {
    setSize();
  }, [window.onresize]);
  return isMobile;
};

export const useInitParams = () => {
  const { stateStore,getStore,setStore } = useStore()
  const configAll = useConfigCommon()
  useEffect(()=>{
    // //console.log('useinitParams',configAll)
    window.web3 = new Web3(window.ethereum)
    if (!window.ethereum) {
      window.web3.setProvider(new Web3.providers.HttpProvider(configAll.nodeLink))
    }
    // web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/v3/'));
    // var abc = window.web3.currentProvider;
    // window.usdtToken = new window.web3.eth.Contract(abiAll.ERC20, configAll.usdtToken)
    window.NFTAddr = new window.web3.eth.Contract(abiAll.NFTAddr, configAll.NFTAddr)
    window.BoxNFTAddr = new window.web3.eth.Contract(abiAll.BoxNFTAddr, configAll.BoxNFTAddr)
    window.dexToolsAddr = new window.web3.eth.Contract(abiAll.dexToolsAddr, configAll.dexToolsAddr)
  },[configAll,getStore.account,getStore.chainId])
}
export const useOnMask = ()=>{
  const { stateStore,getStore,setStore } = useStore()
  window.ethereum.on('accountsChanged', (accounts:any)=>{
    // console.log('accounts',accounts)
    setStore('account',accounts)
    localStore.save('accounts',accounts)
  })
  window.ethereum.on('chainChanged', ()=> {
    setStore('reload',!getStore.reload)
  })
  useEffect(()=>{
    window.web3.eth.net.getId().then((chainId:number)=>{
      // //console.log('chainId',chainId)
      if (chainInfo[chainId] != undefined && Object.keys(chainInfo[chainId]).length>0) {
        let item = chainInfo[chainId]
        // //console.log('chainName',item.name)
        setStore('chainName',item.name)
      } else {
        setStore('chainName','chain')
      }
      setStore('chainId',chainId)
    })

  },[getStore.reload,getStore.account,getStore.chainId])
}
/* ---------------------------------line--------------------------------- */
/* +++public function start+++ */
// public
export const pubFixed = () => {
  let num = BigNumberMul(10000000000, Math.pow(10, 18))
  return num.toString()
}
// public res
export const publicRes =  (res: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(res)
    } catch (e) {
      reject(e)
    }
  })
}
// public call
export const publicCall = async (contract:any, methods:any, params:any = []) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fromObj = null
      if (window.account && window.account.length > 0) {
        fromObj = {from: window.account[0]}
      }
      const rs = await contract.methods[methods](...params).call(fromObj)
      // //console.log('rs',rs)
      resolve(rs)
    } catch (e) {
      // if (e.toString().indexOf('invalid address') != -1 || e.toString().indexOf('Out of Gas?') != -1){
      //   return
      // }
      console.log('err',methods,e)
      // reject(e)
    }
  })
}
export const usePublicCall = (contract:any, methods:any, params:any = []) => {
  const {getStore,setStore} = useStore()
  const [res,setRes] = useState()
  const publicCall = useCallback(async ()=>{
    let fromObj = {}
    if (getStore.account.length > 0) {
      fromObj = {from: getStore.account[0]}
    }
    const rs = await contract.methods[methods](...params).call(fromObj);
    setRes(rs)
  },[getStore.account,getStore.chainId])
  useEffect(()=>{
    publicCall().catch((err)=>{
        //console.log('usePublicCall err',methods,err)
    })
  },[getStore.account,getStore.chainId])
  return res
}
// public send
export const usePublicSend:any = () => {
  const {getStore,setStore} = useStore()

  return useCallback(async (contract: any, methods: any, params: any = [], update: any= true, from1: any={}) => {
    if (getStore.account.length<=0) {
      setStore('popupLogin',true)
      return
    }
    return new Promise(async (resolve, reject) => {
      try {
        // //console.log('contract',contract,methods,params)
        setStore('popupStatus', {status: 1, hash: ''})
        const rs = await contract.methods[methods](...params).send({...from1, from: getStore.account[0]})
          .on('transactionHash', function(hash: any){
            // //console.log('transactionHash')
            setStore('popupStatus', {status: 5, hash: hash})
          })
          .on('receipt', function(receipt: any){
            // //console.log('receipt')
            if (update) {
              setStore('popupStatus', {status: 3, hash: receipt.transactionHash})
            } else {
              setStore('popupStatus', {status: 0, hash: receipt.transactionHash})
            }
          })
        //console.log('rs',rs)
        resolve(rs)
      } catch (e) {
        if (e.code == 4001) {
          setStore('popupStatus', {status: 2, hash: ''})
        } else {
          setStore('popupStatus', {status: 4, hash: ''})
        }
        //console.log('err',methods,e)
      }
    })
  },[[]])
}
/* +++public function+++ end */
/* ---------------------------------line--------------------------------- */
/* +++GET DATA+++ start */
// ERC20
export const getAllowanceERC20:any = (token: any, contract: any,account: any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC20, token)
  return publicCall(tokenNew,'allowance',[account, contract])
}
// ERC721
export const getAllowanceERC721:any = (token: any, contract: any,account:any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC721, token)
  return publicCall(tokenNew, 'isApprovedForAll', [account, contract])
}
// ERC20
export const getBalanceOf:any = (token: any, contract: any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC20, token)
  return publicCall(tokenNew,'balanceOf',[contract])
}
// ERC721
export const getBalanceOf721:any = (token: any, contract: any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC721, token)
  return publicCall(tokenNew,'balanceOf',[contract])
}
// ERC20
export const getBalanceOfMaster:any = async (contract: any) => {
  if (!contract) {
    return 0
  }
  const res = await window.web3.eth.getBalance(contract)
  return res
}
// ERC20 totalSupply
export const getTotalSupplyERC20:any = (token: any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC20, token)
  return publicCall(tokenNew, 'totalSupply',[])
}
// ERC721 totalSupply
export const getTotalSupplyERC721:any = (token: any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC721, token)
  return publicCall(tokenNew, 'totalSupply',[])
}
// blockNumber
export const getBlockNumber:any =  async () => {
  let res =  await window.web3.eth.getBlockNumber()
  return res
}
export const getBoxViewNft:any = (token: any) => {
  const res = publicCall(window.BoxNFTAddr,'getNFTContractInfo',[token])
  return res
}
export const getNftInfoName:any = (token: any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC721, token)
  const res = publicCall(tokenNew,'name',[])
  return res
}
export const getTokenInfo:any =  async (token: any) => {
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC20, token)
  let fullName = await publicCall(tokenNew,'name',[])
  let symbol = await publicCall(tokenNew,'symbol',[])
  let totalSupply = await publicCall(tokenNew,'totalSupply',[])
  let decimals = await publicCall(tokenNew,'decimals',[])
  return {fullName,symbol,totalSupply,decimals}
}
/* Pay package */
export const getComboList:any = () => {
  const res = publicCall(window.dexToolsAddr,'getComboList',[])
  return res
}
/* Factory Contract Address */
export const getDex:any = (account: any) => {
  const res = publicCall(window.dexToolsAddr,'getDex',[account])
  return res
}
export const getCode:any = async (token: string) => {
   const res = await window.web3.eth.getCode(token)
   return res
}
export const getNftFee:any = async () => {
  const res = publicCall(window.NFTAddr,'fee',[])
  return res
}
export const getBoxFee:any = async () => {
  const res = publicCall(window.BoxNFTAddr,'fee',[])
  return res
}


// export const useGetBalanceOfMaster:any = (contract: any) => {
//   const {getStore,setStore} = useStore()
//   // //console.log('getBalanceOfMaster',111)
//   const [res,setRes] = useState(0)
//   //console.log('resres',res)
//   const aa = useCallback(async()=>{
//     //console.log('useCallback',111,contract)
//     if (!contract) {
//       return 0
//     }
//     //console.log('useCallback',222)
//     const res1 = await window.web3.eth.getBalance(contract)
//     setRes(res1)
//   },[getStore.account,getStore.chainId,contract])
//   useEffect(()=>{
//     aa().catch((e)=>{//console.log(e)})
//   },[getStore.account,getStore.chainId,contract])
//   return res
// }
/* +++GET DATA+++ end */
/* ---------------------------------分界线--------------------------------- */
/* +++SET DATA+++ start */
// ERC20
export const useSetAllowanceERC20:any = (token:any, contract:any) => {
  const publicSend = usePublicSend()
  let tokenNew =  new window.web3.eth.Contract(abiAll.ERC20, token)
  return publicSend(tokenNew,'approve',[contract, pubFixed()])
}
export const useApprove721:any = () => {
  const {getStore,setStore} = useStore()
  const publicSend = usePublicSend()

  const approve721 = useCallback((token:any, contract:any)=>{
    let tokenNew =  new window.web3.eth.Contract(abiAll.ERC721, token)
    //console.log('useApprove721',token,contract)
    return publicSend(tokenNew, 'setApprovalForAll', [contract, true])
  },[[]])
  return {approve721}
}
// created nft
export const useSetNft:any = () => {
  const publicSend = usePublicSend()
  const createNFTContract = useCallback((param0:any, param1:any,value:number)=>{
    // publicSend(window.NFTAddr, 'createNFTContract', [param0, param1])
    //console.log('NFTAddr',param0,param1)
    return publicSend(window.NFTAddr, 'createNFTContract', [param0, param1],true,{value: value})
  },[[]])
  return {createNFTContract}
}
// created box
export const useSetBox:any = () => {
  const publicSend = usePublicSend()
  const createNFTContract = useCallback((param0:any, param1:any,param2:any,param3:any,value:number)=>{
    // publicSend(window.BoxNFTAddr, 'createNFTContract', [param0, param1, param2, param3])
    //console.log('BoxNFTAddr',param0, param1, param2, param3)
    return publicSend(window.BoxNFTAddr, 'createNFTContract', [param0, param1, param2, param3],true,{value: value})
  },[[]])
  return {createNFTContract}
}
// coin nft
export const useSetNftMint:any = () => {
  const publicSend = usePublicSend()
  const setNftMint = useCallback((NFTAddress:any, to:any,num:any)=>{
    //console.log('useSetNftMint')
    return publicSend(window.NFTAddr, 'NFTMintBatch', [NFTAddress, to, num])
  },[[]])
  return {setNftMint}
}
// coin box
export const useSetBoxNftMint:any = () => {
  const publicSend = usePublicSend()
  const setBoxNftMint = useCallback((NFTAddress:any, to:any,num:any)=>{
    //console.log('useSetBoxNftMint')
    return publicSend(window.BoxNFTAddr, 'NFTMintBatch', [NFTAddress, to, num])
  },[[]])
  return {setBoxNftMint}
}
// transfer nft
export const useSetNftTransferFrom:any = () => {
  const publicSend = usePublicSend()
  const setNftTransferFrom = useCallback((contractAddress_: any,from:any, to:any,tokenId:any)=>{
    let tokenNew =  new window.web3.eth.Contract(abiAll.ERC721, contractAddress_)
    return publicSend(tokenNew, 'transferFrom', [from, to, tokenId])
  },[[]])
  return {setNftTransferFrom}
}
// open box nft
export const useSetOpenBox:any = () => {
  const publicSend = usePublicSend()
  const setOpenBox = useCallback((NFTAddress:any, NFTId:any)=>{
    // console.log('useSetOpenBox',NFTAddress,NFTId)
    return publicSend(window.BoxNFTAddr, 'openBox', [NFTAddress, NFTId])
  },[[]])
  return {setOpenBox}
}
// dex renewal
export const useSetRenewal:any = () => {
  const publicSend = usePublicSend()
  const setRenewal = useCallback((_comboIndex:any, _creator:any,value: number)=>{
    //console.log('useSetRenewal',_comboIndex,_creator)
    return publicSend(window.dexToolsAddr, 'renewal', [_comboIndex, _creator], true,{value: value})
  },[[]])
  return {setRenewal}
}
// created dex
export const useSetCreateDex:any = () => {
  const publicSend = usePublicSend()
  const setCreateDex = useCallback((_comboIndex:any, _feeToSetter:any,_project:any,_subDomain: any,_logo:any,_slogan: any,value: number)=>{
    // //console.log('useSetRenewal',_comboIndex,_creator)
    return publicSend(window.dexToolsAddr, 'createDex', [_comboIndex, _feeToSetter,_project,_subDomain,_logo,_slogan], false,{value: value})
  },[[]])
  return {setCreateDex}
}
// dex set fee
export const useSetFeeTo:any = () => {
  const publicSend = usePublicSend()
  const setFeeTo = useCallback((contract: any,_feeTo: any)=>{
    let tokenNew = new window.web3.eth.Contract(abiAll.dexFactoryAddr, contract)
    return publicSend(tokenNew, 'setFeeTo', [_feeTo])
  },[[]])
  return {setFeeTo}
}

/* +++SET DATA+++ end */
