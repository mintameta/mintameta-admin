//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { useBlockNumber } from "../../state/application/hooks";
import useBasisCash from "../useBasisCash";
import BigNumber from "bignumber.js";
import { getTonumber } from "../../utils/formatBalance";
const useTVL = (mortgagePoolContract, token, price) => {
  const [tvl, setTvl] = useState(0);
  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchTvl = useCallback(async () => {
    if (token && mortgagePoolContract) {
      if (token.symbol === "ETH") {
        const balance = await await basisCash.provider.getBalance(
          mortgagePoolContract.address
        );
        
        setTvl(
          new BigNumber(getTonumber(balance, token.decimal))
            .times(price)
            .toNumber()
        );
      } else if (token.symbol === "NEST") {
        const balance = await token.balanceOf(mortgagePoolContract.address);
        
        setTvl(
          new BigNumber(getTonumber(balance, token.decimal))
            .times(price)
            .toNumber()
        );
      }
    }
  }, [
    basisCash?.myAccount,
    basisCash?.provider,
    mortgagePoolContract,
    token,
    price,
  ]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
      mortgagePoolContract &&
      token &&
      price &&
      refreshInterval
    ) {
      fetchTvl();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, mortgagePoolContract, block, token, price]);

  return tvl;
};

export default useTVL;
