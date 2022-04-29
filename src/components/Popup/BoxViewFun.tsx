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
import * as metaMaskTools from "../../tools/chain";

export default function BoxViewFun() {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const [data_boxContract,set_data_boxContract] = useState('')
    const [data_list,set_data_list] = useState([])
    const defData = {
        list: []
    }
    const [data,setData] = useState(defData)
    const aFun = useCallback(async (boxContract)=>{
        Toast.loading()
        await metaMaskTools.getBoxViewNft(boxContract).then(async (res)=>{
            //console.log('res',res)
            let getBoxViewNft = res
            if (getBoxViewNft && getBoxViewNft.length>0) {
                let newArr=[]
                if (getBoxViewNft.NFTAddressArr.length>0) {
                    for(let i in getBoxViewNft.NFTAddressArr) {
                        let obj = {}
                        obj.NFTAddressArr = getBoxViewNft.NFTAddressArr[i]
                        obj.NFTOpened = getBoxViewNft.NFTOpened[i]
                        obj.NFTTotal = getBoxViewNft.NFTTotal[i]
                        let name = ''
                        // console.log('obj.NFTAddressArr',obj.NFTAddressArr)
                        await metaMaskTools.getNftInfoName(obj.NFTAddressArr).then((res1)=>{
                            // //console.log('res1',res1)
                            name=res1
                        })
                        obj.name = name
                        newArr.push(obj)
                    }
                    set_data_list(newArr)
                }

            }
        })
        Toast.hide()
    },[data_boxContract])
    useEffect(()=>{
        // //console.log('getStore.popupBoxView',getStore.popupBoxView)
        if (getStore.popupBoxView) {
            if (Object.keys(getStore.popupInfo).length > 0) {
                // //console.log('getStore.popupInfo',getStore.popupInfo)
                let item = getStore.popupInfo
                set_data_boxContract(item.contractAddress_)
                aFun(item.contractAddress_)
            }
        } else {
            set_data_boxContract('')
            set_data_list([])
        }
    },[getStore.popupBoxView])
    useEffect(()=>{
        Toast.hide()
        setStore('popupBoxView',false)
    },[getStore.account,getStore.chainId])
    return (
        <>
            <Modal
                isOpen={getStore.popupBoxView}
                onDismiss={()=>{setStore('popupBoxView',false)}}
                width="440px"
                showHeader={true}
                title={t('h_item59')}
            >
                <div className={'popup_w popup_boxview'}>
                    <div className={'padd'}>
                    {
                        data_list.map((item,index)=>{
                            return (
                                <div className={'row'} key={index}>
                                    <h3>NFT-{index*1+1}</h3>
                                    <div className={'info'}>
                                        <div className={'dlr fz0'}>
                                            <dd className={'dib dl'}>{substringStr(item.name,6,1)}</dd>
                                            <dd className={'dib dr fz0'}>{item.NFTTotal}</dd>
                                        </div>
                                        <p>{item.NFTAddressArr}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {data_list.length>0 ? '' : <div className={'no_data'}>{t('h_item29')}</div>}
                    </div>
                    <div className={'row tc'}>
                        <p style={{textAlign: 'left',marginTop: 20, marginBottom: 10}}></p>
                        <button className={'button_def'} style={{maxWidth: "180px",width: "100%"}} onClick={()=>{setStore('popupBoxView',false)}}>{t('h_item33')}</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
