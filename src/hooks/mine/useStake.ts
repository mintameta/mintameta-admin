import { useCallback } from "react";

import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useStake = (address: any) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount) => {
      const amountBn = decimalToBalance(amount, 18);
      console.log(amountBn, amount);
      return handleTransactionReceipt(basisCash.stake, [amountBn, address]);
    },
    [basisCash, address]
  );
  return { onStake: handleStake };
};

export default useStake;
