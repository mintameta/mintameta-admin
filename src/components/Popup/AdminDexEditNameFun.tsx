//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Toast from "light-toast";
import useStore from "../../tools/store";
import { Input } from 'antd';
import {useTranslation} from "react-i18next";
import {fetchPost} from "../../tools/https";
const { TextArea } = Input;

export default function AdminDexEditNameFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {
        name: ''
    }
    const [data,setData] = useState(defData)
    const updateName = useCallback(async ()=>{
        let obj = {}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        obj.data = {
            project: data.name
        }
        obj.signData = await window.web3.eth.personal.sign(JSON.stringify(obj.data),getStore.account[0])
        fetchPost('/dex/update',obj).then((res)=>{
            if(res.data.code == '0'){
                Toast.success(t('h_item34'))
                setStore('popupAdminDexEditName',false)
            }
        })
    })

    useEffect(()=>{
        if (Object.keys(getStore.popupInfo).length > 0) {
            // //console.log('getStore.popupInfo',getStore.popupInfo)
            let item = getStore.popupInfo
            setData({...defData,name: item.name})
        }
    },[getStore.popupAdminDexEditName])
    useEffect(()=>{
        setStore('popupAdminDexEditName',false)
    },[getStore.account,getStore.chainId])
  return (
    <>
      <Modal
        isOpen={getStore.popupAdminDexEditName}
        onDismiss={()=>{setStore('popupAdminDexEditName',false)}}
        width="440px"
        showHeader={true}
        title={t('h_item32')}
      >
          <div className={'popup_w popup_admin_dex'}>
              <div className={'row'}>
                  <input className={'input_def'} type={'text'} value={data.name} onChange={(e)=>{setData({...data,name: e.target.value})} } />
              </div>
              <div className={'row tc'}>
                  <p style={{textAlign: 'left',marginTop: 20, marginBottom: 10}}></p>
                  <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{updateName()}}>{t('h_item33')}</button>
              </div>
          </div>
      </Modal>
    </>
  );
}
