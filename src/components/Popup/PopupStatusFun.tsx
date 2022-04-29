//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Toast from "light-toast";
import useStore from "../../tools/store";
import configAll from "../../tools/config";
import {useTranslation} from "react-i18next";
import { Input } from 'antd';
const { TextArea } = Input;

export default function PopupStatusFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {

    }
    const [data,setData] = useState(defData)
    const updateDesc = useCallback(()=>{
        //console.log('data.desc',data.desc)
    })

    useEffect(()=>{
        setStore('popupStatus',{status: 0})
    },[getStore.account,getStore.chainId])
  return (
    <>
      <Modal
        isOpen={getStore.popupStatus.status>0}
        onDismiss={()=>{setStore('popupStatus',{status: 0})} }
        width="330px"
        showHeader={true}
        title={t('h_item61')}
        topClassName={'popup_status_c'}
      >
          {
              getStore.popupStatus.status == '1' ?
                  <div className={'popup_w popup_status'}>
                      <div className={'row'}>
                          <img className={'dib'} src={require('../../assets/images/img_dialog1.png')} />
                      </div>
                      <div className={'row'}>
                          <h3>{t('h_item62')}</h3>
                      </div>
                      {/*<div className={'row tc'}>*/}
                      {/*    <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}></p>*/}
                      {/*    <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{setStore('popupStatus',{status: 0})} }>确认</button>*/}
                      {/*</div>*/}
                  </div>
                  : ''
          }
          {
              getStore.popupStatus.status == '2' ?
                  <div className={'popup_w popup_status'}>
                      <div className={'row'}>
                          <img className={'dib'} src={require('../../assets/images/img_dialog5.png')} />
                      </div>
                      <div className={'row'}>
                          <h3>{t('h_item63')}</h3>
                      </div>
                      <div className={'row tc'}>
                          <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}></p>
                          <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{setStore('popupStatus',{status: 0})} }>{t('h_item33')}</button>
                      </div>
                  </div>
                  : ''
          }
          {
              getStore.popupStatus.status == '3' ?
                  <div className={'popup_w popup_status'}>
                      <div className={'row'}>
                          <img className={'dib'} src={require('../../assets/images/img_dialog3.png')} />
                      </div>
                      <div className={'row'}>
                          <h3>{t('h_item64')}</h3>
                      </div>
                      {getStore.popupStatus.hash ?
                          <div className={'row tc'}>
                              <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}></p>
                              <div>
                                  <a href={configAll.okexchainLink + getStore.popupStatus.hash} target={'_blank'}>
                                      <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} >{t('h_item28')}</button>
                                  </a>
                              </div>
                          </div>
                          : ''
                      }
                  </div>
                  : ''
          }
          {
              getStore.popupStatus.status == '4' ?
                  <div className={'popup_w popup_status'}>
                      <div className={'row'}>
                          <img className={'dib'} src={require('../../assets/images/img_dialog6.png')} />
                      </div>
                      <div className={'row'}>
                          <h3>{t('h_item65')}</h3>
                      </div>
                      <div className={'row tc'}>
                          <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}></p>
                          <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{setStore('popupStatus',{status: 0})} }>{t('h_item33')}</button>
                      </div>
                  </div>
                  : ''
          }
          {
              getStore.popupStatus.status == '5' ?
                  <div className={'popup_w popup_status'}>
                      <div className={'row'}>
                          <img className={'dib'} src={require('../../assets/images/img_dialog2.png')} />
                      </div>
                      <div className={'row'}>
                          <h3>{t('h_item66')}</h3>
                      </div>
                      {getStore.popupStatus.hash ?
                          <div className={'row tc'}>
                              <p style={{textAlign: 'left',marginTop: 0, marginBottom: 0}}></p>
                              <div>
                                  <a href={configAll.okexchainLink + getStore.popupStatus.hash} target={'_blank'}>
                                            <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} >{t('h_item28')}</button>
                                  </a>
                              </div>
                          </div>
                          : ''
                      }
                  </div>
                  : ''
          }

      </Modal>
    </>
  );
}
