//@ts-nocheck
import { createReducer,  } from '@reduxjs/toolkit'
import {
  updateBlockNumber,
  toggleStatusModal,
  updateTransactionHash,
  toggleStatus,
    updateSetStore
} from './actions'

export interface ApplicationState {
    BNBDec: number,
    account: any,
    chainId: number,
    chainName: string,
    reload: boolean,
    connector: string,
  blockNumber: { [chainId: number]: number },
  walletModalOpen: boolean,
    loginShow: boolean,
    popupStatus: object
    statusModalOpen: boolean,
    status: number,
    transactionHash: string,
    hideStatus: boolean,
    popupInfo: object,
    popupLogin: boolean,
    popupAccount: boolean,
    popupUpdateDesc: boolean,
    popupCoin: boolean,
    popupBoxCoin: boolean,
    popupTransferNft: boolean,
    popupBoxView: boolean,
    popupAdminDexEditName: boolean,
    popupAdminDexTokenList: boolean,
    popupAdminDexUpdateFee: boolean,
    popupAdminDexRenew: boolean,
    uploadImg: string,
    leftMobileShow: boolean,
}

export const stateStore: ApplicationState = {
    BNBDec: 18,
    account: [],
    chainId: 0,
    chainName: 'chain',
    reload: false,
    connector: 'injected',//injected walletconnect
    blockNumber: {},
    walletModalOpen: false,
    loginShow: false,
    popupStatus: {status: 0, hash: ''},
    statusModalOpen: false,
    status: 1,
    transactionHash:'',
    hideStatus: false,
    popupInfo: {},
    popupLogin: false,
    popupAccount: false,
    popupUpdateDesc: false,
    popupCoin: false,
    popupBoxCoin: false,
    popupTransferNft: false,
    popupBoxView: false,
    popupAdminDexEditName: false,
    popupAdminDexTokenList: false,
    popupAdminDexUpdateFee: false,
    popupAdminDexRenew: false,
    uploadImg: '',
    leftMobileShow: false,
}

const initialState: ApplicationState = {
    ...stateStore
}

export default createReducer(initialState, builder =>
  builder
      .addCase(updateSetStore, (state, action) => {
          const { key, value } = action.payload
          if (key == 'restore') {
              for(let i in value){
                  state[i] = value[i]
              }
          } else {
              if (value !== null && typeof value === 'object') {
                  for(let i in value){
                      state[key][i] = value[i]
                  }
              } else {
                  state[key] = value
              }
          }
          // console.log('createReducer',action.payload,'value',value)
      })
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })

    .addCase(toggleStatusModal, (state, action) => {
      state.statusModalOpen =
        action.payload.statusModalOpen !== undefined ? action.payload.statusModalOpen : !state.statusModalOpen
    })
    .addCase(toggleStatus, (state, action) => {
      state.status = action.payload.status !== undefined ? action.payload.status : 1
    })
    .addCase(updateTransactionHash, (state, action) => {
      state.transactionHash =
        action.payload.transactionHash !== undefined ? action.payload.transactionHash : ''
    })


)
