//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr } from "../../tools/index";
import { useHistory } from "react-router-dom";
import {Radio} from 'antd';
import UploadImg from '../../../components/UploadImg'
import {
    PlusOutlined,
} from '@ant-design/icons';
import Toast from "light-toast";

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
        fee: 0.15,
        use: 1,
        attrName: '',
        primeAttr: [
            {name: '',total: '',imgUrl: null}
        ],
        primeNumMax: 5,
        deputyAttr: [
            {name: '',scope: ''}
        ],
        deputyNumMax: 9,
    })
    const addPrimeAttr = useCallback(()=>{
        if (data.primeAttr.length>=data.primeNumMax) {
            Toast.fail('不能添加属性了')
            return
        }
        let arr = data.primeAttr
        const obj = {name: '',total: '',imgUrl: null}
        arr.push(obj)
        setData({...data,primeAttr: arr})
    })
    const delPrimeAttr = useCallback((index)=>{
        if (data.primeAttr.length<=1) {
            Toast.fail('不能删除属性了')
            return
        }
        let arr = data.primeAttr
        arr.splice(index,1)
        setData({...data,primeAttr: arr})
    })
    const addDeputyAttr = useCallback(()=>{
        let arr = data.deputyAttr
        if (arr.length>=data.deputyNumMax) {
            Toast.fail('不能添加属性了')
            return
        }
        const obj = {name: '',scope: ''}
        arr.push(obj)
        setData({...data,deputyAttr: arr})
    })
    const delDeputyAttr = useCallback((index)=>{
        let arr = data.deputyAttr
        if (arr.length<=1) {
            Toast.fail('不能删除属性了')
            return
        }
        arr.splice(index,1)
        setData({...data,deputyAttr: arr})
    })
    const arrUpdate = useCallback((arrKey,index,metaKey,newValue)=>{
        let newArr = data[arrKey]
            newArr[index][metaKey] = newValue
        setData({...data,[arrKey]: newArr})
    })
    // //console.log('history',history)
  return (
    <>
        <div className='content nfts_content w '>
            <div className={'project_add fz0'}>
                <div className={`item item1 dib `} >
                    <div className={'padd fz0 cp'} onClick={()=>{history.push('/nfts')}}>
                        <img className={'dib mr10 cp'} src={require('../../../assets/images/icon_back.png')}  />
                        <h3 className={'dib'}>{history.location.pathname == '/nfts/edit' ? '编辑NFT' : '发行NFT'}</h3>
                    </div>
                </div>
                <div className={`item item2 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h3>NFT类型</h3>
                            <div className={'tablist_add fz0'}>
                                <ul>
                                    <li className={` ${history.location.pathname == '/nfts/add' ? 'active' : ''} `} onClick={()=>{history.push('/nfts/add')}}>基础型</li>
                                    <li className={` ${history.location.pathname == '/nfts/add/advance' ? 'active' : ''} `} onClick={()=>{history.push('/nfts/add/advance')}}>进阶型</li>
                                </ul>
                            </div>

                        </div>
                        {/*<div className={'row'}>*/}
                        {/*    <h3>NFT图片</h3>*/}
                        {/*    /!*<div className={'img'}>*!/*/}
                        {/*    /!*    <img className={'img_upload dib'} src={require('../../../assets/images/img_upload.png')}/>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    <UploadImg imgUrl={null}/>*/}
                        {/*</div>*/}
                        {/*<div className={'row'}>*/}
                        {/*    <h3>发行总量 <span className={'color_green'}>*</span></h3>*/}
                        {/*    <input className={'input_def'} type={'text'} placeholder={'e.g.”100000” 不填则表示无限'} value={data.total} onChange={(e)=>{setData({...data,total: e.target.value})}} />*/}
                        {/*</div>*/}
                        <div className={'row'}>
                            <h3>NFT名称 <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”CryptoKitties”'} value={data.fulltitle} onChange={(e)=>{setData({...data,fulltitle: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>NFT符号 <span className={'color_green'}>*</span></h3>
                            <input className={'input_def'} type={'text'} placeholder={'e.g.”CK”'} value={data.title} onChange={(e)=>{setData({...data,title: e.target.value})}} />
                        </div>
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
                            <h3>用途</h3>
                            <Radio.Group  value={data.use} onChange={(e)=>{setData({...data,use: e.target.value})}}>
                                <Radio value={1}>自用</Radio>
                                <Radio value={2}>盲盒</Radio>
                                <Radio value={3}>销售</Radio>
                            </Radio.Group>
                        </div>
                        <div className={'row'}>
                            <h3>NFT介绍</h3>
                            <textarea className={'input_def'} value={data.projectInfo} rows={'4'} onChange={(e)=>{setData({...data,projectInfo: e.target.value})}} />
                        </div>
                        <div className={'row'}>
                            <h3>NFT合约是否开源</h3>
                            <Radio.Group  value={data.status} onChange={(e)=>{setData({...data,status: e.target.value})}}>
                                <Radio value={1}>否</Radio>
                                <Radio value={2}>是</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                </div>
                <div className={`item item3 dib`}>
                    <div className={'padd'}>
                        <div className={'row'}>
                            <h2>主属性</h2>
                            <div className={'row'}>
                                <h3>属性名称 <span className={'color_green'}>*</span></h3>
                                <input className={'input_def'} type={'text'} placeholder={'e.g.”type”'} value={data.attrName} onChange={(e)=>{setData({...data,attrName: e.target.value})}} />
                            </div>
                            <div className={'row'}>
                                <div className={'attr'}>
                                    {
                                        data.primeAttr.map((item,index)=>{
                                            return (
                                                <div className={'attr_from'} key={index}>
                                                    <div className={'padd1'}>
                                                        <img className={'cp del'} width={25} height={25} onClick={()=>{delPrimeAttr(index)}} src={require('../../../assets/images/btn_clear.png')} />
                                                        <div className={'row'}>
                                                            <h3>属性值{index*1 + 1} <span className={'color_green'}>*</span></h3>
                                                            <input className={'input_def'} type={'text'} placeholder={'e.g.”sword” '} value={item.name} onChange={(e)=>{arrUpdate('primeAttr',index,'name',e.target.value)}} />
                                                        </div>
                                                        <div className={'row'}>
                                                            <h3>发行总量 <span className={'color_green'}>*</span></h3>
                                                            <input className={'input_def'} type={'text'} placeholder={'e.g.”10000” '} value={item.total} onChange={(e)=>{arrUpdate('primeAttr',index,'total',e.target.value)}} />
                                                        </div>
                                                        <div className={'row'}>
                                                            <h3>属性图片</h3>
                                                            {/*<div className={'img'}>*/}
                                                            {/*    <img className={'img_upload dib'} src={require('../../../assets/images/img_upload.png')}/>*/}
                                                            {/*</div>*/}
                                                            <UploadImg imgUrl={item.imgUrl}/>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className={'attr_but fz0'}>
                                        <button className={'dib button_def1 mr10 mb10'} onClick={()=>{addPrimeAttr()}}>+ 添加属性值</button>
                                        <span className={'dib mb10'}>还可添加 <span className={'color_green'}>{data.primeNumMax*1 - data.primeAttr.length}</span> 个属性值</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <h2>副属性</h2>
                            <div className={'row'}>
                                <div className={'attr'}>
                                    {
                                        data.deputyAttr.map((item,index)=>{
                                            return (
                                                <div className={'attr_from'} key={index}>
                                                    <div className={'padd1'}>
                                                        <img className={'cp del'} width={25} height={25} onClick={()=>{delDeputyAttr(index)}} src={require('../../../assets/images/btn_clear.png')} />
                                                        <div className={'row'}>
                                                            <h3>属性值名称{index*1 + 1} <span className={'color_green'}>*</span></h3>
                                                            <input className={'input_def'} type={'text'} placeholder={'e.g.”aggressivity” '} value={item.name} onChange={(e)=>{arrUpdate('deputyAttr',index,'name',e.target.value)}} />
                                                        </div>
                                                        <div className={'row'}>
                                                            <h3>属性值范围 <span className={'color_green'}>*</span></h3>
                                                            <input className={'input_def'} type={'text'} placeholder={'e.g.”10-200” '} value={item.scope} onChange={(e)=>{arrUpdate('deputyAttr',index,'scope',e.target.value)}} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className={'attr_but fz0'}>
                                        <button className={'dib button_def1 mr10 mb10'} onClick={()=>{addDeputyAttr()}}><span style={{fontSize: 12}}><PlusOutlined /></span>添加副属性</button>
                                        <span className={'dib mb10'}>还可添加 <span className={'color_green'}>{data.deputyNumMax*1 - data.deputyAttr.length}</span> 个属性值</span>
                                    </div>
                                    <div className={'attr_info'}>
                                        <p>*数字范围值属性格式“A-B”；</p>
                                        <p> *枚举属性值则多个罗列，并逗号隔开</p>
                                    </div>
                                </div>
                            </div>
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
