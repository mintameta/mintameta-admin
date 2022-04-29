//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import CardButton from "../CardButton";
import Toast from "light-toast";
import useStore from "../../tools/store";
import * as metaMaskTools from "../../tools/chain"
import configAll from "../../tools/config"
import localStore from '../../tools/localstorage';

export default function LoginFun() {
    const { t } = useTranslation();
    const {getStore,setStore} = useStore()

    const connect = useCallback(async (type='injected')=>{
        if (type == 'injected') {
            const account1 = await metaMaskTools.initMetaMask()
            // //console.log('account1',account1)
            if (account1.length<=0) {
                Toast.fail(t('h_item16'))
                return
            }
            // await metaMaskTools.initParams()
            setStore('account',account1)
            setStore('connector','injected')
            localStore.save('accounts',account1)
            window.account = account1
        } else if (type == 'walletconnect') {
            const account1 = await metaMaskTools.initWallet()
            // //console.log('account1',account1)
            if (account1.length<=0) {
                Toast.fail(t('h_item16'))
                return
            }
            // await metaMaskTools.initParams()
            setStore('account',account1)
            setStore('connector','walletconnect')
            localStore.save('accounts',account1)
            window.account = account1
        }
    })
      useEffect( ()=>{
          let account1 = localStore.fetch('accounts')
          if (account1.length>0) {
              connect('injected')
          }
      },[getStore.account,getStore.chainId])
        useEffect( ()=>{
            // setStore('popupLogin',false)
            // metaMaskTools.initParams()
        },[getStore.account,getStore.chainId])
  return (
    <>
      <Modal
        isOpen={getStore.popupLogin}
        onDismiss={()=>{setStore('popupLogin',false)}}
        width="440px"
        showHeader={true}
        title={t("h_item15")}
      >
          <div className={'popup_w popup_login'}>
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("injected");
                setStore('popupLogin',false);
              }}
            >
              <div className="flex-jc-start width-100  bold-600 font-size-16">
                <img
                  src={require("../../assets/img/metamask.png")}
                  width="35"
                  height="35"
                  className="margin-right-10"
                />
                MetaMask
              </div>
            </CardButton>
            <Spacer size="mmd" />
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("walletconnect");
                setStore('popupLogin',false);
              }}
            >
              <div className="flex-jc-start width-100  bold-600 font-size-16">
                <img
                  src={require("../../assets/img/walletconnect.png")}
                  width="35"
                  height="35"
                  className="margin-right-10"
                />
                WalletConnect
              </div>
            </CardButton>
              <div className={'row'}></div>
          </div>
      </Modal>
    </>
  );
}
