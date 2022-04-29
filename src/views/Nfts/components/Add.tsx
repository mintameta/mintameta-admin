//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {BigNumberStr, BigNumberSub} from "../../../tools/index";
import { useHistory,useLocation } from "react-router-dom";
import {Radio} from 'antd';
import UploadImg from '../../../components/UploadImg'
import useStore from "../../../tools/store";
import { useSetNft } from '../../../tools/chain'
import Toast from "light-toast";
import {BigNumberMul} from "../../../tools";
import * as metaMaskTools from '../../../tools/chain'

const Add: React.FC = () => {
    const { t } = useTranslation()
    const {getStore,setStore} = useStore()
    const { pathname } = useLocation()
    const history = useHistory();
    const [data_fee,set_data_fee] = useState(0)
    const defData = {
        data_amount1: '',
        data_amount2: '',
        id: 0,
        uploadImg: '',
        fulltitle: '',
        title: '',
        chain: 0,
        total: '',
        dec: 18,
        user: '',
        contract: '',
        projectInfo: '',
        status: 1,
        use: 0,
    }
    const [data,setData] = useState(defData)

    const { createNFTContract } = useSetNft()
    const createNFTContractFun = useCallback(()=>{
        if (!data.fulltitle || !data.title || !data.total || !data.uploadImg) {
            Toast.fail(t('h_item110'))
            return
        }
        // console.log('data.total',BigNumberSub(data.total,Math.pow(10,18),0))
        if (BigNumberSub(data.total,Math.pow(10,18),0) >= 0) {
            Toast.fail(t('h_item163'))
            return
        }
        const param0 = [data.fulltitle,data.title,data.uploadImg,data.projectInfo]
        const param1 = [data.use,data.total,0]
        let value = data_fee
        createNFTContract(param0,param1,value).then((data)=>{
            // history.push('/nfts')
            setData(defData)
        })
    })
    const getNftFee = useCallback(async ()=>{
        if (getStore.account.length>0) {
            metaMaskTools.getNftFee().then((res)=>{
                // console.log('res',res)
                set_data_fee(res)
            })
        }
    })
    useEffect( ()=>{
        getNftFee()
    },[getStore.account,getStore.chainId])

  return (
    <>
        <div className='content nfts_content w '>
            <div className={'project_add fz0'}>
                <div className={`item item1 dib `} >
                    <div className={'padd fz0 cp'} onClick={()=>{history.push('/nfts')}}>
                        <img className={'dib mr10 cp'} src={require('../../../assets/images/icon_back.png')}  />
                        <h3 className={'dib'}>{t('h_item76')}</h3>
                    </div>
                </div>
                <div className={`item item2 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h3>{t('h_item155')}</h3>
                            <div className={'tablist_add fz0'}>
                                <ul>
                                    <li className={` ${pathname == '/nfts/add' ? 'active' : ''} `} onClick={()=>{history.push('/nfts/add')}}>{t('h_item156')}</li>
                                    <li className={` ${pathname == '/nfts/add/advance' ? 'active' : ''} `} onClick={()=>{Toast.fail(t('h_item158'))}}>{t('h_item157')}</li>
                                </ul>
                            </div>

                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item159')} <span className={'color_green'}>*</span></h3>
                            {/*<div className={'img'}>*/}
                            {/*    <img className={'img_upload dib'} src={require('../../../assets/images/img_upload.png')}/>*/}
                            {/*</div>*/}
                            <UploadImg imageUrl={data.uploadImg} setUploadImg={(e)=>{setData({...data,uploadImg: e})}}  />
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item160')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} maxLength={30} type={'text'} placeholder={'e.g.”CryptoKitties”'} value={data.fulltitle} onChange={(e)=>{setData({...data,fulltitle: e.target.value})} } />
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item161')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} maxLength={30} type={'text'} placeholder={'e.g.”CK”'} value={data.title} onChange={(e)=>{setData({...data,title: e.target.value})} } />
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item147')} <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”100000” '} value={data.total} onChange={(e)=>{setData({...data,total: e.target.value>0 ? BigNumberStr(e.target.value,0,0) : ''})} } />
                        </div>
                    </div>
                </div>
                <div className={`item item3 dib`}>
                    <div className={'padd'}>
                        {/*<div className={'row'}>*/}
                        {/*    <h3>发行链 <span className={'color_green'}>*</span></h3>*/}
                        {/*    <div className={'select_def'}>*/}
                        {/*        <select defaultValue={data.chain} className={'select_def1'} onChange={(e)=>{setData({...data,chain: e.target.value})} }>*/}
                        {/*            <option value="1">BSC</option>*/}
                        {/*            <option value="2">HECO</option>*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className={'row'}>
                            <h3>{t('h_item144')}</h3>
                            <Radio.Group  value={data.use} onChange={(e)=>{setData({...data,use: e.target.value})} }>
                                <Radio value={0}>{t('h_item145')}</Radio>
                                <Radio value={1}>{t('h_item72')}</Radio>
                                <Radio value={2}>{t('h_item146')}</Radio>
                            </Radio.Group>
                        </div>
                        <div className={'row'}>
                            <h3>{t('h_item162')}</h3>
                            <textarea className={'input_def'} value={data.projectInfo} rows={'4'} maxLength={100} onChange={(e)=>{setData({...data,projectInfo: e.target.value})} } />
                        </div>
                        {/*<div className={'row'}>*/}
                        {/*    <h3>NFT合约是否开源</h3>*/}
                        {/*    <Radio.Group  value={data.status} onChange={(e)=>{setData({...data,status: e.target.value})}}>*/}
                        {/*        <Radio value={1}>否</Radio>*/}
                        {/*        <Radio value={2}>是</Radio>*/}
                        {/*    </Radio.Group>*/}
                        {/*</div>*/}
                        <div className={'row tc'}>
                            <p style={{textAlign: 'left',marginTop: 30, marginBottom: 10}}><span>{t('h_item136')}：</span><span className={'color_green'}>{BigNumberStr(data_fee,getStore.BNBDec,2)} BNB</span></p>
                            <button className={'button_def'} style={{maxWidth: "380px",width: "100%"}} onClick={()=>{createNFTContractFun()}}>{t('h_item33')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Add;
