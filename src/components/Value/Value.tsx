//@ts-nocheck
import React, { useMemo, useCallback } from "react";
import BigNumber from "bignumber.js";
import { getDep } from "../../utils/utils";
export default function FormatValue({
  value,
  decimals = 3,
  placeholder,
  showAll,
  prefix,
  suffix,
}) {
  const formatValue = useMemo(() => {
    const getDep = (val, decimals) => {
      let dp = new BigNumber(val).dp();
      return dp > decimals ? decimals : dp;
    };
    const dp = getDep(value, decimals);
    return parseFloat(value)
      ? showAll
        ? new BigNumber(value).toFormat()
        : new BigNumber(value).toFormat(dp)
      : placeholder
      ? "-"
      : value;
  }, [value, decimals, placeholder]);
  return (
    <>
      {" "}
      {prefix}
      {formatValue}
      {suffix}
    </>
  );
}
