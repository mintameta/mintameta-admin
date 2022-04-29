
//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import ERC20 from "../basis-cash/ERC20";
import useBasisCash from "./useBasisCash";
import config from "../config";
import { getTonumber } from "../utils/formatBalance";
const useTotalSupply = (token: ERC20) => {
  const [totalSupply, setTotalSupply] = useState(0);
  const basisCash = useBasisCash();

  const fetchTotalSupply = useCallback(async () => {
    if (token) {
      const totalSupply = await token.totalSupply(basisCash.myAccount);
      setTotalSupply(getTonumber(totalSupply, token.decimal));
    }
  }, [basisCash?.myAccount, basisCash?.provider, token]);

  useEffect(() => {
 
    const refreshInterval = setInterval(() => {
      if (basisCash?.myAccount) {
        fetchTotalSupply().catch((err) =>
          console.error(`Failed to fetch token totalSupply: ${err.stack}`)
        );
      }
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [basisCash?.myAccount, token]);

  return totalSupply;
};

export default useTotalSupply;
