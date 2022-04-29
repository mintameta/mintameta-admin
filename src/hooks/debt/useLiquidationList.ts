//@ts-nocheck
import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useBasisCash from "../useBasisCash";
import { getNumberToFixed } from "../../utils/formatBalance";
import { useBlockNumber } from "../../state/application/hooks";
import useDebts from "./useDebts";
const useLiquidationList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMortgageValue, setTotalMortgageAssets] = useState(0);

  const debts = useDebts();
  const basisCash = useBasisCash();
  const block = useBlockNumber();
  const fetchList = useCallback(
    async (address = basisCash?.myAccount) => {
      if (debts.length) {
        const userList = await basisCash.getDebtUserList();
        let list = [];
        await Promise.all(
          debts.map(async (item) => {
            const datum = await Promise.all(
              userList.map(async (el) => {
                const account = el.address;
                const info = await basisCash.getDebt(
                  item.mortgagePoolContract,
                  item.mortgageToken,
                  account,
                  item.uToken,
                  item.key
                );
                const { rate, liqRatio } = info;
              

                const mortgagePrice = new BigNumber(info?.mortgagePrice);
                const isLiq = new BigNumber(rate).div(100).gte(liqRatio);

                const maxLiqFee = mortgagePrice
                  .times(info.mortgageAssets)
                  .times(0.9)
                  .toNumber();
                return {
                  ...item,
                  ...info,
                  account,
                  maxLiqFee,
                  itemKey: item.key + account,
                  isLiq,
                };
              })
            );
            list.push(...datum);
          })
        );
        let totalMortgageValue = new BigNumber(0);
        list = list.filter((el) => !!el.created).filter((el) => el.isLiq);
        list.forEach((item) => {
          totalMortgageValue = totalMortgageValue.plus(item.mortgageValue);
        });

        list = list.sort((a, b) => {
          if (parseFloat(b.rate) === parseFloat(a.rate)) {
            return parseFloat(b.parassetAssets) - parseFloat(a.parassetAssets);
          } else {
            return parseFloat(b.rate) - parseFloat(a.rate);
          }
        });


        setTotalMortgageAssets(getNumberToFixed(totalMortgageValue));
        
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

  return { list, loading, totalMortgageValue };
};

export default useLiquidationList;
