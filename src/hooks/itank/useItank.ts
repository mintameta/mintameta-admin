//@ts-nocheck
import { useContext } from "react";
import { Context as ItanksContext } from "../../contexts/ITanks";
const useItank = (contractName) => {
  const { itanks } = useContext(ItanksContext);

  if (itanks.length) {
    return itanks.find((item) => item.contract === contractName);
  } else {
    return {
      name: "ETH-PETH",
      icon1: "ETH",
      icon2: "PETH",
      contract: "PETHInsPool",
      depositTokenName: "ETH",
      earnTokenName: "PETH",
      LPTokenName: "LP-ETH",
    };
  }
};

export default useItank;
