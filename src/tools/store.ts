//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from 'react-redux';
import { updateSetStore } from "../state/application/actions";
import { useGetStore } from "../state/application/hooks";
import { stateStore } from "../state/application/reducer";

const useStore = () => {
  const dispatch = useDispatch()
  const getStore = useGetStore()
  const setStore = useCallback((key,value)=>{
    dispatch(updateSetStore({key: key,value: value}))
  })
  return {getStore,setStore, stateStore}
}
export default useStore
