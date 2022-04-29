//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import useBasisCash from "../useBasisCash";
import BigNumber from "bignumber.js";
import { useBlockNumber } from "../../state/application/hooks";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";
import useItanks from "../../hooks/itank/useItanks";
const useMineTotalTvl = (mines) => {
  const [totalTvl, setTotalTvl] = useState(0);
  const itanks = useItanks();
  const basisCash = useBasisCash();
  const block = useBlockNumber();

  const fetchTvl = useCallback(async () => {
    let list = await Promise.all(
      mines.map(async (item) => {
        const itank = itanks.find((el) => el.contract === item.depositContract);
        const { depositToken } = item;
        const { tvl } = await basisCash.getMineTvl(
          depositToken,
          depositToken.address,
          block,
          itank
        );

        return $isPositiveNumber($isFiniteNumber(tvl));
      })
    );
    let totalTvl = new BigNumber(0);
    list.forEach((item) => {
      totalTvl = totalTvl.plus(item);
    });
    totalTvl = $isPositiveNumber($isFiniteNumber(totalTvl.toNumber()));
    setTotalTvl(totalTvl);
  }, [mines, itanks, block]);

  useEffect(() => {
    let refreshInterval = true;
    if (
      basisCash?.myAccount &&
      mines?.length &&
      itanks?.length &&
      refreshInterval
    ) {
      fetchTvl();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, block, mines, itanks]);

  return { totalTvl };
};

export default useMineTotalTvl;
