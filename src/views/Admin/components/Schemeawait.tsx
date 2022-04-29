//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr } from "../../../tools/index";
import { useLocation,useHistory } from "react-router-dom";
import Toast from "light-toast";
import useStore from "../../../tools/store";
import * as metaMaskTools from "../../../tools/chain";
import {fetchGet} from "../../../tools/https";
import {Image} from "antd";
import useConfigCommon from "../../../tools/configCommon";

const Schemeawait: React.FC = ({title}) => {
    const { t } = useTranslation()
    const history = useHistory()
    const { pathname } = useLocation();
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const [data_dex,set_data_dex] = useState('')
    const [data_nft,set_data_nft] = useState('')
    const [data_farm,set_data_farm] = useState('')

    const fetchDataFun = useCallback(async()=>{
        let obj ={}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        fetchGet('dex',obj,configAll.httpsApi).then((res)=>{
            //console.log('dex',res)
            if(Object.keys(res.data.data).length > 0) {
                set_data_dex(res.data.data)
            }
        })
    })
    useEffect(()=>{
        set_data_dex('')
        set_data_nft('')
        set_data_farm('')
        if (getStore.chainId) {
            fetchDataFun()
        }
    },[getStore.account,getStore.chainId])
  return (
      <>
          {
              getStore.account.length>0 && (!data_dex || !data_nft || !data_farm) ?
                  <div className={`item scheme`}>
                      <div className={`title`}><h3>{title}</h3></div>
                      <ul>
                          {
                              !data_dex ?
                                  <li className={'li1'} >
                                      <div className={`top fz0`}>
                                          <img className={`dib`} src={require('../../../assets/images/icon_default_60.png')} />
                                          <div className={`info dib`}>
                                              <h3>{t('h_item80')}</h3>
                                              <p>Dex <span>BSC</span></p>
                                          </div>
                                      </div>
                                      <div className={`bottom`}>
                                          <div className={`p1`}>
                                              <span>{t('h_item81')}</span>
                                          </div>
                                          <div className={`but`}>
                                              <a onClick={()=>{history.push('/solution/detail/dex')}}>
                                                  <button className={`fz0`}><span className={`dib`}>{t('h_item82')}</span><img className={`dib`} src={require('../../../assets/images/arrow_green.png')} /></button>
                                              </a>
                                          </div>
                                      </div>
                                  </li>
                                  : ''

                          }
                          {
                              !data_nft ?
                                  <li className={`li2`}>
                                      <div className={`top fz0`}>
                                          <img className={`dib`} src={require('../../../assets/images/icon_default_60.png')} />
                                          <div className={`info dib`}>
                                              <h3>{t('h_item83')}</h3>
                                              <p>NFT Market <span>BSC</span></p>
                                          </div>
                                      </div>
                                      <div className={`bottom`}>
                                          <div className={`p1`}>
                                              <span>{t('h_item84')}</span>
                                              {/*<img className={'dib'} src={require('../../../assets/images/icon_edit.png')} />*/}
                                          </div>
                                          <div className={`but`}>
                                              <a onClick={()=>{
                                                  history.push('/solution/detail/nft')
                                              }}>
                                                  <button className={`fz0`}><span className={`dib`}>{t('h_item82')}</span><img className={`dib`} src={require('../../../assets/images/arrow_green.png')} /></button>
                                              </a>
                                          </div>
                                      </div>
                                  </li>
                                  : ''
                          }
                          {
                              !data_farm ?
                                  <li className={`li3`}>
                                      <div className={`top fz0`}>
                                          <img className={`dib`} src={require('../../../assets/images/icon_default_60.png')} />
                                          <div className={`info dib`}>
                                              <h3>{t('h_item85')}</h3>
                                              <p>Farm <span>BSC</span></p>
                                          </div>
                                      </div>
                                      <div className={`bottom`}>
                                          <div className={`p1`}>
                                              <span>{t('h_item86')}</span>
                                              {/*<img className={'dib'} src={require('../../../assets/images/icon_edit.png')} />*/}
                                          </div>
                                          <div className={`but`}>
                                              <a onClick={()=>{
                                                  history.push('/solution/detail/farm')
                                              }}>
                                                  <button className={`fz0`}><span className={`dib`}>{t('h_item82')}</span><img className={`dib`} src={require('../../../assets/images/arrow_green.png')} /></button>
                                              </a>
                                          </div>
                                      </div>
                                  </li>
                                  : ''
                          }

                      </ul>
                  </div>
                  : ''
          }

      </>
  );
};

export default Schemeawait;
