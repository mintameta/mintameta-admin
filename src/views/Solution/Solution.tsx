//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BigNumberStr } from "../../tools/index";
import {useHistory, useLocation} from "react-router-dom";
import {
    FormOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import useStore from "../../tools/store";
import {fetchGet} from "../../tools/https";
import Scheme from "../Admin/components/Scheme";
import Schemeawait from "../Admin/components/Schemeawait";

const Solution: React.FC = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const {pathname} = useLocation()
    const { getStore,setStore } = useStore()
    const defData = {}
    const [data,setData] = useState(defData)

    useEffect( ()=>{

    },[getStore.account,getStore.chainId])

  return (
    <>
        <div className='content admin_content w'>
            <Scheme title={t('h_item108')} />
            <Schemeawait title={t('h_item109')} />
        </div>
    </>
  );
};

export default Solution;
