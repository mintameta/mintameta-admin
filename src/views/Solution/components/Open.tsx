//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {useHistory, useLocation} from "react-router-dom";
import Toast from "light-toast";
import { BigNumberStr,formatDate,getFormatTime } from "../../../tools/index";
import useStore from "../../../tools/store";
import * as metaMaskTools from "../../../tools/chain"
import {useSetCreateDex} from "../../../tools/chain"

import {Radio} from 'antd';
import UploadImg from '../../../components/UploadImg'
import Copy from "../../../components/Copy";

const Open: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const [data_step,set_data_step] = useState(1)
    const [data_address,set_data_address] = useState('')
    const [data_getComboList,set_data_getComboList] = useState([])
    const defData = {
        name: 'Dex',
        path: '/solution/admin/dex',
        chain: 'bsc',
        title: '',
        uploadImg: '',
        fee: 0.3,
        rate: 0.25,
        address: '',
        projectInfo: '',
        timeLimit: 0,
        www: '',
        url: 'https://xxxswap.mintameta.io',
    }
    const [data,setData] = useState(defData)
    const {setCreateDex} = useSetCreateDex()
    const setCreateDexFun = useCallback(()=>{
        if (!data.title || !data.www || !data.projectInfo || !data_address || !data.uploadImg || !data_getComboList.length) {
            Toast.fail(t('h_item110'))
            return
        }
        let value = data_getComboList[data.timeLimit]['price']
        setCreateDex(data.timeLimit,data_address,data.title,data.www,data.uploadImg,data.projectInfo,value).then((res)=>{
            set_data_step(2)
            setStepFun()
        })
    })
    const setStepFun = useCallback(()=>{
        setTimeout(()=>{
            set_data_step(3)
        },15*1000)

    })
    useEffect(()=>{
        if (pathname == '/solution/open/dex') {
            setData({...data,name: 'Dex',path: '/solution/admin/dex'})
        } else if (pathname == '/solution/open/nft') {
            setData({...data,name: 'NFT Market',path: '/solution/admin/nft'})
        } else if (pathname == '/solution/open/farm') {
            setData({...data,name: 'Farm',path: '/solution/admin/farm'})
        }
    },[pathname])
    useEffect(()=>{
        if (getStore.account.length>0) {
            set_data_address(getStore.account[0])
            metaMaskTools.getComboList().then((res)=>{
                // console.log('getComboList',res)
                set_data_getComboList(res)
            })
        }
    },[getStore.account,getStore.chainId])
    // //console.log('history',history)
  return (
    <>
        <div className='content project_content w '>
            <div className={'project_add fz0'}>
                <div className={`item item1 dib `} >
                    <div className={'padd fz0 cp'} onClick={()=>{history.push('/solution')}}>
                        <img className={'dib mr10 cp'} src={require('../../../assets/images/icon_back.png')}  />
                        <h3 className={'dib'}>{t('h_item111')} {data.name}</h3>
                    </div>
                    <div className={'tablist_open'}>
                        <ul>
                            <li className={` ${data_step >= 1 ? 'active' : ''} `}>{data.name} {t('h_item112')}</li>
                            <li className={` ${data_step >= 2 ? 'active' : ''} `}>{data.name} {t('h_item113')}</li>
                            <li className={` ${data_step >= 3 ? 'active' : ''} `}>{t('h_item114')}</li>
                        </ul>
                    </div>
                </div>
                {
                    data_step == 1 ? (
                        <>
                        <div className={`item item2 dib`}>
                            <div className={'padd'}>
                                <div className={'row'}>
                                    <h3>{data.name} {t('h_item115')} <span className={'color_green'}>*</span></h3>
                                    <input className={'input_def'} type={'text'} maxLength={20} placeholder={'e.g.”Pancakeswap”'} value={data.title} onChange={(e)=>{setData({...data,title: e.target.value})}} />
                                </div>
                                <div className={'row'}>
                                    <h3>{data.name} {t('h_item116')} <span className={'color_green'}>*</span></h3>
                                    <input className={'input_def'} type={'text'} maxLength={20} placeholder={'e.g.”test”'} value={data.www} onChange={(e)=>{setData({...data,www: e.target.value})}} />
                                </div>
                                <div className={'row'}>
                                    <h3>{data.name} {t('h_item117')} <span className={'color_green'}>*</span></h3>
                                    {/*<div className={'img'}>*/}
                                    {/*    <img className={'img_upload dib'} src={require('../../../assets/images/img_upload.png')}/>*/}
                                    {/*</div>*/}
                                    <UploadImg imageUrl={data.uploadImg} setUploadImg={(e)=>{setData({...data,uploadImg: e})}}  />
                                    <p className={'color_gray'}>{t('h_item118')}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`item item3 dib`}>
                            <div className={'padd'}>
                                {/*<div className={'row'}>*/}
                                {/*    <h3>交易手续费比例(%) <span className={'color_green'}>*</span></h3>*/}
                                {/*    <input className={'input_def'} type={'text'} value={data.fee} onChange={(e)=>{setData({...data,fee: e.target.value})}} />*/}
                                {/*</div>*/}
                                {/*<div className={'row'}>*/}
                                {/*    <h3>LP提供者奖励比例(%) <span className={'color_green'}>*</span></h3>*/}
                                {/*    <input className={'input_def'} type={'text'} value={data.rate} onChange={(e)=>{setData({...data,rate: e.target.value})}} />*/}
                                {/*</div>*/}
                                <div className={'row'}>
                                    <h3>{t('h_item119')} <span className={'color_green'}>*</span></h3>
                                    <input className={'input_def'} type={'text'} placeholder={t('h_item47')} value={data_address} onChange={(e)=>{set_data_address(e.target.value)}} />
                                </div>
                                <div className={'row'}>
                                    <h3>{t('h_item120')} <span className={'color_green'}>*</span></h3>
                                    <textarea className={'input_def'} value={data.projectInfo} placeholder={`${t('h_item121')} ${data.name}`} rows={'1'} maxLength={50} onChange={(e)=>{setData({...data,projectInfo: e.target.value})}} />
                                </div>
                                <div className={'row'}>
                                    <h3>{t('h_item122')} <span className={'color_green'}>*</span></h3>
                                    {
                                        data_getComboList.length > 0 ?
                                            <Radio.Group  value={data.timeLimit} onChange={(e)=>{setData({...data,timeLimit: e.target.value})}}>
                                                {
                                                    data_getComboList.map((item,index)=>{
                                                        return (
                                                            <dl key={index}><Radio value={index}>{getFormatTime(item.duration)[0]} {t('h_item38')} </Radio><span className={'dib color_green fr'}>{BigNumberStr(item.price,getStore.BNBDec,2)} BNB</span></dl>
                                                        )
                                                    })
                                                }
                                            </Radio.Group>
                                            : ''
                                    }
                                </div>
                                <div className={'row tc'}>
                                    <p style={{textAlign: 'left',marginTop: 30, marginBottom: 10}}></p>
                                    <button className={'button_def'} style={{maxWidth: "380px",width: "100%"}} onClick={()=>{setCreateDexFun()}}>{t('h_item123')}</button>
                                </div>
                            </div>
                        </div>
                        </>
                    ) : ''
                }
                {
                    data_step == 2 ? (
                        <>
                            <div className={`item item4 dib`}>
                                <div className={'padd'}>
                                    <div className={'open_deploy'}>
                                        <h2>{t('h_item124')}</h2>
                                        <div className={'step step1'}><button>{t('h_item125')}</button></div>
                                        <div className={'step step2'}><button>{t('h_item126')}</button></div>
                                        <div className={'step step3'}><button>{data.name}{t('h_item127')}</button></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : ''
                }
                {
                    data_step == 3 ? (
                        <>
                            <div className={`item item5 dib`}>
                                <div className={'padd'}>
                                    <div className={'open_success'}>
                                        <div className={'row img'}>
                                            <img src={require('../../../assets/images/img_complete.png')} />
                                            <h2>{t('h_item114')}</h2>
                                        </div>
                                        {/*<div className={'row'}>*/}
                                        {/*    <h3>{data.name}访问地址</h3>*/}
                                        {/*    <div className={'copy'}>*/}
                                        {/*        <button className={'copy_button'}>*/}
                                        {/*            <span>{data.url}</span>*/}
                                        {/*            <span className={'fr'}>*/}
                                        {/*                <Copy toCopy={data.url}/>*/}
                                        {/*            </span>*/}
                                        {/*        </button>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <div className={'row'}></div>
                                        <div className={'row'}>
                                            <button className={'button_def'} style={{maxWidth: "380px",width: "100%"}} onClick={()=>{history.push(data.path)}}>{t('h_item73')}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : ''
                }

            </div>
        </div>
    </>
  );
};

export default Open;
