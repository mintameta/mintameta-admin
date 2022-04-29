//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {BigNumberStr, BigNumberSub} from "../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Copy from "../Copy";
import configAll from "../../tools/config";
import Toast from "light-toast";
import { substringStr } from "../../tools/index"
import useStore from "../../tools/store";
import {useSetNftMint} from "../../tools/chain";
import * as metaMaskTools from "../../tools/chain";

export default function CoinFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {
        NFTAddress: '',
        allowance: 0,
        coinNum: '',
        to: '',
    }
    const [data,setData] = useState(defData)
    const { setNftMint } = useSetNftMint()
    const setCoinFun = useCallback(async ()=>{
        if (!data.NFTAddress) {
            Toast.fail(t('h_item49'))
            return
        }
        if (data.coinNum<=0) {
            Toast.fail(t('h_item50'))
            return
        }
        if (data.coinNum>10) {
            Toast.fail(t('h_item153'))
            return
        }
        if (data.coinNum*1>data.allowance*1) {
            Toast.fail(t('h_item51'))
            return
        }
        if (!data.to) {
            Toast.fail(t('h_item52'))
            return
        }
        let isContract = await metaMaskTools.getCode(data.to).catch((e)=>{return 0})
        // console.log('isContract',isContract)
        if (!isContract) {
            Toast.fail(t(t('h_item58')))
            return
        }
        setNftMint(data.NFTAddress,data.to,data.coinNum).then((res)=>{
            setStore('popupCoin',false)
        })
    })
    useEffect(()=>{
        if (Object.keys(getStore.popupInfo).length > 0) {
            // //console.log('getStore.popupInfo',getStore.popupInfo)
            let item = getStore.popupInfo
            let allowance = BigNumberSub(item.maxMintNum_,item.mintedNum_)
            setData({...defData,NFTAddress: item.contractAddress_,allowance: allowance})
        }
    },[getStore.popupCoin])
    useEffect(()=>{
        setStore('popupCoin',false)
    },[getStore.account,getStore.chainId])
    return (
        <>
            <Modal
                isOpen={getStore.popupCoin}
                onDismiss={()=>{setStore('popupCoin',false)}}
                width="440px"
                showHeader={true}
                title={t('h_item60')}
            >
                <div className={'popup_w popup_coin'}>
                    <div className={'row'}>
                        <h3 className={'dlr fz0'}>
                            <dd className={'dib dl'}>{t('h_item54')}</dd>
                            <dd className={'dib dr fz0'}><span className={'color_gray dib'}>{t('h_item55')}：</span> <span className={'dib'}>{data.allowance}</span></dd>
                        </h3>
                        <input className={'input_def'} type={'text'} placeholder={t('h_item153')} value={data.coinNum} onChange={(e)=>{setData({...data,coinNum: e.target.value>0 ? BigNumberStr(e.target.value,0,0) : '' })} } />
                    </div>
                    <div className={'row'}>
                        <h3>{t('h_item56')}</h3>
                        <input className={'input_def'} type={'text'} placeholder={t('h_item57')} value={data.to} onChange={(e)=>{setData({...data,to: e.target.value})} } />
                    </div>
                    <div className={'row tc'}>
                        <p style={{textAlign: 'left',marginTop: 20, marginBottom: 10}}></p>
                        <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{setCoinFun()}}>{t('h_item33')}</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
