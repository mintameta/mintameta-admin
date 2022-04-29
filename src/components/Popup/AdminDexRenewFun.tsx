//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { BigNumberStr,formatDate,getFormatTime } from "../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Toast from "light-toast";
import useStore from "../../tools/store";
import {Input, Radio} from 'antd';
import {useTranslation} from "react-i18next";
import * as metaMaskTools from "../../tools/chain"
import {useSetRenewal} from "../../tools/chain"
const { TextArea } = Input;

export default function AdminDexRenewFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {
        timeLimit: 0,
        getComboList: []
    }
    const [data,setData] = useState(defData)
    const {setRenewal} = useSetRenewal()
    const updateDesc = useCallback(()=>{
        // //console.log(getFormatTime(data.getComboList[0]['duration']))
        if (data.getComboList.length<=0) {
            Toast.fail(t('h_item35'))
            return
        }
        let value = data.getComboList[data.timeLimit]['price']
        setRenewal(data.timeLimit,getStore.account[0],value).then((res)=>{
            // Toast.success('续费成功')
            setStore('popupAdminDexRenew',false)
        })
    })

    useEffect(()=>{
        //
        if (getStore.popupAdminDexRenew) {
            metaMaskTools.getComboList().then((res)=>{
                //console.log('getComboList',res)
                setData({...data,getComboList: res})
            })
        }
    },[getStore.popupAdminDexRenew])
    useEffect(()=>{
        setStore('popupAdminDexRenew',false)
    },[getStore.account,getStore.chainId])
  return (
    <>
      <Modal
        isOpen={getStore.popupAdminDexRenew}
        onDismiss={()=>{setStore('popupAdminDexRenew',false)}}
        width="440px"
        showHeader={true}
        title={t('h_item36')}
      >
          <div className={'popup_w popup_admin_dex'}>

              <div className={'row'}>
                  <h3>{t('h_item37')}</h3>
                  {
                      data.getComboList.length > 0 ?
                          <Radio.Group  value={data.timeLimit} onChange={(e)=>{setData({...data,timeLimit: e.target.value})}}>
                              {
                                  data.getComboList.map((item,index)=>{
                                      return (
                                          <dl key={index}><Radio value={index}>{getFormatTime(item.duration)[0]}{t('h_item38')} </Radio><span className={'dib color_green fr'}>{BigNumberStr(item.price,getStore.BNBDec,2)} BNB</span></dl>
                                      )
                                  })
                              }
                          </Radio.Group>
                          : ''
                  }
              </div>
              <div className={'row tc'}>
                  <p style={{textAlign: 'left',marginTop: 20, marginBottom: 10}}></p>
                  <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{updateDesc()}}>{t('h_item33')}</button>
              </div>
          </div>
      </Modal>
    </>
  );
}
