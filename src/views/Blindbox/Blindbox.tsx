//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {BigNumberStr, BigNumberSub, substringStr} from "../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
import {
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { Image } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import {iboxesQuery} from '../../tools/query';
import useStore from "../../tools/store";
import { useSetNft } from '../../../tools/chain'
import useConfigCommon from "../../tools/configCommon";
import Toast from "light-toast";
import Copy from "../../components/Copy";

const Blindbox: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const [search,setSearch] = useState('')
    const where = search ? search : ''
    const infts_data = useQuery(iboxesQuery({where: search,owner_: getStore.account[0] ?? '0x'}) )
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
        // setSearch(search)
        infts_data.refetch().catch((e)=>{})
        if (infts_data.data) {
            //console.log('infts_data',infts_data.data.iboxes)
            setData({...data,list: infts_data.data.iboxes})
        } else {
            setData({...data,list: []})
        }
    },[infts_data,getStore.account,getStore.chainId,getStore.popupBoxCoin])
    useEffect( ()=>{
        if (!data.search) {
            setSearch(data.search)
        }
    },[data.search])
  return (
    <>
        <div className='content nfts_content w'>
            <div className={`search fz0`}>
                <div className={`search_input dib fz0`}>
                    <button className={'button2 dib fz0 mr10'}>
                        <SearchOutlined className={'dib'} />
                        <input className={'dib '} onChange={(e)=>{setData({...data,search: e.target.value})}} placeholder={t('h_item91')} value={data.search} type={'text'} />
                    </button>
                    <button className={'button1 dib'} onClick={()=>{onSearch()}}>{t('h_item92')}</button>
                </div>
                <div className={`search_button dib fz0`} >
                    <button className={'button1 dib'} onClick={()=>{history.push('/blindbox/add')}}>{t('h_item77')}</button>
                </div>
            </div>
            <div className={'tablist fz0'}>
                <ul>
                    <li className={` ${pathname == '/blindbox' ? 'active' : ''} `} onClick={()=>{history.push('/blindbox')}}>{t('h_item142')}</li>
                    <li className={` ${pathname == '/blindbox/hold' ? 'active' : ''} `} onClick={()=>{history.push('/blindbox/hold')}}>{t('h_item143')}</li>
                </ul>
            </div>
            <div className={'list blindbox_list'}>
                <div className={'row'}>
                    {
                        data.list.map((item,index)=>{
                            return (
                                <ul key={index}>
                                    <li className={'li1 li_id'}><span>#{item.serialNumber_*1+1}</span></li>
                                    <li className={'li2 li_img fz0'}>
                                        <div className={'dib '}>
                                            <Image
                                                preview={false}
                                                src={item.tokenImg_ ? configAll.ipfsHost + item.tokenImg_ : ''}
                                                fallback={require('../../assets/images/eth.png')}
                                            />
                                        </div>
                                        <div className={'dib'}>
                                            <h3>{substringStr(item.symbol_,10,1)}</h3>
                                            <p>{substringStr(item.name_,10,1)}</p>
                                        </div>

                                    </li>
                                    <li className={'li3 li_type'}>
                                        <p className={'fz0'}><span className={'span1 dib'}>{t('h_item94')}</span><span className={'span2 dib'}>{getStore.chainName.toUpperCase()}</span></p>
                                        <p className={'fz0'}><span className={'span1 dib'}>{t('h_item144')}</span><span className={'span2 dib'}>{item.nftType_ == '1' ? t('h_item146') : t('h_item145')}</span></p>
                                        <p className={'fz0'}><span className={'span1 dib'}>{t('h_item147')}</span><span className={'span2 dib'}>{item.issueNumber_}</span></p>
                                    </li>
                                    <li className={'li4 li_type2'}>
                                        <p className={'fz0'}><span className={'span1 dib'}>{t('h_item148')}</span><span className={'span2 dib'}>{BigNumberSub(item.issueNumber_, item.mintedNum_)}</span></p>
                                        <p className={'fz0'}><span className={'span1 dib'}>{t('h_item152')}</span><span className={'span2 dib'}>{substringStr(item.contractAddress_)}  <Copy toCopy={item.contractAddress_}/></span><span className={'color_green'}>{item.status=='1' ? `[${t('h_item149')}]` : ''}</span></p>
                                    </li>
                                    <li className={'li5 li_edit fz0'}>
                                        {
                                            item.nftType_ == '0' ?
                                                <button className={'b_edit dib'} onClick={()=>{setStore('popupBoxCoin',true);setStore('popupInfo',{...item,maxMintNum_: item.issueNumber_})} }>
                                                    <img className={'dib mr5'} src={require('../../assets/images/icon_create.png')} width={13} height={13} />
                                                    {t('h_item150')}
                                                </button>
                                                : ''
                                        }

                                        <button className={'b_edit dib'} onClick={()=>{setStore('popupBoxView',true);setStore('popupInfo',item)} }>
                                            <img className={'dib mr5'} src={require('../../assets/images/icon_look.png')} width={13} height={13} />
                                            {t('h_item59')}
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

export default Blindbox;
