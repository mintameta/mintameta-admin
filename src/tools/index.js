import {BigNumber} from 'bignumber.js';

export function BigNumberStr(num1, num2, col) {
  let res = new BigNumber(num1).dividedBy(Math.pow(10, num2)).toFixed(col, 1);
  return !isNaN(res) ? res : 0
}
export function BigNumberMul(num1, num2, col) {//x
  let res = new BigNumber(num1).multipliedBy(num2).toFixed(col,1);
  return !isNaN(res) ? res : 0
}
export function BigNumberDiv(num1, num2, col) {//÷
  let res = new BigNumber(num1).dividedBy(num2).toFixed(col,1);
  return !isNaN(res) ? res : 0
}
export function BigNumberAdd(num1, num2, col) {//+
  let res = new BigNumber(num1).plus(num2).toFixed(col,1);
  return !isNaN(res) ? res : 0
}
export function BigNumberSub(num1, num2, col) {//-
  let res = new BigNumber(num1).minus(num2).toFixed(col,1);
  return !isNaN(res) ? res : 0
}

//
export function formatDate(date1) {
  let date = new Date(date1)
  // //console.log('date',date,date1);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD +" "+hh + mm + ss;
}
//
export function formatTime() {
  // //console.log('date',date);
  var date = new Date();
  var _nowTime = date.getTime();
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var date1 = YY + MM + DD +" "+'08:00:00';
  var time = new Date(date1).getTime();
  var res = 0;
  if (_nowTime > time) {
    time = time + 24 * 60 * 60 * 1000;
  }
  res = time - _nowTime;
  // //console.log('date1',date1,res)
  return res
}
//
export function getFormatTime (during) {
  let s = Math.floor(during / 1) % 60;
  s = s < 10 ? ('0' + s) : s;
  during = Math.floor(during / 60);
  let i = during % 60;
  i = i < 10 ? ('0' + i) : i;
  during = Math.floor(during / 60);
  let h = during % 24;
  h = h < 10 ? ('0' + h) : h;
  during = Math.floor(during / 24);
  let d = during % 30;
  d = d < 10 ? ('0' + d) : d;
  during = Math.floor(during / 30);
  let m = during;
  // m = m < 10 ? ('0' + m) : m;
  return [m, d, h, i, s]
}

//
export function substringStr(str='', chars = 3, type=0) {
  if (str && str.length > 0){
    if (type === 0) {
      str = `${str.substring(0, chars + 2)}...${str.substring(42 - chars)}`
    } else if (type === 1) {
      str = `${str.substring(0, chars)}${str.length>chars ? '...' : ''}`
    }
  }
  return str;
}

//
export function orderByFun(arr=[],key='id',orderBy='desc') {
  if(orderBy == 'desc'){
    arr = arr.sort(function(a, b){return b[key] - a[key]});
  }else{
    arr = arr.sort(function(a, b){return a[key] - b[key]});
  }
  return arr;
}

//
export function timeStatusFun(nowTime, start, end) {
  let obj = {}
  let status = 0
  let getTime = 0
  if (nowTime*1 < start*1) {
    status = 0
    getTime = start*1 - nowTime*1
  } else if (nowTime*1 >= start*1 && nowTime*1 < end*1) {
    status = 1
    getTime = end*1 - nowTime*1
  } else if (nowTime*1 >= end*1 && end*1 != 0) {
    status = 2
    getTime = 0
  }
  obj.status = status
  obj.getTime = getTime>0 ? getTime*1000 : 0
  return obj
}



