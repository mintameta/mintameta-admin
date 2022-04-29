//@ts-nocheck
import BigNumber1 from "bignumber.js";
import { getDep } from "./utils";
export const getNumberToAll = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  const dp = displayBalance.dp();
  return displayBalance.toFixed(dp);
};

export const getNumberToMax = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  var dp = displayBalance.dp();
  dp = dp > 8 ? 8 : dp;
  return displayBalance.toFixed(dp);
};
export const getNumberToMax1 = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  var dp = displayBalance.dp();

  dp = dp > 3 ? 3 : dp;
  return displayBalance.toFixed(dp);
};
export const getDisplayNumber = (
  balance: any,
  decimals = 18,
  fractionDigits = 3
) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  return displayBalance.toFixed(fractionDigits);
};

export const getTonumber = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  const displayBalance = balance.dividedBy(new BigNumber1(10).pow(decimals));
  // return balance.dividedBy(new BigNumber1(10).pow(decimals)).toNumber();
  return balance
    .dividedBy(new BigNumber1(10).pow(decimals))
    .toFixed(displayBalance.dp(), 1);
};
export const getNumberToFixed = (balance: any) => {
  balance = new BigNumber1(balance);
  return balance.toFixed(balance.dp(), 1);
};
export const getToBignumber = (balance: any, decimals = 18) => {
  balance = new BigNumber1(balance.toString());
  return balance.dividedBy(new BigNumber1(10).pow(decimals));
};

export const getNoDecimalsTonumber = (balance: any) => {
  return balance.toNumber();
};
export const updateNumDep = (val, token) => {
  let dp = getDep(val);
  if (dp) {
    dp = dp > token.decimal ? token.decimal : dp;
    return new BigNumber1(val).toFixed(dp, 1);
  } else {
    return val;
  }
};
