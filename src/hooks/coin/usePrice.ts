//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
const usePrice = () => {
  const block = useBlockNumber();
  const [NESTToUSDTPrice, setNESTToUSDTPrice] = useState(0);
  const [NESTToETHPrice, setNESTToETHPrice] = useState(0);
  const [ETHAvgPrice, setETHAvgPrice] = useState(0);
  const basisCash = useBasisCash();

  const fetchETHAvgPrice = useCallback(async () => {
    setETHAvgPrice(await basisCash.getAvgPrice());
  }, [basisCash]);

  const fetchNESTToUSDTPrice = useCallback(async () => {
    setNESTToUSDTPrice(await basisCash.getNESTToUSDTPrice());
  }, [basisCash]);

  const fetchNESTToETHPrice = useCallback(async () => {
    setNESTToETHPrice(await basisCash.getNESTToETHPrice());
  }, [basisCash]);

  const fetchInfo = useCallback(async () => {
    fetchETHAvgPrice();
    fetchNESTToUSDTPrice();
    fetchNESTToETHPrice();
  }, [basisCash?.myAccount]);

  useEffect(() => {
    let refreshInterval = true;
    if (basisCash?.myAccount && refreshInterval) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, block]);
  return { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice };
};

export default usePrice;
