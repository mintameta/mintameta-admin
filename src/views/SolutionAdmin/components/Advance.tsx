//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr } from "../../tools/index";
import { useHistory } from "react-router-dom";
import {Radio} from 'antd';
import UploadImg from '../../../components/UploadImg'

const Advance: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const [data,setData] = useState({
        search: '',
        id: null,
        type: 1,
        imgUrl: null,
        title: '',
        fulltitle: '',
        chain: 1,
        total: '',
        dec: 18,
        user: '',
        contract: '',
        projectInfo: '',
        status: 1,
        fee: 0.15
    })
    // //console.log('history',history)
  return (
    <>
        <div className='content token_content w '>
            <div className={'project_add fz0'}>
                <div className={`item item1 dib `} >
                    <div className={'padd fz0 cp'} onClick={()=>{history.push('/token')}}>
                        <img className={'dib mr10 cp'} src={require('../../../assets/images/icon_back.png')}  />
                        <h3 className={'dib'}>{history.location.pathname == '/token/edit' ? '编辑代币' : '发行代币'}</h3>
                    </div>
                </div>
                <div className={`item item2 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h3>代币Logo</h3>
                            {/*<div className={'img'}>*/}
                            {/*    <img className={'img_upload dib'} src={require('../../../assets/images/img_upload.png')}/>*/}
                            {/*</div>*/}
                            <UploadImg imgUrl={null}/>
                        </div>
                        <div className={'row'}>
                            <div className={'tablist_add fz0'}>
                                <ul>
                                    <li className={` ${history.location.pathname == '/token/add' ? 'active' : ''} `} onClick={()=>{history.push('/token/add')}}>基础型</li>
                                    <li className={` ${history.location.pathname == '/token/add/advance' ? 'active' : ''} `} onClick={()=>{history.push('/token/add/advance')}}>进阶型</li>
                                </ul>
                            </div>

                        </div>
                        <div className={'row'}>
                            <h3>代币名称 <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”Ethereum”'} value={data.fulltitle} onChange={(e)=>{setData({...data,fulltitle: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>代币符号 <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”ETH”'} value={data.title} onChange={(e)=>{setData({...data,title: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>发行总量 <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”100000”'} value={data.total} onChange={(e)=>{setData({...data,total: e.target.value})}} />
                        </div>
                    </div>
                </div>
                <div className={`item item3 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h3>发行链 <span className={'color_green'}>*</span></h3>
                            <div className={'select_def'}>
                                <select defaultValue={data.chain} className={'select_def1'} onChange={(e)=>{setData({...data,chain: e.target.value})}}>
                                    <option value="1">BSC</option>
                                    <option value="2">HECO</option>
                                </select>
                            </div>
                        </div>
                        <div className={'row'}>
                            <h3>代币接收地址 <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} value={data.user} onChange={(e)=>{setData({...data,user: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>代币介绍</h3>
                            <textarea className={'input_def'} value={data.projectInfo} rows={'4'} onChange={(e)=>{setData({...data,projectInfo: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>代币合约是否开源</h3>
                            <Radio.Group  value={data.status} onChange={(e)=>{setData({...data,status: e.target.value})}}>
                                <Radio value={1}>否</Radio>
                                <Radio value={2}>是</Radio>
                            </Radio.Group>
                        </div>
                        <div className={'row tc'}>
                            <p style={{textAlign: 'left',marginTop: 30, marginBottom: 10}}><span>服务费：</span><span className={'color_green'}>{data.fee} BNB</span></p>
                            <button className={'button_def'} style={{maxWidth: "380px",width: "100%"}}>确认</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Advance;
