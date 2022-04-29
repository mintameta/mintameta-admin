//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useItankDatum = ({
  tvlDatumValue,
  feeDatumValue,
  netValueDatumValue,
}) => {
  const [tvlDatum, setTvlDatum] = useState([]);
  const [feeDatum, setFeeDatum] = useState([]);
  const [netValueDatum, setNetValueDatum] = useState([]);

  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchTvlDatum = useCallback(async () => {
    const tvlDatum = await basisCash.getItankTvlDatum(tvlDatumValue);
    setTvlDatum(tvlDatum);
  }, [basisCash, tvlDatumValue]);

  const fetchFeeDatum = useCallback(async () => {
    const feeDatum = await basisCash.getItankFeeDatum(feeDatumValue);
    setFeeDatum(feeDatum);
  }, [basisCash, feeDatumValue]);

  const fetchNetValueDatum = useCallback(async () => {
    const netValueDatum = await basisCash.getItankNetValueDatum(
      netValueDatumValue
    );
    setNetValueDatum(netValueDatum);
  }, [basisCash, netValueDatumValue]);

  useEffect(() => {
    if (basisCash) {
      fetchTvlDatum();
      fetchFeeDatum();
      fetchNetValueDatum();
    }
  }, [basisCash, block, tvlDatumValue, feeDatumValue, netValueDatumValue]);

  return {
    tvlDatum,
    feeDatum,
    netValueDatum,
    fetchTvlDatum,
    fetchFeeDatum,
    fetchNetValueDatum,
  };
};

export default useItankDatum;
