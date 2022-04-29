//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useDebtInfo = (debt) => {
  const [info, setInfo] = useState({});

  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchInfo = useCallback(
    async (address = basisCash?.myAccount) => {
      const info = await basisCash.getDebt(
        debt.mortgagePoolContract,
        debt.mortgageToken,
        address,
        debt.uToken,
        debt.key
      );
      setInfo({ ...debt, ...info });
    },
    [basisCash?.myAccount, debt]
  );

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
      debt &&
      debt.mortgagePoolContract &&
      refreshInterval
    ) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, debt, block]);

  return { info,fetchInfo };
};

export default useDebtInfo;
