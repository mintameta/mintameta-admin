//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
const useFee = (mortgagePoolContract, mortgageToken, uToken) => {
  const block = useBlockNumber();
  const [fee, setFee] = useState(0);
  const basisCash = useBasisCash();

  const fetchFee = useCallback(
    async (address = basisCash?.myAccount) => {
      const fee = await basisCash.getStableFee(
        mortgagePoolContract,
        mortgageToken,
        uToken,
        address
      );
      // console.log(mortgagePoolContract, mortgageToken, uToken, address, fee);

      setFee(fee);
    },
    [basisCash?.myAccount, mortgageToken, uToken]
  );

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
      mortgagePoolContract &&
      mortgageToken &&
      uToken &&
      refreshInterval
    ) {
      fetchFee();
    }
    return () => {
      refreshInterval = false;
    };
  }, [
    basisCash?.myAccount,
    block,
    mortgagePoolContract,
    mortgageToken,
    uToken,
  ]);
  return fee;
};

export default useFee;
