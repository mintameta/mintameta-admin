import React, { useCallback, useEffect, useMemo, useState } from "react";
import useStore from './store';
import Toast from 'light-toast';
import config from "./config";
import configBsc from "./configBsc";
import configEth from "./configEth";
const useConfigCommon = ()=>{
    const {getStore,setStore} = useStore()
    const [configAll,setConfig] = useState({...config,graphAddr: ''})
    useEffect(()=>{
        if (getStore.chainId == 56 || getStore.chainId == 97) {
            setConfig(configBsc)
        }
        // else if (getStore.chainId == 1 || getStore.chainId == 4) {
        //     setConfig(configEth)
        // }
    },[getStore.account,getStore.chainId])
    // //console.log('configAll',configAll)
    return configAll
}
export default useConfigCommon
