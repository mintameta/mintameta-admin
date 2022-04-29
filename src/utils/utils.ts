//@ts-nocheck
import BigNumber from "bignumber.js";
export const formatDate = (datetime: any) => {
  datetime = new Date(datetime * 1000);
  // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
  var year = datetime.getFullYear(),
    month = ("0" + (datetime.getMonth() + 1)).slice(-2),
    date = ("0" + datetime.getDate()).slice(-2),
    hour = ("0" + datetime.getHours()).slice(-2),
    minute = ("0" + datetime.getMinutes()).slice(-2),
    second = ("0" + datetime.getSeconds()).slice(-2);
  // 拼接
  var result =
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  // 返回
  return result;
};
export const formatDate1 = (datetime: any) => {
  datetime = new Date(datetime);
  // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
  var year = datetime.getFullYear(),
    month = ("0" + (datetime.getMonth() + 1)).slice(-2),
    date = ("0" + datetime.getDate()).slice(-2),
    hour = ("0" + datetime.getHours()).slice(-2),
    minute = ("0" + datetime.getMinutes()).slice(-2),
    second = ("0" + datetime.getSeconds()).slice(-2);
  // 拼接
  var result = year + "-" + month + "-" + date;
  // 返回
  return result;
};

export const getStartDate = (n) => {
  var currentTime = new Date().getTime();
  var startDate = currentTime - n * 3600 * 24 * 1000;
  return formatDate1(startDate);
};
export const getWeekDate = (n) => {
  return {
    startDate: getStartDate(7),
    endDate: formatDate1(new Date().getTime()),
  };
};
export const getMonthDate = (n) => {
  return {
    startDate: getStartDate(30),
    endDate: formatDate1(new Date().getTime()),
  };
};
export const getAllDate = (n) => {
  return {
    startDate: "2021-08-12",
    endDate: formatDate1(new Date().getTime()),
  };
};

export const getDep = (num) => {
  //除法
  return new BigNumber(num).dp();
};
export const getQueryParam = (name, search) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};

export const $isFiniteNumber = (val) => {
  return !Number.isFinite(parseFloat(val)) ? 0 : val;
};
export const $isPositiveNumber = (val) => {
  return new BigNumber(val).gt(0) ? val : 0;
};
export const getEncryptAddress = (address) => {
  return address ? address.replace(/(\w{4})\w*(\w{4})/, "$1******$2") : "";
};
