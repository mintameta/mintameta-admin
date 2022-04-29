//@ts-nocheck
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useCallback, useMemo } from "react";
import useHandleTransactionReceipt from "./useHandleTransactionReceipt";
import useAllowance from "./useAllowance";
import { $isFiniteNumber, $isPositiveNumber } from "../utils/utils";
const APPROVE_AMOUNT = ethers.constants.MaxUint256;

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApprove(token: any, spender: string, amount) {
  const currentAllowance = useAllowance(token, spender);
  const handleTransactionReceipt = useHandleTransactionReceipt();
  // check the current approval status
  // const approvalState = useMemo(() => {
  //   return !parseFloat(currentAllowance);
  // }, [currentAllowance]);

  const approvalState = useMemo(() => {
    const approvalAmount = new BigNumber(currentAllowance);
    const payAmount = $isPositiveNumber($isFiniteNumber(amount));

    if (payAmount) {
      return approvalAmount.gte(payAmount) ? false : true;
    } else if (!parseFloat(payAmount)) {
      return !parseFloat(currentAllowance);
    }
  }, [currentAllowance, amount]);

  const approve = useCallback(() => {
    if (!approvalState) {
      console.error("approve was called unnecessarily");
      return;
    }
    return handleTransactionReceipt(
      token.approve,
      [spender, APPROVE_AMOUNT],
      token
    );
  }, [approvalState, token, spender]);

  return [approvalState, approve];
}

export default useApprove;
