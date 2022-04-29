//@ts-nocheck
import React, {useCallback, useState} from "react";
import Toast from "light-toast";
import { useTranslation } from "react-i18next";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import configAll from "../../tools/config";
import useStore from "../../tools/store";
const ipfsAPI = require('ipfs-api');
const ipfs =  ipfsAPI(configAll.ipfsAddr);

export default function UploadImg({setUploadImg,imageUrl,children}) {
    const { t } = useTranslation();
    const {getStore,setStore} = useStore()
    const [data, setData] = useState({
        loading: false,
    });

    const getBase64 = useCallback((img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    })
    const beforeUpload = useCallback((file)=>{
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    })
    //上传功能
    const uploadOfIpfsAPI = useCallback ((info:any) => {
        //console.log('files',info);
        setData({...data,loading: true});
        let file = info.file;
        if (file == null) {
            return;
        }
        const tmpcnt = file.name.lastIndexOf(".");
        const exname = file.name.substring(tmpcnt + 1).toLowerCase();
        const fileName = "." + exname;
        //console.log("fileName", fileName);

        let reader = new FileReader();
        reader.onloadend = (e) => {
            new Promise(function (resolve, reject) {
                const buffer = Buffer.from(reader.result);
                ipfs.add(buffer)
                    .then((response) => {
                        setData({...data,loading: false});
                        //console.log('response',response);
                        const url =  "/ipfs/" + response[0].hash + "?filename=" +response[0].hash + fileName
                        setUploadImg(url)
                        // setStore('uploadImg',url)
                        //console.log('url',url)
                        resolve(url);
                    })
                    .catch((err) => {
                        setData({...data,loading: false});
                        //console.log('err',err);
                        reject(err);
                    });
            });
        };
        reader.readAsArrayBuffer(file);
    })
    const uploadButton = (
        <div>
            {data.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
  return (
    <>
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={uploadOfIpfsAPI}
            // onChange={uploadOfIpfsAPI}
        >
            {
                children ?
                    children
                    :
                    imageUrl ? <img className={'up_img'} src={configAll.ipfsHost+imageUrl} style={{objectFit: "cover"}} alt="avatar" width={'126'} height={'126'} /> : uploadButton
            }

        </Upload>
    </>
  );
}
