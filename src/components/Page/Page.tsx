import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useLocation,useHistory } from "react-router-dom";
import Left from "./components/Left";
import Main from "./components/Main";



import useStore from "../../tools/store";
import Toast from "light-toast";
import * as metaMaskTools from "../../tools/chain"
import {useTranslation} from "react-i18next";
import {useOnMask,useInitParams} from "../../tools/chain";
import useIsMobile from "../../tools/chain";

import LoginFun from "../Popup/LoginFun";
import AccountFun from "../Popup/AccountFun";
import UpdateDescFun from "../Popup/UpdateDescFun";
import PopupStatusFun from "../Popup/PopupStatusFun";
import CoinFun from "../Popup/CoinFun";
import BoxCoinFun from "../Popup/BoxCoinFun";
import TransferNftFun from "../Popup/TransferNftFun";
import BoxViewFun from "../Popup/BoxViewFun";
import AdminDexEditNameFun from "../Popup/AdminDexEditNameFun";
import AdminDexTokenListFun from "../Popup/AdminDexTokenListFun";
import AdminDexUpdateFeeFun from "../Popup/AdminDexUpdateFeeFun";
import AdminDexRenewFun from "../Popup/AdminDexRenewFun";
import chainInfo from "../../tools/chainInfo";

const Page: React.FC = ({ children }) => {
    const { t } = useTranslation();
    const {getStore,setStore} = useStore()
    const { pathname } = useLocation()
    const initParams = useInitParams()
    const onMask = useOnMask()
    const isMobile = useIsMobile()

    useEffect(()=>{
        // console.log('getStore.chainId',getStore.chainId)
        if (getStore.chainId) {
            let isTrue = false
            for (let i in chainInfo) {
                // console.log('chainInfo[getStore.chainId]',chainInfo[getStore.chainId])
                if (chainInfo[getStore.chainId]) {
                    isTrue = true
                    break
                }
            }
            if (!isTrue) {
                Toast.fail(t('h_item179'))
                return
            }
        }
    },[pathname,getStore.account,getStore.chainId])

    return (
        <>
            <div id="app" className={` fz0 ${getStore.hideStatus  ? 'left_small' : ''} `}>
                <div className={`topbar dib `}>
                    <Left />
                </div>
                <div className={`main dib `}>
                    <div className="main_bg">
                        <Main> {children} </Main>
                        <LoginFun />
                        <AccountFun />
                        <UpdateDescFun />
                        <PopupStatusFun />
                        <CoinFun />
                        <BoxCoinFun />
                        <TransferNftFun />
                        <BoxViewFun />
                        <AdminDexEditNameFun />
                        <AdminDexTokenListFun />
                        <AdminDexUpdateFeeFun />
                        <AdminDexRenewFun />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Page;
