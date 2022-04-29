import React, {useState, useCallback, useEffect} from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation,useHistory } from "react-router-dom";
import Lang from "./Lang";
import Toast from "light-toast";
import useStore from "../../../tools/store";

const Left: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory()
    const { pathname } = useLocation();
    const {getStore,setStore} = useStore()
    const [data,setData] = useState({
        active: 0,
        nav: [
            {name: 'h_item1',icon1: require("../../../assets/images/icon_menu1.png"),icon2: "",path: '/admin',pathOpen: true},
            {name: 'h_item4',icon1: require("../../../assets/images/icon_menu4.png"),icon2: "",path: '/nfts',pathOpen: true},
            {name: 'h_item5',icon1: require("../../../assets/images/icon_menu5.png"),icon2: "",path: '/blindbox',pathOpen: true},
            {name: 'h_item6',icon1: require("../../../assets/images/icon_menu6.png"),icon2: "",path: '0',pathOpen: false},
            {name: 'h_item7',icon1: require("../../../assets/images/icon_menu7.png"),icon2: "",path: '/tokenvesting',pathOpen: false},
            {name: 'h_item8',icon1: require("../../../assets/images/icon_menu8.png"),icon2: "",path: '/tokenlock',pathOpen: false},
            {name: 'h_item9',icon1: require("../../../assets/images/icon_menu9.png"),icon2: "",path: '0',pathOpen: false},
            {name: 'h_item10',icon1: require("../../../assets/images/icon_menu10.png"),icon2: "",path: '/solution',pathOpen: true},
        ]
    })
    useEffect(()=>{
        data.nav.map((item, index)=>{
            // //console.log('pathname.indexOf(item.path)',pathname.indexOf(item.path))
            if (pathname.indexOf(item.path) != -1) {
                setData({...data, active: index})
                return
            }
        })
    },[pathname])
  return (
    <>
        <div className="logo" onClick={()=>{history.push('/admin')}}>
            {
                !getStore.hideStatus ?
                    <img src={require('../../../assets/images/logo.png')} />
                    :
                    <img src={require('../../../assets/images/logo_small.png')} />
            }
        </div>
        <div className="nav">
            {

                    <ul>
                        {
                            data.nav.map((item,index)=>{
                                return (
                                    <li className={`fz0 li${index} ${data.active == index ? 'active' : ''}`} key={index}
                                        onClick={()=>{
                                            if (!item.pathOpen) {
                                                Toast.info(t('h_item14'))
                                                return
                                            }
                                            setStore('leftMobileShow',false)
                                            history.push(item.path)
                                            setData({...data,active: index})}
                                        }
                                    >
                                        {
                                            !getStore.hideStatus ?
                                                <div className='fz0 padd' >
                                                    <img className='dib' src={item.icon1} /><span className='dib'>{ t(item.name) }</span>
                                                </div>
                                                :
                                                <div className='fz0 padd' >
                                                    <img className='dib' src={item.icon1} />
                                                </div>
                                        }

                                    </li>
                                )
                            })
                        }

                    </ul>
            }

        </div>
        {/*<Lang />*/}
    </>
  );
};

export default Left;
