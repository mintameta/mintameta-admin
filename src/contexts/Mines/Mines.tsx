//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import Context from "./context";
import useBasisCash from "../../hooks/useBasisCash";
import { Mine } from "../../basis-cash";
import config, { mineDefinitions } from "../../config";

const Mines: React.FC = ({ children }) => {
  const [mines, setMines] = useState<Mine[]>([]);
  const basisCash = useBasisCash();

  const fetchPools = useCallback(async () => {
    const mines: Mine[] = [];

    for (const mineInfo of Object.values(mineDefinitions)) {
      if (!basisCash.isUnlocked) continue;
      mines.push({
        ...mineInfo,
        address: config.deployments[mineInfo.contract].address,
        depositToken: basisCash.contracts[mineInfo.depositContract],
        earnToken: basisCash.externalTokens[mineInfo.earnTokenName],
      });
    }
    setMines(mines);
  }, [basisCash, basisCash?.isUnlocked, setMines]);

  useEffect(() => {
    if (basisCash) {
      fetchPools().catch((err) =>
        console.error(`Failed to fetch pools: ${err.stack}`)
      );
    }
  }, [basisCash, basisCash?.isUnlocked, fetchPools]);

  return <Context.Provider value={{ mines }}>{children}</Context.Provider>;
};

export default Mines;
