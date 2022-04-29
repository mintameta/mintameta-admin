//@ts-nocheck
import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import useHandleTransactionReceipt from "../useHandleTransactionReceipt";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const useCoin = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleCoin = useCallback(
    (mortgagePoolContract, mortgageToken, amount, ratio) => {
      const amountBn = decimalToBalance(String(amount), mortgageToken.decimal);
      const value = decimalToBalance(
        mortgageToken.symbol === "ETH"
          ? new BigNumber(amount).plus(0.001).toFixed()
          : String(0.001),
        mortgageToken.decimal
      );
      ratio = new BigNumber(ratio).times(100000).toFixed(0, 1);
      console.log("🚀 ~ file: useCoin.ts ~ line 21 ~ useCoin ~ ratio", ratio)
     
      return handleTransactionReceipt(basisCash.coin, [
        mortgagePoolContract,
        mortgageToken,
        amountBn,
        Number(ratio),
        value,
      ]);
    },
    [basisCash]
  );
  return { onCoin: handleCoin };
};

export default useCoin;
