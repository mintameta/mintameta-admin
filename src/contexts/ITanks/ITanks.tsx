//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Context from "./context";
import useBasisCash from "../../hooks/useBasisCash";

import config, { itankDefinitions } from "../../config";

const ITanks: React.FC = ({ children }) => {
  const [itanks, setItanks] = useState<Mine[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const itanks = [];
    for (const itankInfo of Object.values(itankDefinitions)) {
      if (!basisCash.isUnlocked) continue;
      itanks.push({
        ...itankInfo,
        address: config.deployments[itankInfo.contract].address,
        itankContract: basisCash.contracts[itankInfo.contract],
        depositToken: basisCash.externalTokens[itankInfo.depositTokenName],
        earnToken: basisCash.externalTokens[itankInfo.earnTokenName],
      });
    }
    
    setItanks(itanks);
  }, [basisCash, basisCash?.isUnlocked, setItanks]);

  useEffect(() => {
    if (basisCash) {
      fetchPools().catch((err) =>
        console.error(`Failed to fetch Itanks: ${err.stack}`)
      );
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ itanks }}>{children}</Context.Provider>;
};

export default ITanks;
