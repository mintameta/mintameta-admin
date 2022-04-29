//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useStore from './store';

const usePublicCall = (contract:any, methods:any, params:any = []) => {
  const { stateStore,getStore,setStore } = useStore()
  const [data,setData] = useState(123)
  const [fromObj,setFromObj] = useState({})
  if (getStore.account.length > 0) {
    setFromObj({from: getStore.account[0]})
  }
  // useCallback(async () => {
  //   const rs = await contract.methods[methods](...params).call(fromObj)
  //   setData(rs)
  // },[])

  return data
}
export default usePublicCall
