

import { useCallback } from 'react';

import useBasisCash from '../useBasisCash';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useWithdraw = (address:any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, 18);
      return handleTransactionReceipt(basisCash.unstake, [amountBn,address]);
    },
    [basisCash,address],
  );
  return { onWithdraw: handleWithdraw };
};


export default useWithdraw;

