//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr,formatDate } from "../../tools/index";
import { useHistory,useLocation } from "react-router-dom";
import {
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { Image } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import {inftsQuery} from '../../tools/query';
import useStore from "../../tools/store";
import Copy from "../../components/Copy"
import {fetchPost,fetchGet} from "../../tools/https"
import Toast from "light-toast";
import useConfigCommon from "../../tools/configCommon";
import UploadImg from "../../components/UploadImg";


const Dex: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const [data_config,setdata_config] = useState({
        logo: "",
        project: "Pancakeswap",
        slogan: "",
        domain: "https://pancakeswap.mintameta.io",
        expire: 0,
    })
    const [search,setSearch] = useState('')
    const defData = {
        list: [],
        domain: "https://pancakeswap.mintameta.io",
    }
    const [data,setData] = useState(defData)
    const onSetLogo = useCallback(async(logo:string)=>{
        let obj = {}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        obj.data = {
            logo: logo
        }
        obj.signData = await window.web3.eth.personal.sign(JSON.stringify(obj.data),getStore.account[0])
        fetchPost('/dex/update',obj,configAll.httpsApi).then((res)=>{
            if (res.data.code == '0') {
                Toast.success(t('h_item88'))
                fetchGetConfig()
            }
        })
    })
    const onSearch = useCallback(()=>{
        if (!search) {
            Toast.fail(t('h_item11'))
            return
        }
        fetchGetConfig()
    })
    const fetchGetConfig = useCallback(async ()=>{
        let obj ={}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        fetchGet('dex',obj,configAll.httpsApi).then((res)=>{
            //console.log('dex',res)
            if(Object.keys(res.data.data).length > 0) {
                setdata_config(res.data.data)
            } else {
                setdata_config({
                    logo: "",
                    project: "Pancakeswap",
                    slogan: "",
                    domain: "https://pancakeswap.mintameta.io",
                    expire: 0,
                })
            }
        })
        obj.condition = search
        fetchGet('token/getTokenManageList',obj,configAll.httpsApi).then((res)=>{
            //console.log('getTokenManageList',res)
            if(Object.keys(res.data.data).length > 0) {
                let newArr = []
                for (let i in res.data.data) {
                    if (res.data.data[i].status>0) {
                        newArr.push(res.data.data[i])
                    }
                }
                setData({...data,list: newArr})
            } else {
                setData(defData)
            }
        })

    })
    const updateToken = useCallback(async (address: string)=>{
        let obj = {}
        obj.chain = getStore.chainName
        obj.creator = getStore.account[0]
        obj.data = {
            address: address,
            status: "0"
        }
        obj.signData = await window.web3.eth.personal.sign(JSON.stringify(obj.data),getStore.account[0])
        fetchPost('/token/updateToken',obj,configAll.httpsApi).then((res)=>{
            if (res.data.code == '0') {
                Toast.success(t('h_item88'))
                fetchGetConfig()
            }
        })
    })


    useEffect( ()=>{
        if (getStore.chainId) {
            fetchGetConfig()
        }
    },[getStore.account,getStore.chainId,getStore.popupAdminDexEditName,getStore.popupAdminDexRenew])
    useEffect( ()=>{
        if (!search) {
            fetchGetConfig()
        }
    },[search])
    return (
        <>
            <div className='content admin_dex_content w'>
                <div className={'banner banner_admin_dex fz0'}>
                    <ul>
                        <li className={'li1 fz0'}>
                            <div className={'dib'}>
                                <UploadImg setUploadImg={(e)=>{onSetLogo(e)}}  >
                                    <Image
                                        preview={false}
                                        src={data_config.logo ? configAll.ipfsHost + data_config.logo : ''}
                                        fallback={require('../../assets/images/icon_default_100.png')}
                                    />
                                </UploadImg>
                            </div>
                            <div className={'tit dib'}>
                                <h3>{data_config.project} <span style={{fontSize: 14}} onClick={()=>{
                                    setStore('popupInfo',{name: data_config.project})
                                    setStore('popupAdminDexEditName',true)
                                }}>
                                    <FormOutlined />
                                </span></h3>
                                <p>{data_config.domain ? data_config.domain : data.domain} <Copy toCopy={data_config.domain ? data_config.domain : data.domain} color={'#fff'} font={14} /></p>
                                <p>{t('h_item87')}：{formatDate(data_config.expire*1000)}</p>
                            </div>
                        </li>
                        <li className={'li2 fz0'}>
                            <button className={'dib'} onClick={ ()=>{setStore('popupAdminDexRenew',true)} }><PlusOutlined />{t('h_item89')}</button>
                            <button className={'dib'} onClick={ ()=>{setStore('popupAdminDexTokenList',true)} }><ReloadOutlined />{t('h_item39')}</button>
                            <button className={'dib'} onClick={ ()=>{setStore('popupAdminDexUpdateFee',true)} }><FormOutlined />{t('h_item45')}</button>
                        </li>
                    </ul>
                </div>
                <div className={`search fz0`}>
                    <div className={'big_title'}>{t('h_item90')}</div>
                    <div className={`search_input dib fz0`}>
                        <button className={'button2 dib fz0 mr10'}>
                            <SearchOutlined className={'dib'} />
                            <input className={'dib '} onChange={(e)=>{setSearch(e.target.value)}} placeholder={t('h_item91')} value={search} type={'text'} />
                        </button>
                        <button className={'button1 dib'} onClick={()=>{onSearch()}}>{t('h_item92')}</button>
                    </div>
                    <div className={`search_button dib fz0`} >
                        <button className={'button1 dib'} onClick={()=>{history.push('/solution/admin/dex/add')}}>{t('h_item93')}</button>
                    </div>
                </div>
                <div className={'list admin_dex_list'}>
                    <div className={'row'}>
                        {
                            data.list.map((item,index)=>{
                                return (
                                    <ul key={index}>
                                        <li className={'li1 li_img fz0'}>
                                            <div className={'dib '}>
                                                <Image
                                                    preview={false}
                                                    src={item.logoURI ? configAll.ipfsHost + item.logoURI : ''}
                                                    fallback={require('../../assets/images/eth.png')}
                                                />
                                            </div>
                                            <div className={'dib'}>
                                                <h3>{item.symbol}</h3>
                                                <p>{item.name}</p>
                                            </div>

                                        </li>
                                        <li className={'li2 li_type'}>
                                            <p className={'fz0'}><span className={'span1 dib'}>{t('h_item94')}</span><span className={'span2 dib'}>{getStore.chainName.toUpperCase()}</span></p>
                                            <p className={'fz0'}><span className={'span1 dib'}>{t('h_item95')}</span><span className={'span2 dib'}>{item.decimals}</span></p>
                                            <p className={'fz0'}><span className={'span1 dib'}>{t('h_item96')}</span><span className={'span2 dib'}>{item.address}</span></p>
                                        </li>
                                        <li className={'li5 li_edit fz0'}>
                                            {/*<button className={'b_edit dib'} onClick={()=>{history.push('/solution/admin/dex/edit', {id: item.id})} }>*/}
                                            {/*    <img className={'dib mr5'} src={require('../../assets/images/icon_edit_black.png')} width={13} height={13} />*/}
                                            {/*    <span className={'dib'}>编辑</span>*/}
                                            {/*</button>*/}
                                            <button className={'b_edit dib'} onClick={()=>{updateToken(item.address)}}>
                                                <img className={'dib mr5'} src={require('../../assets/images/icon_delete.png')} width={13} height={13} />
                                                <span className={'dib'}>{t('h_item97')}</span>
                                            </button>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                        {data.list.length>0 ? '' : <div className={'no_data'}>{t('h_item29')}</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dex;
