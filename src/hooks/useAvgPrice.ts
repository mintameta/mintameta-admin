//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "./useBasisCash";
import config from "../config";
const useAvgPrice = () => {
  const [avgPrice, setAvgPrice] = useState(0);
  const basisCash = useBasisCash();

  const fetchAvgPrice = useCallback(async () => {
    setAvgPrice(await basisCash.getAvgPrice());
  }, [basisCash]);

  useEffect(() => {
    if (basisCash?.myAccount) {
      fetchAvgPrice().catch((err) =>
        console.error(`Failed to fetch avgPrice: ${err.stack}`)
      );
      let refreshInterval = setInterval(fetchAvgPrice, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash?.myAccount]);

  return avgPrice;
};

export default useAvgPrice;
