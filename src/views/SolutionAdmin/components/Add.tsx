//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr } from "../../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
import {Radio} from 'antd';
import UploadImg from '../../../components/UploadImg'
import Toast from "light-toast";
import useStore from "../../../tools/store";
import * as metaMaskTools from "../../../tools/chain";
import {fetchPost,fetchGet} from "../../../tools/https"
import useConfigCommon from "../../../tools/configCommon";

const Add: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const defData = {
        id: null,
        uploadImg: '',
        chain: 'bsc',
        token: '',
        decimals: "",
        fullName: "",
        symbol: "",
        totalSupply: "",
    }
    const [data,setData] = useState(defData)
    // //console.log('history',history)
    const onSearch = useCallback(async ()=>{
        Toast.loading()
        if (!data.token) {
            Toast.hide()
            Toast.fail(t('h_item101'))
            return
        }
        metaMaskTools.getTokenInfo(data.token).then((res)=>{
            Toast.hide()
            console.log('res',res)
            setData({...data,
                decimals: res.decimals,
                fullName: res.fullName,
                symbol: res.symbol,
                totalSupply: res.totalSupply,
            })
        })
        Toast.hide()
    })
    const addToken = useCallback(async()=>{
        if (!data.token) {
            Toast.fail(t('h_item101'))
            return
        }
        if (!data.uploadImg) {
            Toast.fail(t('h_item102'))
            return
        }
        let obj ={}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        obj.data = {
            address: data.token,
            logoURI: data.uploadImg,
        }
        obj.signData = await window.web3.eth.personal.sign(JSON.stringify(obj.data),getStore.account[0])
        //console.log('obj',obj)
        fetchPost('/token/addToken',obj,configAll.httpsApi).then((res)=>{
            //console.log('addToken',res)
            if (res.data.code == '0') {
                Toast.success(t('h_item107'))
                setData(defData)
            }

        })
    })
    useEffect(()=>{

    },[getStore.account,getStore.chainId])
    useEffect(()=>{
        if (data.token) {
            metaMaskTools.getCode(data.token).then((res)=>{
                onSearch()
            }).catch((e)=>{return 0})
        }
    },[data.token])
  return (
    <>
        <div className='content token_content w '>
            <div className={'project_add fz0'}>
                <div className={`item item1 dib `} >
                    <div className={'padd fz0 cp'} onClick={()=>{history.push('/solution/admin/dex')}}>
                        <img className={'dib mr10 cp'} src={require('../../../assets/images/icon_back.png')}  />
                        <h3 className={'dib'}>{t('h_item93')}</h3>
                    </div>
                </div>
                <div className={`item item2 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h3>{t('h_item103')}</h3>
                            {/*<div className={'img'}>*/}
                            {/*    <img className={'img_upload dib'} src={require('../../../assets/images/img_upload.png')}/>*/}
                            {/*</div>*/}
                            <UploadImg imageUrl={data.uploadImg} setUploadImg={(e)=>{setData({...data,uploadImg: e})}}  />
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item94')} <span className={'color_green'}>*</span></h3>
                            <div className={'select_def'}>
                                <select defaultValue={data.chain} className={'select_def1'} onChange={(e)=>{setData({...data,chain: e.target.value})}}>
                                    <option value="1">BSC</option>
                                    {/*<option value="2">HECO</option>*/}
                                </select>
                            </div>
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item104')} <span className={'color_green'}>*</span></h3>
                            <div className={'fz0'}>
                                <input className={'input_def dib mr10'} style={{width: 'calc(100% - 92px)'}} type={'text'} placeholder={'e.g.”Token”'} value={data.token} onChange={(e)=>{setData({...data,token: e.target.value})}} />
                                <div className={'dib tar'}><button className={'button_def dib'} onClick={()=>{onSearch()}}>{t('h_item92')}</button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`item item3 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h3>{t('h_item105')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”Ethereum”'} value={data.fullName} onChange={(e)=>{setData({...data,fullName: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item106')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”ETH”'} value={data.symbol} onChange={(e)=>{setData({...data,symbol: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item95')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”18”'} value={data.decimals} onChange={(e)=>{setData({...data,decimals: e.target.value})}} />
                        </div>
                        <div className={'row tc'}>
                            <p style={{textAlign: 'left',marginTop: 30, marginBottom: 10}}></p>
                            <button className={'button_def'} style={{maxWidth: "380px",width: "100%"}} onClick={()=>{addToken()}}>{t('h_item33')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Add;
