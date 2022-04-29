//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useUserOverview = () => {
  const [userOverview, setUserOverview] = useState({
    total: 0,
    exchange: 0,
    coin: 0,
    ins:0,
  });

  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchUserOverview = useCallback(async () => {
    const userOverview = await basisCash.getUserOverview();
    setUserOverview(userOverview);
    console.log(
      "🚀 ~ file: useUserOverview.ts ~ line 13 ~ fetchUserOverview ~ userOverview",
      userOverview
    );
  }, [basisCash]);

  useEffect(() => {
    if (basisCash) {
      fetchUserOverview();
    }
  }, [basisCash, block]);

  return { userOverview, fetchUserOverview };
};

export default useUserOverview;
