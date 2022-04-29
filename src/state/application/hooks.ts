//@ts-nocheck
import { useCallback, useMemo } from "react";
import {
  toggleStatusModal,
  toggleStatus,
  updateTransactionHash,
  updateSetStore,
} from "./actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../index";
import { useWallet } from "use-wallet";
import {initialState} from "./reducer";

export function useGetStore () {
  return useSelector(
      (state: AppState) => state.application
  );
}
export function useSetStore(key: string,value: any){
  // const dispatch = useDispatch();
  // return useCallback(
  //     (key,value) => dispatch(
  //         updateSetStore({
  //           key: key,
  //           value: value
  //         })
  //         ),
  //     [dispatch]
  // );

}

export function useBlockNumber(): number | undefined {
  const { chainId } = useWallet();
  return useSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}

export function useWalletModalOpen(): boolean {
  return useSelector((state: AppState) => state.application.walletModalOpen);
}

export function useStatusModalToggle() {
  const dispatch = useDispatch();
  return useCallback(
    (statusModalOpen) => dispatch(toggleStatusModal({ statusModalOpen })),
    [dispatch]
  );
}

export function useWaitModal() {
  return useSelector((state) => {
    return state.application.statusModalOpen;
  });
}

export function useUpdateTransactionHash() {
  const dispatch = useDispatch();
  return useCallback(
    (transactionHash) => dispatch(updateTransactionHash({ transactionHash })),
    [dispatch]
  );
}

export function useTransactionHash() {
  return useSelector((state) => {
    return state.application.transactionHash;
  });
}
export function useStatusToggle() {
  const dispatch = useDispatch();
  return useCallback((status) => dispatch(toggleStatus({ status })), [
    dispatch,
  ]);
}
export function useStatus() {
  return useSelector((state) => {
    return state.application.status;
  });
}
