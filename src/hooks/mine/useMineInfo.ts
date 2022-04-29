//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
import { $isFiniteNumber, $isPositiveNumber } from "./../../utils/utils";
const useMineInfo = (mine, itank) => {
  const [staked, setStaked] = useState(0);
  const [earned, setEarned] = useState(0);
  const [apy, setApy] = useState(0);
  const [tvl, setTvl] = useState(0);
  const [info, setInfo] = useState({
    rewardRate: 0,
    totalSupply: 0,
  });
  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchStaked = useCallback(
    async (address = basisCash?.myAccount) => {
      const staked = await basisCash.getStaked(
        mine?.depositToken?.address,
        address
      );
      setStaked(staked);
      return staked;
    },
    [basisCash?.myAccount, mine]
  );
  const fetchEarned = useCallback(
    async (address = basisCash?.myAccount) => {
      const earned = await basisCash.getEarned(
        mine?.depositToken?.address,
        address
      );
      setEarned(earned);
      return earned;
    },
    [basisCash?.myAccount, mine]
  );
  const fetchChannelInfo = useCallback(async () => {
    const info = await basisCash.getChannelInfo(
      mine?.depositToken?.address,
      block
    );

    setInfo(info);
  }, [basisCash?.myAccount, mine, block]);

  const fetchTvl = useCallback(async () => {
    if (itank?.itankContract && mine?.depositToken) {
      const { depositToken } = mine;
      const { tvl, rewardRate } = await basisCash.getMineTvl(
        depositToken,
        depositToken.address,
        block,
        itank
      );
      setTvl($isPositiveNumber($isFiniteNumber(tvl)));

      const apy = await basisCash.getMineApy(tvl, rewardRate);

      setApy($isPositiveNumber($isFiniteNumber(apy)));
    }
  }, [basisCash?.myAccount, mine, block, itank]);

  const fetchInfo = useCallback(async () => {
    fetchStaked();
    fetchEarned();
    fetchChannelInfo();
    fetchTvl();
  }, [basisCash?.myAccount, mine, block, itank]);

  useEffect(() => {
    let refreshInterval = true;
    if (basisCash?.myAccount && mine?.depositToken && refreshInterval) {
      fetchInfo();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, block, mine, itank]);

  return { staked, earned, info, tvl, apy ,fetchInfo};
};

export default useMineInfo;
