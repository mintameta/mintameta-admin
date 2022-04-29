//@ts-nocheck
import { useCallback, useEffect, useState } from "react";

import useBasisCash from "./useBasisCash";
import { getTonumber } from "../utils/formatBalance";
const useAllowance = (token: any, spender: string) => {
  const [allowance, setAllowance] = useState(0);
  const basisCash = useBasisCash();
  const fetchAllowance = useCallback(async () => {
    if (token) {
    
      const allowance = await token.allowance(basisCash?.myAccount, spender);
      
      setAllowance((getTonumber(allowance,token.decimal)) );
      
    }
  }, [basisCash?.myAccount, spender, token]);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (basisCash?.isUnlocked && spender && token) {
        fetchAllowance().catch((err) =>
          console.log(`Failed to fetch allowance: ${err.stack}`)
        );
      }
    }, 1000);
    return () => clearInterval(refreshInterval);
  }, [basisCash?.isUnlocked, basisCash?.myAccount, spender, token]);

  return allowance;
};

export default useAllowance;
