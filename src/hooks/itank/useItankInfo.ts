//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";

const useItankInfo = (itank) => {
  const [itankInfo, setItankInfo] = useState({
    depositFundBalance: 0,
    earnFundBalance: 0,
    depositFundValue: 0,
    earnFundValue: 0,
    perShare: 0,
    totalSupply: 0,
    totalAssets: 0,
    avgPrice: 0,
    revenue: 0,
  });

  const [lastDate, setLastDate] = useState({
    nextStartTime: "",
    nextEndTime: "",
    nextStartTimeNum: 0,
    nextEndTimeNum: 0,
  });
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [fee, setFee] = useState(0);

  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchFundBalance = useCallback(async () => {
    let itankInfo = await basisCash.getFundAsset(itank);
    setItankInfo(itankInfo);
  }, [basisCash?.myAccount, itank]);

  const fetchLastDate = useCallback(async () => {
    let lastDate = await basisCash.getLastDate(itank);
    setLastDate(lastDate);
  }, [basisCash?.myAccount, itank]);

  const fetchRedeemAmount = useCallback(
    async (address = basisCash?.myAccount) => {
      let redeemAmount = await basisCash.getRedemptionAmount(
        itank.itankContract,
        itank?.itankContract?.decimal,
        address
      );
      setRedeemAmount(redeemAmount);
    },
    [basisCash?.myAccount, itank]
  );

  const fetchFee = useCallback(async () => {
    let fee = await basisCash.getExchangeFee(itank.itankContract);
    setFee(fee);
  }, [basisCash?.myAccount, itank]);
  const fetchInfo = useCallback(async () => {
    fetchFundBalance();
    fetchRedeemAmount();
    fetchLastDate();
    fetchFee();
  }, [basisCash?.myAccount, itank, block]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
      itank &&
      itank.itankContract &&
      refreshInterval
    ) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, block, itank]);

  return { itankInfo, lastDate, fee, redeemAmount };
};

export default useItankInfo;
