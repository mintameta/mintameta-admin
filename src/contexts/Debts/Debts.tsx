//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Context from "./context";
import useBasisCash from "../../hooks/useBasisCash";

import config, { debtDefinitions } from "../../config";

const Debts: React.FC = ({ children }) => {
  const [debts, setItanks] = useState<Mine[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const debts = [];
    for (const debtInfo of Object.values(debtDefinitions)) {
      if (!basisCash.isUnlocked) continue;
      debts.push({
        ...debtInfo,
        address: config.deployments[debtInfo.contract].address,
        mortgagePoolContract: basisCash.contracts[debtInfo.contract],
        mortgageToken: basisCash.externalTokens[debtInfo.depositTokenName],
        uToken: basisCash.externalTokens[debtInfo.earnTokenName],
      });
    }
    
    setItanks(debts);
  }, [basisCash, basisCash?.isUnlocked, setItanks]);

  useEffect(() => {
    if (basisCash) {
      fetchPools().catch((err) =>
        console.error(`Failed to fetch Itanks: ${err.stack}`)
      );
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ debts }}>{children}</Context.Provider>;
};

export default Debts;
