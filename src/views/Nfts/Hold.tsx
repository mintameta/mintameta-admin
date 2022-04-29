//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {BigNumberStr, substringStr} from "../../tools/index";
import { useHistory,useLocation } from "react-router-dom";
import {
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
    CaretRightOutlined,
} from '@ant-design/icons';
import { Image } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import {inftsinglesQuery} from '../../tools/query';
import useStore from "../../tools/store";
import useConfigCommon from "../../tools/configCommon";
import Toast from "light-toast";

const Hold: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const [search,setSearch] = useState('')
    const where = search ? search : ''
    const infts_data = useQuery(inftsinglesQuery({where: search,owner_: getStore.account[0] ?? '0x'}))
    const [data,setData] = useState({
        search: '',
        list: []
    })
    const onSearch = useCallback(()=>{
        if (!data.search) {
            Toast.fail(t('h_item11'))
            return
        }
        setSearch(data.search)
    })
    const onDel = useCallback((id)=>{

    })
    useEffect( ()=>{
        infts_data.refetch().catch((e)=>{})
        if (infts_data.data) {
            //console.log('inftsingles',infts_data.data.inftsingles)
            setData({...data,list: infts_data.data.inftsingles})
        } else {
            setData({...data,list: []})
        }
    },[infts_data,getStore.account,getStore.chainId,getStore.popupStatus,getStore.popupTransferNft])
    useEffect( ()=>{
        if (!data.search) {
            setSearch(data.search)
        }
    },[data.search])
    return (
        <>
            <div className='content token_content w'>
                <div className={`search fz0`}>
                    <div className={`search_input dib fz0`}>
                        <button className={'button2 dib fz0 mr10'}>
                            <SearchOutlined className={'dib'} />
                            <input className={'dib '} onChange={(e)=>{setData({...data,search: e.target.value})}} placeholder={t('h_item91')} value={data.search} type={'text'} />
                        </button>
                        <button className={'button1 dib'} onClick={()=>{onSearch()}}>{t('h_item92')}</button>
                    </div>
                    <div className={`search_button dib fz0`} >
                        <button className={'button1 dib'} onClick={()=>{history.push('/nfts/add')}}>{t('h_item76')}</button>
                    </div>
                </div>
                <div className={'tablist fz0'}>
                    <ul>
                        <li className={` ${pathname == '/nfts' ? 'active' : ''} `} onClick={()=>{history.push('/nfts')}}>{t('h_item142')}</li>
                        <li className={` ${pathname == '/nfts/hold' ? 'active' : ''} `} onClick={()=>{history.push('/nfts/hold')}}>{t('h_item143')}</li>
                    </ul>
                </div>
                <div className={'hold_list'}>
                    <div className={'row'}>
                        <ul >
                        {
                            data.list.map((item,index)=>{
                                return (
                                        <li key={index}>
                                            <div className={'padd'}>
                                                <div className={'img'}>
                                                    <Image
                                                        preview={false}
                                                        src={item.tokenImg_ ? configAll.ipfsHost + item.tokenImg_ : ''}
                                                        fallback={require('../../assets/images/img_example.png')}
                                                    />
                                                    <div className={'but1'}>
                                                        <span>#{item.NFTId_}</span>
                                                    </div>
                                                    <div className={'but2'}>
                                                        <span>{getStore.chainName.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <div className={'info fz0'}>
                                                    <div className={'name dib'}>
                                                        <h3>{substringStr(item.symbol_,10,1)}</h3>
                                                        <p>{substringStr(item.name_,10,1)}</p>
                                                    </div>
                                                    <div className={'button dib fz0'}>
                                                        <button className={'color_green dib'} onClick={()=>{setStore('popupTransferNft',true);setStore('popupInfo',item)}}>
                                                            <span className={'span1'}>{t('h_item154')}</span><CaretRightOutlined />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                )
                            })
                        }
                            {data.list.length>0 ? '' : <div className={'no_data'}>{t('h_item29')}</div>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hold;
