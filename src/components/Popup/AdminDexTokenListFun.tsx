//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Toast from "light-toast";
import useStore from "../../tools/store";
import { Input } from 'antd';
import {useTranslation} from "react-i18next";
import {fetchGet, fetchPost} from "../../tools/https";
import useConfigCommon from "../../tools/configCommon";

export default function AdminDexTokenListFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const defData = {
        major: '0',
        minor: '0',
        patch: '0',
    }
    const [data,setData] = useState(defData)
    const fetchGetConfig = useCallback(async ()=>{
        let obj ={}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        fetchGet('token/getTokenVersion',obj,configAll.httpsApi).then((res)=>{
            //console.log('getTokenVersion',res)
            if(Object.keys(res.data.data).length > 0) {
                setData(res.data.data)
            }
        })
    })
    const updateDesc = useCallback(async()=>{
        let obj = {}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        obj.data = {
            major: data.major+'',
            minor: data.minor+'',
            patch: data.patch+''
        }
        // //console.log('obj.data',JSON.stringify(obj.data))
        //sign
        obj.signData = await window.web3.eth.personal.sign(JSON.stringify(obj.data),getStore.account[0])
        // //console.log('obj.signData',obj.signData)
        //verification
        // let address = await window.web3.eth.accounts.recover(JSON.stringify(obj.data),obj.signData)
        // //console.log('verification',address)
        fetchPost('/token/updateTokenVersion',obj,configAll.httpsApi).then((res)=>{
            //console.log('res',res)
            if(res.data.code == '0'){
                Toast.success(t('h_item34'))
                setStore('popupAdminDexTokenList',false)
            }
        })
    })

    useEffect(()=>{
        if (getStore.popupAdminDexTokenList) {
            fetchGetConfig()
        }
    },[getStore.popupAdminDexTokenList])
    useEffect(()=>{
        setStore('popupAdminDexTokenList',false)
    },[getStore.account,getStore.chainId])
  return (
    <>
      <Modal
        isOpen={getStore.popupAdminDexTokenList}
        onDismiss={()=>{setStore('popupAdminDexTokenList',false)}}
        width="440px"
        showHeader={true}
        title={t('h_item39')}
      >
          <div className={'popup_w popup_admin_dex'}>
              <div className={'row'}>
                  <h3>major <span className={'color_green'}>*</span></h3>
                  <input className={'input_def'} type={'text'} value={data.major} placeholder={t('h_item40')} onChange={(e)=>{setData({...data,major: e.target.value})} } />
              </div>
              <div className={'row'}>
                  <h3>minor <span className={'color_green'}>*</span></h3>
                  <input className={'input_def'} type={'text'} value={data.minor} placeholder={t('h_item41')} onChange={(e)=>{setData({...data,minor: e.target.value})} } />
              </div>
              <div className={'row'}>
                  <h3>patch <span className={'color_green'}>*</span></h3>
                  <input className={'input_def'} type={'text'} value={data.patch} onChange={(e)=>{setData({...data,patch: e.target.value})} } />
              </div>
              <div className={'row tc'}>
                  <p style={{textAlign: 'left',marginTop: 20, marginBottom: 10}}></p>
                  <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{updateDesc()}}>{t('h_item42')}</button>
              </div>
          </div>
      </Modal>
    </>
  );
}
