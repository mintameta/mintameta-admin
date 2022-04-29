import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useWithdraw = (itankContract: any, decimal: any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, decimal);
      return handleTransactionReceipt(basisCash.itankUnstake, [
        itankContract,
        amountBn,
      ]);
    },
    [basisCash, itankContract, decimal]
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
