//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation,useHistory } from "react-router-dom";
// import { useWallet,UseWalletProvider } from "use-wallet";
import { substringStr } from "../../../tools/index"
import Left from "../components/Left";
import * as metaMaskTools from "../../tools/chain";
import Toast from "light-toast";
import { RouterConfig } from "../../../router";
import useStore from "../../../tools/store";
import {isMobile} from "../../../tools/mobile";

const Header: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory()
    const { pathname } = useLocation();
    const {getStore,setStore} = useStore()
    const [publicTitle,setPublicTitle] = useState('h_item1')
    useEffect(()=>{
        setStore('leftMobileShow',false)
        // console.log('pathname',pathname)
        setPublicTitle('h_item1')
        for(let i in RouterConfig) {
            let item = RouterConfig[i]
            // console.log('item.path',item.path)
            if (pathname == item.path && item.meta) {
               setPublicTitle(item.meta)
                break
            }
        }
    },[getStore.account,getStore.chainId, pathname])
    useEffect(()=>{
        setStore('leftMobileShow',false)
        setStore('hideStatus',false)
    },[isMobile])
  return (
      <>
          <div className="header fz0">
              <div className="left dib fz0">
                  {
                      getStore.hideStatus ?
                          <img className='dib cp' src={require('../../../assets/images/icon_unfold.png')} onClick={()=>{setStore('hideStatus',false) }}/>
                          : <img className='dib cp' src={require('../../../assets/images/icon_fold.png')} onClick={()=>{setStore('hideStatus',true)}}/>
                  }

                  <h3 className='dib'>{t(publicTitle)}</h3>
              </div>
              <div className="right dib fz0">
                  <button className='b1 dib fz0'>
                      <img className='dib' src={require('../../../assets/images/icon_bsc_40.png')}/>
                      <span className='dib'>{getStore.chainName.toUpperCase()}</span>
                  </button>
                  {
                      !getStore.account[0] ? (
                          <button className='login_b2 dib' onClick={()=>{setStore('popupLogin',true)}}>{t('h_item15')}</button>
                      ) : (
                          <button className='login_b2 dib' onClick={()=>{setStore('popupAccount',true)}}>{substringStr(getStore.account[0])}</button>
                      )
                  }

              </div>
          </div>
          <div className="header_mobile fz0">
                  <div className="left dib fz0">
                      <div className="logo" onClick={()=>{history.push('/admin')}}>
                          <img src={require('../../../assets/images/logo.png')} />
                      </div>
                  </div>
                  <div className="right dib fz0 tar">
                      <button className='b1 dib fz0' onClick={()=>{setStore('leftMobileShow',!getStore.leftMobileShow)}}>
                          <img className='dib' width={30} height={30} src={require('../../../assets/images/btn_menu.png')}/>
                      </button>
                  </div>
          </div>
          {
              getStore.leftMobileShow ?
                  <div className={'nav_mobile'}>
                      <Left />
                      <div className={'login_mobile'}>
                          {
                              !getStore.account[0] ? (
                                  <button className='login_b2 dib' onClick={()=>{
                                      setStore('popupLogin',true)
                                      setStore('leftMobileShow',false)
                                  }}>{t('h_item15')}</button>
                              ) : (
                                  <button className='login_b2 dib' onClick={()=>{
                                      setStore('popupAccount',true)
                                      setStore('leftMobileShow',false)
                                  }}>{substringStr(getStore.account[0])}</button>
                              )
                          }
                      </div>
                  </div>
                  : ''
          }
          <div className={`header_f`}></div>
          <div className={'header_mobile_title'}>
              <h3 className='dib'>{t(publicTitle)}</h3>
          </div>
      </>
  );
};
export default Header;
