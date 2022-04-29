//@ts-nocheck
import { useCallback } from "react";
import { $isFiniteNumber, $isPositiveNumber } from "../utils/utils";
const useBlur = () => {
  const onBlur = useCallback(
    (e,setVal) => {
      const { value } = e.currentTarget;

      const val= $isPositiveNumber($isFiniteNumber(value));
      setVal(val)
    },
    []
  );
  return { onBlur };
};

export default useBlur;
