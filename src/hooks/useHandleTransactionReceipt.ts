//@ts-nocheck
import { useCallback } from "react";

import {
  useStatusModalToggle,
  useStatusToggle,
  useUpdateTransactionHash,
} from "./../state/application/hooks";

import useBasisCash from "./useBasisCash";
function useHandleTransactionReceipt() {
  const toggleWait = useStatusModalToggle();
  const updateTx = useUpdateTransactionHash();
  const toggleStatus = useStatusToggle();

  const basisCash = useBasisCash();
  return useCallback(
    async (func, arg = [], contextObj?: any) => {
      try {
        toggleStatus(1);
        toggleWait(true);
        const tx = await func.call(contextObj ? contextObj : basisCash, ...arg);
        console.log(
          "🚀 ~ file: useHandleTransactionReceipt.ts ~ line 23 ~ tx",
          tx
        );
        toggleStatus(2);
        if (tx?.wait) {
          const status = await tx.wait();
          toggleStatus(3);
          updateTx(status.transactionHash);
          return status;
        } else {
          if (tx.code === 4001) {
            toggleStatus(5);
            return "0";
          } else {
            toggleStatus(4);
            return "0";
          }
        }
      } catch (e) {
        if (e.code === 4001) {
          toggleStatus(5);
          return "0";
        } else {
          toggleStatus(4);
          return "0";
        }
      }
    },
    //
    [basisCash, toggleStatus, toggleWait]
  );
}

export default useHandleTransactionReceipt;
