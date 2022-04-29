//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import { useBlockNumber } from "../../state/application/hooks";
import useDebts from "./useDebts";
const useCreatedDebts = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mortgageValue, setTotalMortgageValue] = useState(0);
  const [parassetValue, setTotalParassetValue] = useState(0);
  const debts = useDebts();
  console.log("🚀 ~ file: useCreatedDebts.ts ~ line 13 ~ useCreatedDebts ~ debts", debts)
  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchList = useCallback(
    async (address = basisCash?.myAccount) => {
      if (debts.length) {
        let list = await Promise.all(
          debts.map(async (item) => {
            const info = await basisCash.getDebt(
              item.mortgagePoolContract,
              item.mortgageToken,
              address,
              item.uToken,
              item.key
            );
            return { ...item, ...info };
          })
        );
        list = list.filter((el) => !!el.created);
        let mortgageValue = new BigNumber(0);
        let parassetValue = new BigNumber(0);
        list.forEach((item) => {
          mortgageValue = mortgageValue.plus(item.mortgageValue);
          parassetValue = parassetValue
            .plus(item.parassetValue)
            .plus(item.feeValue);
        });
        setTotalMortgageValue(mortgageValue.toNumber());
        setTotalParassetValue(parassetValue.toNumber());
        setList(list);
        setLoading(false);
        return list;
      }
    },
    [basisCash?.myAccount, debts]
  );

  useEffect(() => {
    let refreshInterval = true;
    if (basisCash?.myAccount && refreshInterval) {
      fetchList();
    }
    return () => {
      refreshInterval = false;
    };
  }, [basisCash?.myAccount, debts, block]);

  return { list, loading, mortgageValue, parassetValue };
};

export default useCreatedDebts;
