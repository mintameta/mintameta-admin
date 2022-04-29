//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Toast from "light-toast";
import useStore from "../../tools/store";
import { Input } from 'antd';
import {useTranslation} from "react-i18next";
import {useSetFeeTo} from "../../tools/chain";
import * as metaMaskTools from "../../tools/chain";
const { TextArea } = Input;

export default function AdminDexUpdateFeeFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const [data_getdex,setdata_getdex] = useState({
        factory: ''
    })
    const defData = {
        address: '',
    }
    const [data,setData] = useState(defData)
    const updateDesc = useCallback(()=>{
        //console.log('data.desc',data.desc)
    })
    const {setFeeTo} = useSetFeeTo()
    const setFeeToFun = useCallback(()=>{
        if (!data_getdex.factory) {
            Toast.fail(t('h_item43'))
            return
        }
        if (!data.address) {
            Toast.fail(t('h_item44'))
            return
        }
        setFeeTo(data_getdex.factory,data.address).then((res)=>{
            setStore('popupAdminDexUpdateFee',false)
        })
    })
    useEffect(()=>{
        if(getStore.popupAdminDexUpdateFee) {
            metaMaskTools.getDex(getStore.account[0]).then((res)=>{
                // //console.log('getDex',res)
                setdata_getdex(res)
                // setData({...data,address: res.feeToSetter})
            })
        }
        return ()=>{
            // //console.log(111)
            setData(defData)
        }
    },[getStore.popupAdminDexUpdateFee])
    useEffect(()=>{
        setStore('popupAdminDexUpdateFee',false)
    },[getStore.account,getStore.chainId])

  return (
    <>
      <Modal
        isOpen={getStore.popupAdminDexUpdateFee}
        onDismiss={()=>{setStore('popupAdminDexUpdateFee',false)}}
        width="440px"
        showHeader={true}
        title={t('h_item45')}
      >
          <div className={'popup_w popup_admin_dex'}>
              <div className={'row'}>
                  <h3>{t('h_item46')} </h3>
                  <input className={'input_def'} type={'text'} placeholder={t('h_item47')} value={data.address} onChange={(e)=>{setData({...data,address: e.target.value})}} />
                  <p className={'color_gray'} style={{marginTop: 10}}>{t('h_item48')}</p>
              </div>
              <div className={'row tc'}>
                  <p style={{textAlign: 'left',marginTop: 20, marginBottom: 10}}></p>
                  <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{setFeeToFun()}}>{t('h_item33')}</button>
              </div>
          </div>
      </Modal>
    </>
  );
}
