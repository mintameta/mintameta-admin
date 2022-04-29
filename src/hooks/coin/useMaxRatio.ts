//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
const useMaxRatio = (mortgagePoolContract, mortgageToken) => {
  const block = useBlockNumber();
  const [maxRatio, setMaxRatio] = useState(0);
  const basisCash = useBasisCash();

  const fetchMaxRatio = useCallback(async () => {
    setMaxRatio(
      await basisCash.getMaxRatio(mortgagePoolContract, mortgageToken)
    );
  }, [basisCash, mortgageToken]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
      mortgagePoolContract &&
      mortgageToken &&
      refreshInterval
    ) {
      fetchMaxRatio();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, block, mortgagePoolContract, mortgageToken]);
  return maxRatio;
};

export default useMaxRatio;
