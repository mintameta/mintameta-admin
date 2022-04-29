//@ts-nocheck
import { useContext } from "react";
import { Context as MinesContext } from "../../contexts/Mines";
import { Mine, ContractName } from "../../basis-cash";

const useMine = (contractName: ContractName): Mine => {
  const { mines } = useContext(MinesContext);

  if (mines.length) {
    return mines.find((mine) => mine.depositContract === contractName);
  } else {
    return {
      name: "USDT-PUSD",
      icon1: "USDT",
      icon2: "PUSD",
      contract: "Mine",
      depositTokenName: "LP-USD",
      depositContract: "PUSDInsPool",
      earnTokenName: "ASET",
    };
  }
};

export default useMine;
