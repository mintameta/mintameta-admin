//@ts-nocheck
import { useContext } from "react";
import { Context as DebtsContext } from "../../contexts/Debts";
const useDebt = (key) => {
  const { debts } = useContext(DebtsContext);
  if (debts && debts.length) {
    return debts.find((item) => item.key === key);
  } else {
    return {
      name: "ETH-PUSD",
      key: "ETHPUSD",
      icon1: "ETH",
      icon2: "PUSD",
      contract: "PUSDMorPool",
      depositTokenName: "ETH",
      earnTokenName: "PUSD",
    };
  }
};

export default useDebt;
