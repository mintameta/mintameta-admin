//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Toast from "light-toast";
import useStore from "../../tools/store";
import { Input } from 'antd';
import {useTranslation} from "react-i18next";
const { TextArea } = Input;

export default function UpdateDescFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {
        desc: ''
    }
    const [data,setData] = useState(defData)
    const updateDesc = useCallback(()=>{
        // //console.log('data.desc',data.desc)
    })

    useEffect(()=>{
        setStore('popupUpdateDesc',false)
    },[getStore.account,getStore.chainId])
  return (
    <>
      <Modal
        isOpen={getStore.popupUpdateDesc}
        onDismiss={()=>{setStore('popupUpdateDesc',false)}}
        width="440px"
        showHeader={true}
        title={t("h_item22")}
      >
          <div className={'popup_w popup_update_project_info'}>
              <div className={'row'}>
                    <TextArea rows={4} defaultValue={data.desc} onChange={(e)=>{setData({...data,desc: e.target.value})}} />
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
