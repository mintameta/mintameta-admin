//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {BigNumberMul, BigNumberStr, BigNumberSub} from "../../../tools/index";
import { useHistory,useLocation } from "react-router-dom";
import {Radio} from 'antd';
import {substringStr} from "../../../tools";
import UploadImg from '../../../components/UploadImg'
import useStore from "../../../tools/store";
import { useSetBox } from '../../../tools/chain'
import Toast from "light-toast";
import {useQuery} from "@apollo/react-hooks";
import {inftsQuery} from "../../../tools/query";
import * as metaMaskTools from '../../../tools/chain'

const Add: React.FC = () => {
    const { t } = useTranslation()
    const {getStore,setStore} = useStore()
    const { pathname } = useLocation()
    const history = useHistory();
    const [data_fee,set_data_fee] = useState(0)
    const defData = {
        search: '',
        id: null,
        uploadImg: null,
        title: '',
        fulltitle: '',
        chain: 1,
        selectNft: [],
        insertNft: [
            {selectChecked: '',num: '',maxMintNum_: 0,mintedNum_: 0,inBoxNum_: 0}
        ],
        insertNftMax: 5,
        total: '',
        dec: 18,
        user: '',
        contract: '',
        projectInfo: '',
        status: 0,
        use: 0,
    }
    const [data,setData] = useState(defData)

    const addPrimeAttr = useCallback(()=>{
        if (data.insertNft.length>=data.insertNftMax) {
            Toast.fail(t('h_item165'))
            return
        }
        let arr = data.insertNft
        const obj = {selectChecked: '',num: '',maxMintNum_: 0,mintedNum_: 0,inBoxNum_: 0}
        arr.push(obj)
        setData({...data,primeAttr: arr})
    })
    const delPrimeAttr = useCallback((index)=>{
        if (data.insertNft.length<=1) {
            Toast.fail(t('h_item166'))
            return
        }
        let arr = data.insertNft
        arr.splice(index,1)
        setData({...data,primeAttr: arr})
    })
    const arrUpdate = useCallback((arrKey,index,metaKey,newValue)=>{
        let newArr = data[arrKey]
        // //console.log(metaKey,newValue)
        newArr[index][metaKey] = newValue
        // //console.log(metaKey,newArr)
        // //console.log('data.insertNft[i]',data.insertNft)
        if (metaKey == 'selectChecked') {
            let insertMore = 0
            for (let i in data.insertNft) {
                let insert = data.insertNft[i]
                //console.log(insert.selectChecked,newValue,insert.selectChecked == newValue)
                if (insert.selectChecked == newValue) {
                    insertMore++
                }
            }
            if (insertMore > 1) {
                Toast.fail(t('h_item167'))
                let insert = data.insertNft
                insert[index] = {selectChecked: '',num: '',maxMintNum_: 0,mintedNum_: 0,inBoxNum_: 0}
                // //console.log('insert',insert)
                setData({...data,insertNft: insert})
                return
            }
            for (let i in data.selectNft) {
                let contract = data.selectNft[i]
                if (contract.contractAddress_ == newValue) {
                    newArr[index]['maxMintNum_'] = contract.maxMintNum_
                    newArr[index]['mintedNum_'] = contract.mintedNum_
                    newArr[index]['inBoxNum_'] = contract.inBoxNum_
                    break
                }
            }
        }
        setData({...data,[arrKey]: newArr})

    })

    const { createNFTContract } = useSetBox()
    const createNFTContract1 = useCallback(()=>{
        if (!data.fulltitle || !data.title || !data.uploadImg) {
            Toast.fail(t('h_item110'))
            return
        }
        const param2 = []
        const param3 = []
        for(let i in data.insertNft){
            let item = data.insertNft[i]
            // //console.log('item',item)
            if (!item.selectChecked || item.num<=0) {
                Toast.fail(t('h_item168'))
                return
            }
            if (item.num*1 > (BigNumberSub(BigNumberSub(item.maxMintNum_, item.mintedNum_), item.inBoxNum_))) {
                Toast.fail(t('h_item178'))
                return
            }
            param2.push(item.selectChecked)
            param3.push(item.num)
        }
        const param0 = [data.fulltitle,data.title,data.uploadImg,data.projectInfo]
        const param1 = [data.use,0,0]
        let value = data_fee
        createNFTContract(param0,param1,param2,param3,value).then((data)=>{
            // history.push('/nfts')
            setData(defData)
            setStore('reload',!getStore.reload)
        })
    })
    const infts_data = useQuery(inftsQuery({owner_: getStore.account[0] ?? '0x',nftType: 1}))
    const getBoxFee = useCallback(async ()=>{
        if (getStore.account.length>0) {
            metaMaskTools.getBoxFee().then((res)=>{
                // console.log('res',res)
                set_data_fee(res)
            })
        }
    })
    useEffect( ()=>{
        infts_data.refetch().catch((e)=>{})
        if (infts_data.data) {
            // console.log('infts_data',infts_data.data.infts)
            setData({...data,selectNft: infts_data.data.infts})
        } else {
            setData({...data,selectNft: []})
        }
        getBoxFee()
    },[infts_data,getStore.account,getStore.chainId,getStore.reload])

    return (
    <>
        <div className='content nfts_content w '>
            <div className={'project_add fz0'}>
                <div className={`item item1 dib `} >
                    <div className={'padd fz0 cp'} onClick={()=>{history.push('/blindbox')}}>
                        <img className={'dib mr10 cp'} src={require('../../../assets/images/icon_back.png')}  />
                        <h3 className={'dib'}>{t('h_item77')}</h3>
                    </div>
                </div>
                <div className={`item item2 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h3>{t('h_item169')} <span className={'color_green'}>*</span></h3>
                            {/*<div className={'img'}>*/}
                            {/*    <img className={'img_upload dib'} src={require('../../../assets/images/img_upload.png')}/>*/}
                            {/*</div>*/}
                            <UploadImg imageUrl={data.uploadImg} setUploadImg={(e)=>{setData({...data,uploadImg: e})}}  />
                        </div>
                        <div className={'row'}>
                            <div className={'tablist_add fz0'}>
                                <ul>
                                    <li className={` ${pathname == '/blindbox/add' ? 'active' : ''} `} onClick={()=>{history.push('/blindbox/add')}}>{t('h_item156')}</li>
                                    <li className={` ${pathname == '/blindbox/add/advance' ? 'active' : ''} `} onClick={()=>{Toast.info(t('h_item158'))}}>{t('h_item157')}</li>
                                </ul>
                            </div>

                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item170')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} maxLength={30} placeholder={'e.g.”CryptoKitties”'} value={data.fulltitle} onChange={(e)=>{setData({...data,fulltitle: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item171')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} maxLength={30} placeholder={'e.g.”CK”'} value={data.title} onChange={(e)=>{setData({...data,title: e.target.value})}} />
                        </div>
                    </div>
                </div>
                <div className={`item item3 dib`}>
                    <div className={'padd'}>

                        <div className={'insertNft'}>
                            {
                                data.insertNft.map((item,index)=>{
                                    return (
                                        <div className={'attr_from'} key={index}>
                                            <div className={'padd1'}>
                                                <img className={'cp del'} width={25} height={25} onClick={()=>{delPrimeAttr(index)}} src={require('../../../assets/images/btn_clear.png')} />
                                                <div className={'row'}>
                                                    <h3>{t('h_item172')} <span className={'color_green'}>*</span></h3>
                                                    <div className={'select_def'}>
                                                        <select value={item.selectChecked} className={'select_def1'} onChange={(e)=>{arrUpdate('insertNft',index,'selectChecked',e.target.value)}}>
                                                            <option value={''}>{t('h_item173')}</option>
                                                            {
                                                                data.selectNft.map((item1,index1)=>{
                                                                    return (
                                                                        <option key={index1} value={item1.contractAddress_} >{item1.symbol_}({substringStr(item1.contractAddress_)})</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className={'row'}>
                                                    <h3>{t('h_item174')} <span className={'color_green'}>*</span>
                                                        <span className={'fr color_green'}>{t('h_item175')}：
                                                        {
                                                            item.selectChecked ?
                                                                BigNumberSub(BigNumberSub(item.maxMintNum_, item.mintedNum_), item.inBoxNum_)
                                                                : 0
                                                        }
                                                        </span>
                                                    </h3>
                                                    <input className={'input_def'} type={'test'} placeholder={''} value={item.num} onChange={(e)=>{arrUpdate('insertNft',index,'num', e.target.value>0 ? BigNumberStr(e.target.value,0,0) : '')}} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className={'row'}>
                                <button className={'color_green'} style={{textDecoration: 'underline'}} onClick={()=>{addPrimeAttr()}}>+ {t('h_item176')}</button>
                            </div>
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item144')}</h3>
                            <Radio.Group  value={data.use} onChange={(e)=>{setData({...data,use: e.target.value})}}>
                                <Radio value={0}>{t('h_item145')}</Radio>
                                <Radio value={1}>{t('h_item146')}</Radio>
                            </Radio.Group>
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item177')}</h3>
                            <textarea className={'input_def'} value={data.projectInfo} rows={'4'} maxLength={100} onChange={(e)=>{setData({...data,projectInfo: e.target.value})}} />
                        </div>
                        <div className={'row tc'}>
                            <p style={{textAlign: 'left',marginTop: 30, marginBottom: 10}}><span>{t('h_item136')}：</span><span className={'color_green'}>{BigNumberStr(data_fee,getStore.BNBDec,2)} BNB</span></p>
                            <button className={'button_def'} style={{maxWidth: "380px",width: "100%"}} onClick={()=>{createNFTContract1()}}>{t('h_item33')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Add;
