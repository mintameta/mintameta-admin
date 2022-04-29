//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr } from "../../tools/index";
import { useLocation,useHistory } from "react-router-dom";
import Toast from "light-toast";
import useStore from "../../tools/store";
import * as metaMaskTools from "../../tools/chain";
import Scheme from "./components/Scheme"
import useConfigCommon from "../../tools/configCommon";
import {useQuery} from "@apollo/react-hooks";
import {dataRecordsQuery} from "../../tools/query";

const Admin: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory()
    const { pathname } = useLocation();
    const { getStore,setStore } = useStore()
    const configAll = useConfigCommon()
    const defData = {
        list: [
            {
                boxLength: 0,
                id: "",
                nftLength: 0,
                nftSingleLength: 0,
            }
        ],
        func: [
            {name: 'h_item75',imgUrl: require('../../assets/images/icon_function1.png'),path: '0'},
            {name: 'h_item76',imgUrl: require('../../assets/images/icon_function2.png'),path: '/nfts/add'},
            {name: 'h_item77',imgUrl: require('../../assets/images/icon_function3.png'),path: '/blindbox/add'},
            {name: 'h_item78',imgUrl: require('../../assets/images/icon_function4.png'),path: '0'},
            {name: 'h_item8',imgUrl: require('../../assets/images/icon_function5.png'),path: '0'},
            {name: 'h_item7',imgUrl: require('../../assets/images/icon_function6.png'),path: '0'},
            {name: 'h_item79',imgUrl: require('../../assets/images/icon_function7.png'),path: '0'},
        ]
    }
    const [data,setData] = useState(defData)
    const infts_data = useQuery(dataRecordsQuery({owner_: getStore.account[0] ?? '0x'}))
    useEffect(()=>{
        infts_data.refetch().catch((e)=>{})
        if (infts_data.data) {
            // //console.log('dataRecords_data',infts_data.data.dataRecords)
            setData({...data,list: infts_data.data.dataRecords})
        } else {
            setData({...data,list: []})
        }
    },[infts_data,getStore.account,getStore.chainId])
  return (
      <>
        <div className='content admin_content w'>
           <div className={`item banner`}>
                <ul>
                    <li >
                        <img className={`dib`} src={require('../../assets/images/icon_data1.png')}/>
                        <div className={`info dib`}>
                            <h3>{t('h_item70')}</h3>
                            <p>0</p>
                        </div>
                    </li>
                    <li >
                        <img className={`dib`} src={require('../../assets/images/icon_data2.png')}/>
                        <div className={`info dib`}>
                            <h3>{t('h_item71')}</h3>
                            <p>0</p>
                        </div>
                    </li>
                    <li >
                        <img className={`dib`} src={require('../../assets/images/icon_data3.png')}/>
                        <div className={`info dib`}>
                            <h3>NFT</h3>
                            <p>{data.list.length>0 ? data.list[0].nftLength : 0}</p>
                        </div>
                    </li>
                    <li >
                        <img className={`dib`} src={require('../../assets/images/icon_data4.png')}/>
                        <div className={`info dib`}>
                            <h3>{t('h_item72')}</h3>
                            <p>{data.list.length>0  ? data.list[0].boxLength : 0}</p>
                        </div>
                    </li>
                </ul>
           </div>
            <div className={`item func`}>
                <div className={`title`}><h3>{t('h_item74')}</h3></div>
                <ul>
                    {
                        data.func.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <a onClick={()=>{
                                        if (item.path == '0') {
                                            Toast.info(t('h_item14'))
                                            return
                                        }
                                        history.push(item.path)
                                    }}>
                                        <div className={`img`}>
                                            <img className={`dib`} src={item.imgUrl}/>
                                        </div>
                                        <h3>{t(item.name)}</h3>
                                    </a>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
            <Scheme title={t('h_item10')} />
        </div>
      </>
  );
};

export default Admin;
