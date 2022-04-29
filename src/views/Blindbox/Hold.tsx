//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {BigNumberStr, substringStr} from "../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
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
import * as metaMaskTools from "../../tools/chain";
import {useSetOpenBox,useApprove721} from "../../tools/chain";
import Toast from "light-toast";
import useConfigCommon from "../../tools/configCommon";
import Copy from "../../components/Copy";

const Hold: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const [search,setSearch] = useState('')
    const where = search ? search : ''
    const infts_data = useQuery(inftsinglesQuery({where: search,owner_: getStore.account[0] ?? '0x',isBox_: true}) )
    const defData = {
        search: '',
        list: [],
    }
    const [data,setData] = useState(defData)


    const onSearch = useCallback(()=>{
        if (!data.search) {
            Toast.fail(t('h_item11'))
            return
        }
        setSearch(data.search)
    })
    const {setOpenBox} = useSetOpenBox()
    const { approve721 } = useApprove721()
    const setOpenBoxFun = useCallback(async (NFTAddress,NFTId_)=>{
        if (!NFTAddress) {
            Toast.fail(t('h_item49'))
            return
        }
        if (NFTId_<0) {
            Toast.fail(t('h_item67'))
            return
        }
        // //console.log(111)
        let allowance721 = await metaMaskTools.getAllowanceERC721(NFTAddress,configAll.BoxNFTAddr,getStore.account[0])
        //console.log('allowance721',allowance721)
        if (!allowance721) {
            approve721(NFTAddress,configAll.BoxNFTAddr).then((res)=>{
                setTimeout(()=>{
                    setOpenBox(NFTAddress,NFTId_)
                },500)
            })
            return
        }
        // //console.log(222)
        setOpenBox(NFTAddress,NFTId_)
    })
    useEffect( ()=>{
        infts_data.refetch().catch((e)=>{})
        if (infts_data.data) {
            //console.log('inftsingles',infts_data.data.inftsingles)
            setData({...data,list: infts_data.data.inftsingles})
        } else {
            setData({...data,list: []})
        }
    },[infts_data,getStore.account,getStore.chainId,getStore.popupStatus])
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
                        <button className={'button1 dib'} onClick={()=>{history.push('/blindbox/add')}}>{t('h_item77')}</button>
                    </div>
                </div>
                <div className={'tablist fz0'}>
                    <ul>
                        <li className={` ${pathname == '/blindbox' ? 'active' : ''} `} onClick={()=>{history.push('/blindbox')}}>{t('h_item142')}</li>
                        <li className={` ${pathname == '/blindbox/hold' ? 'active' : ''} `} onClick={()=>{history.push('/blindbox/hold')}}>{t('h_item143')}</li>
                    </ul>
                </div>
                <div className={'list blindbox_hold_list'}>
                    <div className={'row'}>
                        {
                            data.list.map((item,index)=>{
                                return (
                                    <ul key={index}>
                                        <li className={'li1 li_id'}><span>#{item.NFTId_}</span></li>
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
                                        <li className={'li3 li_type2'}>
                                            <p className={'fz0'}><span className={'span1 dib'}>{t('h_item94')}</span><span className={'span2 dib'}>{getStore.chainName.toUpperCase()}</span></p>
                                            <p className={'fz0'}><span className={'span1 dib'}>{t('h_item152')}</span><span className={'span2 dib'}>{substringStr(item.contractAddress_)}  <Copy toCopy={item.contractAddress_}/></span><span className={'color_green'}>{item.status=='1' ? `[${t('h_item149')}]` : ''}</span></p>
                                        </li>
                                        <li className={'li5 li_edit fz0'}>
                                            <button className={'b_edit dib fz0'} onClick={()=>{setOpenBoxFun(item.contractAddress_,item.NFTId_)}}>
                                                <img className={'dib mr5'} src={require('../../assets/images/icon_open.png')} width={13} height={13} />
                                                <span className={'dib'}>{t('h_item164')}</span>
                                            </button>
                                            <button className={'b_edit dib fz0'} onClick={()=>{setStore('popupTransferNft',true);setStore('popupInfo',item)}}>
                                                <img className={'dib mr5'} src={require('../../assets/images/icon_avert.png')} width={13} height={13} />
                                                <span className={'dib'}>{t('h_item154')}</span>
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

export default Hold;
