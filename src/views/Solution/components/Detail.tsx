//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr,formatDate,getFormatTime } from "../../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
import Toast from "light-toast";
import useStore from "../../../tools/store";
import {
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import * as metaMaskTools from "../../../tools/chain"

const Detail: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {
        timeLimit: 0,
        getComboList: []
    }
    const [data,setData] = useState(defData)

    useEffect(()=>{
        //
        // metaMaskTools.getComboList().then((res)=>{
        //     // //console.log('getComboList',res)
        //     setData({...data,getComboList: res})
        // })
    },[getStore.popupAdminDexRenew])
  return (
    <>
        <div className='content solution_content w'>
            <div className={'backup cp fz0'} onClick={()=>{history.push('/solution')}}>
                <img className={'dib mr10'} src={require('../../../assets/images/icon_back.png')} />
                <span className={'fwb'}>{t('h_item128')}</span>
            </div>
            {
                pathname == '/solution/detail/dex' ?
                    <div className={'solution_detail'}>
                        <div className={'open bg_open1'}>
                            <div className={'dl dib'}>
                                <img className={`dib mr10`} src={require('../../../assets/images/icon_default_60.png')} />
                                <div className={'detail_info dib'}>
                                    <h3>{t('h_item80')}</h3>
                                    <p>Dex</p>
                                </div>
                            </div>
                            <div className={'dr dib tar'}>
                                <button className={'button_open'} onClick={()=>{Toast.fail(t('h_item158'))}}>
                                    <img className={`dib mr5`} width={13} height={13} src={require('../../../assets/images/icon_createaccount.png')} />
                                    <span>{t('h_item111')}</span>
                                </button>
                            </div>
                        </div>
                        <div className={'info'}>
                            <h4>{t('h_item81')}</h4>
                            <ul>
                                <li>
                                    <h3>{t('h_item129')}</h3>
                                    <div className={'desc'}>
                                        <p>· {t('h_item130')}</p>
                                        <p>· {t('h_item131')}</p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item132')}</h3>
                                    <div className={'desc'}>
                                        <p>· {t('h_item133')}</p>
                                        <p>· {t('h_item134')}</p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item135')}</h3>
                                    <div className={'desc'}>
                                        <p>· <a href='javascript:;' className={'color_green line'}>Pancakeswap</a> </p>
                                        <p>· <a href='javascript:;' className={'color_green line'}>Babyswap</a></p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item136')}</h3>
                                    <div className={'desc'}>
                                        <p>· 3{t('h_item38')}：<span className={'color_green'}>150BNB</span></p>
                                        <p>· 6{t('h_item38')}：<span className={'color_green'}>260BNB</span></p>
                                        <p>· 12{t('h_item38')}：<span className={'color_green'}>500BNB</span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> : ''
            }
            {
                pathname == '/solution/detail/nft' ?
                    <div className={'solution_detail'}>
                        <div className={'open bg_open2'}>
                            <div className={'dl dib'}>
                                <img className={`dib mr10`} src={require('../../../assets/images/icon_default_60.png')} />
                                <div className={'dib'}>
                                    <h3>{t('h_item83')}</h3>
                                    <p>NFT Market</p>
                                </div>
                            </div>
                            <div className={'dr dib tar'}>
                                <button className={'button_open'} onClick={()=>{Toast.fail(t('h_item158'))}} >
                                    <img className={`dib mr5`} width={13} height={13} src={require('../../../assets/images/icon_createaccount.png')} />
                                    <span>{t('h_item111')}</span>
                                </button>
                            </div>
                        </div>
                        <div className={'info'}>
                            <h4>{t('h_item84')}</h4>
                            <ul>
                                <li>
                                    <h3>{t('h_item129')}</h3>
                                    <div className={'desc'}>
                                        <p>· {t('h_item137')}</p>
                                        <p>· {t('h_item138')}</p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item132')}</h3>
                                    <div className={'desc'}>
                                        <p>· {t('h_item133')}</p>
                                        <p>· {t('h_item134')}</p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item135')}</h3>
                                    <div className={'desc'}>
                                        <p>· <a href='javascript:;' className={'color_green line'}>Opensea</a> </p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item136')}</h3>
                                    <div className={'desc'}>
                                        <p>· 3{t('h_item38')}：<span className={'color_green'}>150BNB</span></p>
                                        <p>· 6{t('h_item38')}：<span className={'color_green'}>260BNB</span></p>
                                        <p>· 12{t('h_item38')}：<span className={'color_green'}>500BNB</span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> : ''
            }
            {
                pathname == '/solution/detail/farm' ?
                    <div className={'solution_detail'}>
                        <div className={'open bg_open3'}>
                            <div className={'dl dib'}>
                                <img className={`dib mr10`} src={require('../../../assets/images/icon_default_60.png')} />
                                <div className={'dib'}>
                                    <h3>{t('h_item85')}</h3>
                                    <p>Farm</p>
                                </div>
                            </div>
                            <div className={'dr dib tar'}>
                                <button className={'button_open'} onClick={()=>{Toast.fail(t('h_item158'))}}>
                                    <img className={`dib mr5`} width={13} height={13} src={require('../../../assets/images/icon_createaccount.png')} />
                                    <span>{t('h_item111')}</span>
                                </button>
                            </div>
                        </div>
                        <div className={'info'}>
                            <h4>{t('h_item86')}</h4>
                            <ul>
                                <li>
                                    <h3>{t('h_item129')}</h3>
                                    <div className={'desc'}>
                                        <p>· {t('h_item139')}</p>
                                        <p>· {t('h_item140')}</p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item132')}</h3>
                                    <div className={'desc'}>
                                        <p>· {t('h_item141')}</p>
                                        <p>· {t('h_item134')}</p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item135')}</h3>
                                    <div className={'desc'}>
                                        <p>· <a href='javascript:;' className={'color_green line'}>Sushiswap</a> </p>
                                    </div>
                                </li>
                                <li>
                                    <h3>{t('h_item136')}</h3>
                                    <div className={'desc'}>
                                        <p>· 3{t('h_item38')}：<span className={'color_green'}>150BNB</span></p>
                                        <p>· 6{t('h_item38')}：<span className={'color_green'}>260BNB</span></p>
                                        <p>· 12{t('h_item38')}：<span className={'color_green'}>500BNB</span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> : ''
            }

        </div>
    </>
  );
};

export default Detail;
