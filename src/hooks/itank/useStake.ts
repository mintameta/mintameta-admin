//@ts-nocheck
import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useStake = (itankContract: any, decimal: any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount, isPayETH) => {
      const amountBn = decimalToBalance(amount, decimal);
      const value = isPayETH
        ? { value: decimalToBalance(String(amount), 18) }
        : {};
      return handleTransactionReceipt(basisCash.itankStake, [
        itankContract,
        amountBn,
        value,
      ]);
    },
    [basisCash, itankContract, decimal]
  );
  return { onStake: handleStake };
};

export default useStake;
