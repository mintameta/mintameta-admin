//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { useTranslation } from "react-i18next";
import LoginFun from "./LoginFun";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Copy from "../Copy";
import configAll from "../../tools/config";
import Toast from "light-toast";
import { substringStr } from "../../tools/index"
import useStore from "../../tools/store";
import {useLogout} from "../../tools/chain";

export default function AccountFun() {
  const { t } = useTranslation();
    const {getStore,setStore} = useStore()
    const { onLogout } = useLogout()

    useEffect(()=>{
        setStore('popupAccount',false)
    },[getStore.account,getStore.chainId])
  return (
    <>
      <Modal
        isOpen={getStore.popupAccount}
        onDismiss={()=>{setStore('popupAccount',false)}}
        width="440px"
        showHeader={true}
        title={t("h_item19")}
      >
        <div className={'popup_w popup_account'}>
              <div className="metamask fz0">
                <div className="dl dib  bold-400 font-size-14">
                  <img
                    src={
                        getStore.connector === "injected"
                        ? require("../../assets/img/metamask.png")
                        : require("../../assets/img/walletconnect.png")
                    }
                    width="25"
                    height="25"
                    className="margin-right-10"
                  />
                  <span className={'font-size-14'}>{t('h_item31')}</span>
                    <span>
                  {getStore.connector === "injected" ? "MetaMask" : "WalletConnect"}
                    </span>
                </div>
                <div className="dr dib but1 fz0">
                    <button className={'b1 dib'} onClick={()=>{
                        setStore('popupAccount',false)
                        onLogout()
                        setStore('popupLogin',true)
                    }}>{t("h_item20")}</button>
                    <button className={'b2 dib'} onClick={()=>{
                        setStore('popupAccount',false)
                        onLogout()
                    }}>{t("h_item21")}</button>
                </div>
              </div>
              <Spacer size="mmd" />
              <div className="account fz0">
                  <span className={'span1 dib'}></span>
                  <span className={'span2 dib'}>{substringStr(getStore.account[0],5)}</span>
              </div>
              <Spacer size="mmd" />
              <div className="but fz0">
                <Copy toCopy={getStore.account[0]} color={'#fff'}>
                  <span className={`word dib`}>{t('h_item12')}</span>
                </Copy>
                <button className={`dib fz0`}>
                  <a
                      className="color-light-blue fz0"
                      href={`${configAll.etherscanUrl}/${getStore.account[0]}`}
                      target={`_blank`}
                  >
                    <img src={require("../../assets/images/icon_check.png")} width={13} height={13} className="dib"/>
                    <span className={`word dib`}>{t('h_item30')}</span>
                  </a>
                </button>
              </div>
              <Spacer size="mmd" />
          </div>
      </Modal>
    </>
  );
}
