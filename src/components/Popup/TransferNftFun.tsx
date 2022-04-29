//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr } from "../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Copy from "../Copy";
import configAll from "../../tools/config";
import Toast from "light-toast";
import { substringStr } from "../../tools/index"
import useStore from "../../tools/store";
import {useSetNftTransferFrom} from "../../tools/chain";
import * as metaMaskTools from "../../tools/chain";

export default function TransferNftFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {
        contractAddress_: '',
        to: '',
        tokenId: '',
    }
    const [data,setData] = useState(defData)
    const { setNftTransferFrom } = useSetNftTransferFrom()
    const setCoinFun = useCallback(async ()=>{
        if (!data.contractAddress_) {
            Toast.fail(t('h_item49'))
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
        if (data.tokenId<0) {
            Toast.fail(t('h_item67'))
            return
        }
        setNftTransferFrom(data.contractAddress_,getStore.account[0],data.to,data.tokenId).then((res)=>{
            setStore('popupTransferNft',false)
        })
    })
    useEffect(()=>{
        if (Object.keys(getStore.popupInfo).length > 0) {
            let item = getStore.popupInfo
            // //console.log('item.NFTId_',item.NFTId_)
            setData({...defData,contractAddress_:item.contractAddress_, tokenId: item.NFTId_})
        }
    },[getStore.popupTransferNft])
    useEffect(()=>{
        setStore('popupTransferNft',false)
    },[getStore.account,getStore.chainId])
    return (
        <>
            <Modal
                isOpen={getStore.popupTransferNft}
                onDismiss={()=>{setStore('popupTransferNft',false)}}
                width="440px"
                showHeader={true}
                title={t('h_item68')}
            >
                <div className={'popup_w popup_coin'}>
                    <div className={'row'}>
                        <h3>{t('h_item69')}</h3>
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
