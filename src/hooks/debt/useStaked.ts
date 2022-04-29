//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "../../state/application/hooks";
import useBasisCash from "../useBasisCash";
import { getTonumber } from "../../utils/formatBalance";
const useStaked = (mortgagePoolContract, token) => {
  const [staked, setStaked] = useState(0);
  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchStaked = useCallback(async () => {
    if (token && mortgagePoolContract) {
      if (token.symbol === "ETH") {
        const balance = await await basisCash.provider.getBalance(
          mortgagePoolContract.address
        );

        setStaked(getTonumber(balance, token.decimal));
      } else if (token.symbol === "NEST") {
        const balance = await token.balanceOf(mortgagePoolContract.address);

        setStaked(getTonumber(balance, token.decimal));
      }
    }
  }, [basisCash?.myAccount, basisCash?.provider, mortgagePoolContract, token]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
      mortgagePoolContract &&
      token &&
      refreshInterval
    ) {
      fetchStaked();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, mortgagePoolContract, block, token]);

  return staked;
};

export default useStaked;
