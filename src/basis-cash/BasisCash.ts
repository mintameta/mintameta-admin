//@ts-nocheck

import { configAll } from "./config";
import { Contract, ethers, Overrides } from "ethers";
import BigNumber from "bignumber.js";
import {
  getDisplayNumber,
  getToBignumber,
  getTonumber,
  getNumberToFixed,
} from "../utils/formatBalance";
import {
  formatDate,
  getWeekDate,
  getMonthDate,
  getAllDate,
} from "../utils/utils";
import { $isFiniteNumber, $isPositiveNumber } from "../utils/utils";
import { getDefaultProvider } from "../utils/provider";
import ERC20 from "./ERC20";
/**
 * An API module of Gaea Coin contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: configAll;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };

  constructor(cfg: configAll) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(
        deployment.address,
        deployment.abi,
        provider
      );
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(
        address,
        provider,
        symbol,
        decimal
      ); // TODO: add decimal
    }

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(
      provider,
      this.config.chainId
    );

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions() {
    return {
      // gasLimit: 300000000,
      from: this.myAccount,
    };
  }
  gasETHAddress(token) {
    return token.symbol === "ETH"
      ? "0x0000000000000000000000000000000000000000"
      : token.address;
  }

  async getStaked(address, account = this.myAccount) {
    try {
      const { Mine } = this.contracts;

      let staked = await Mine.getBalance(address, account);
      return staked;
    } catch (error) {
      return "0";
    }
  }
  async getEarned(address, account = this.myAccount) {
    try {
      const { Mine } = this.contracts;

      let earned = await Mine.getAccountReward(address, account);
      return getTonumber(earned);
    } catch (error) {
      return "0";
    }
  }
  async getFundBalance(token, address) {
    try {
      let balance = await token.balanceOf(address);
      return getTonumber(balance, token.decimal);
    } catch (error) {
      return "0";
    }
  }
  async getTotalSupply(token) {
    try {
      let totalSupply = await token.totalSupply();
      return getTonumber(totalSupply, token.decimal);
    } catch (error) {
      return "0";
    }
  }

  async getAvgPrice() {
    try {
      const { NestQuery } = this.contracts;
      const { USDT } = this.externalTokens;
      let { avgPrice } = await NestQuery.triggeredPriceInfo(USDT.address);
      return getTonumber(avgPrice, USDT.decimal);
    } catch (error) {
      return "0";
    }
  }

  async getMaxRatio(mortgagePoolContract, mortgageToken) {
    try {
      const address = this.gasETHAddress(mortgageToken);
      let maxRatio = await mortgagePoolContract.getMaxRate(address);
      return maxRatio.toNumber() / 100000;
    } catch (err) {
      console.log(err, "err");
      return "0";
    }
  }

  async getInfoRealTime(mortgagePoolContract, mortgageToken, uToken, address) {
    try {
      // mortgageToken	抵押资产地址
      // tokenPrice	抵押资产相对于ETH的价格数量
      // uTokenPrice	标的资产相对于ETH的价格数量（将从nest获取的数据直接传入，不需要做精度转换）
      // maxRateNum	最大抵押率限制
      // owner	债仓所有人地址
      const { NestQuery } = this.contracts;
      const { USDT } = this.externalTokens;
      let { avgPrice: tokenPrice } = await NestQuery.triggeredPriceInfo(
        mortgageToken.address
      );

      let { avgPrice: avgPriceUToken } = await NestQuery.triggeredPriceInfo(
        USDT.address
      );

      let uTokenPrice = "";
      if (uToken.symbol === "PETH") {
        uTokenPrice = "1000000000000000000";
      } else {
        uTokenPrice = avgPriceUToken.toString();
      }

      const mortgageTokenAddress = this.gasETHAddress(mortgageToken);

      let maxRateNum = await mortgagePoolContract.getMaxRate(
        mortgageTokenAddress
      );
      maxRateNum = maxRateNum.toString();

      let info = await mortgagePoolContract.getInfoRealTime(
        mortgageTokenAddress,
        mortgageToken.symbol === "ETH"
          ? "1000000000000000000"
          : tokenPrice.toString(),
        uTokenPrice,
        maxRateNum,
        address
      );

      return info;
    } catch (err) {
      // console.log(err, "err");
      return {
        fee: 0,
      };
    }
  }
  async getStableFee(mortgagePoolContract, mortgageToken, uToken, address) {
    let { fee } = await this.getInfoRealTime(
      mortgagePoolContract,
      mortgageToken,
      uToken,
      address
    );

    return getTonumber(fee);
  }
  async getLiqRatio(mortgagePoolContract, mortgageToken) {
    const address = this.gasETHAddress(mortgageToken);
    const k = await mortgagePoolContract.getK(address);
    return 100000 / k.toNumber();
  }

  async getDebt(mortgagePoolContract, mortgageToken, address, uToken, key) {
    try {
      const info = await mortgagePoolContract.getLedger(
        this.gasETHAddress(mortgageToken),
        address
      );
      const maxRatio = await this.getMaxRatio(
        mortgagePoolContract,
        mortgageToken
      );

      const fee = await this.getStableFee(
        mortgagePoolContract,
        mortgageToken,
        uToken,
        address
      );
      const ETHAvgPrice = await this.getAvgPrice();
      const NESTToUSDTPrice = await this.getNESTToUSDTPrice();
      const NESTToETHPrice = await this.getNESTToETHPrice();

      let { maxSubM, maxAddP, mortgageRate } = await this.getInfoRealTime(
        mortgagePoolContract,
        mortgageToken,
        uToken,
        address
      );
      maxSubM = getTonumber(maxSubM, mortgageToken.decimal);
      maxAddP = getTonumber(maxAddP, uToken.decimal);

      const priceList = {
        ETHPUSD: {
          mortgagePrice: ETHAvgPrice,
          parassetPrice: 1,
          mortgageToParassetPrice: ETHAvgPrice,
        },
        NESTPUSD: {
          mortgagePrice: NESTToUSDTPrice,
          parassetPrice: 1,
          mortgageToParassetPrice: NESTToUSDTPrice,
        },
        NESTPETH: {
          mortgagePrice: NESTToUSDTPrice,
          parassetPrice: ETHAvgPrice,
          mortgageToParassetPrice: NESTToETHPrice,
        },
      };
      const mortgagePrice = priceList[key].mortgagePrice;
      const parassetPrice = priceList[key].parassetPrice;
      const mortgageToParassetPrice = priceList[key].mortgageToParassetPrice;
      const mortgageAssets = getTonumber(
        info.mortgageAssets,
        mortgageToken.decimal
      );
      const parassetAssets = getTonumber(info.parassetAssets, uToken.decimal);

      const liqRatio = await this.getLiqRatio(
        mortgagePoolContract,
        mortgageToken
      );
      let liqPrice = new BigNumber(parassetAssets)
        .plus(fee)
        .div(new BigNumber(liqRatio).times(mortgageAssets))
        .toNumber();
      liqPrice = $isPositiveNumber($isFiniteNumber(liqPrice));
      const rate = getNumberToFixed(
        new BigNumber(getNumberToFixed(mortgageRate.toString())).div(1000)
      );

      return {
        ...info,
        mortgageAssets,
        parassetAssets,
        rate,
        fee,
        liqRatio,
        liqPrice,
        maxRatio,

        mortgagePrice,
        parassetPrice,
        mortgageToParassetPrice,
        mortgageValue: new BigNumber(mortgageAssets)
          .times(mortgagePrice)
          .toNumber(),
        parassetValue: new BigNumber(parassetAssets)
          .times(parassetPrice)
          .toNumber(),
        feeValue: new BigNumber(fee).times(parassetPrice).toNumber(),
        maxSubM,
        maxAddP,
        maxSubMValue: new BigNumber(maxSubM).times(mortgagePrice).toNumber(),
        maxAddPValue: new BigNumber(maxAddP).times(parassetPrice).toNumber(),
      };
    } catch (err) {
      console.log(err, "err");
      return "0";
    }
  }

  async getNESTToUSDTPrice() {
    try {
      const { NestQuery } = this.contracts;
      const { USDT, NEST } = this.externalTokens;
      let { avgPrice: avgPriceUSDT } = await NestQuery.triggeredPriceInfo(
        USDT.address
      );
      let { avgPrice: avgPriceNEST } = await NestQuery.triggeredPriceInfo(
        NEST.address
      );
      // avgPrice2/avgPrice1=NEST对u的价格
      return getNumberToFixed(
        new BigNumber(getTonumber(avgPriceUSDT, USDT.decimal)).div(
          getTonumber(avgPriceNEST, NEST.decimal)
        )
      );
    } catch (error) {
      return "0";
    }
  }

  async getNESTToETHPrice() {
    try {
      const { NestQuery } = this.contracts;
      const { NEST } = this.externalTokens;
      let { avgPrice } = await NestQuery.triggeredPriceInfo(NEST.address);
      // nest对ETH的价格  1/avgPrice2
      return getNumberToFixed(
        new BigNumber(1).div(getTonumber(avgPrice, NEST.decimal))
      );
    } catch (error) {
      return "0";
    }
  }

  async getDebtUserList() {
    try {
      let res = await fetch("https://robotv2.parasset.top/fee/userList");
      res = await res.json();
      return res;
    } catch (error) {
      return [];
    }
  }

  async getLiquidatedAssets() {
    try {
      let res = await fetch("https://robotv2.parasset.top/fee/totalClear");
      res = await res.json();
      // console.log("🚀 ~ file: BasisCash.ts ~ line 378 ~ BasisCash ~ getLiquidatedAssets ~ res", res)
      return res;
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 394 ~ BasisCash ~ getLiquidatedAssets ~ error",
        error
      );
      return 0;
    }
  }

  async getFundAsset(itank) {
    try {
      const {
        depositToken,
        earnToken,
        depositTokenName,
        itankContract,
        address,
      } = itank;
      let revenue = await fetch(
        "https://api.parasset.top/fee/getDailyRevenueV1"
      );
      revenue = await revenue.json();
      const { pethRevenue, pusdtRevenue } = revenue;
      revenue = depositTokenName === "ETH" ? pethRevenue : pusdtRevenue;
      revenue = $isPositiveNumber(
        $isFiniteNumber(getNumberToFixed(new BigNumber(revenue).times(365)))
      );
      // let revenue = 0;

      let depositFundBalance = 0;

      if (depositTokenName !== "ETH") {
        depositFundBalance = await this.getFundBalance(depositToken, address);
      } else {
        depositFundBalance = await this.provider.getBalance(address);
        depositFundBalance = getTonumber(depositFundBalance);
      }
      let earnFundBalance = await this.getFundBalance(earnToken, address);
      let negative = await itankContract._insNegative();

      earnFundBalance = new BigNumber(earnFundBalance)
        .minus(getTonumber(negative))
        .toNumber();

      let avgPrice = await this.getAvgPrice();

      let depositFundValue =
        itank.depositTokenName === "USDT"
          ? depositFundBalance * 1
          : new BigNumber(depositFundBalance).times(avgPrice).toNumber();
      let earnFundValue =
        itank.depositTokenName === "USDT"
          ? earnFundBalance * 1
          : new BigNumber(earnFundBalance).times(avgPrice).toNumber();
      const totalSupply = await this.getTotalSupply(itankContract);
      let totalAssets = new BigNumber(depositFundBalance).plus(earnFundBalance);
      let perShare = totalAssets.div(totalSupply).toNumber();
      perShare = !Number.isFinite(perShare) ? 1 : perShare;
      totalAssets = totalAssets.toNumber();
      return {
        depositFundBalance,
        earnFundBalance,
        depositFundValue,
        earnFundValue,
        perShare,
        totalSupply,
        totalAssets,
        avgPrice,
        revenue,
      };
    } catch (error) {
      return {
        depositFundBalance: 0,
        earnFundBalance: 0,
        depositFundValue: 0,
        earnFundValue: 0,
        perShare: 0,
        totalSupply: 0,
        totalAssets: 0,
        avgPrice: 0,
        revenue: 0,
      };
    }
  }

  async getLastDate({ itankContract }) {
    try {
      let {
        startTime: nextStartTime,
        endTime: nextEndTime,
      } = await itankContract.getRedemptionTime();

      return {
        nextStartTime: formatDate(nextStartTime.toNumber()),
        nextEndTime: formatDate(nextEndTime.toNumber()),
        nextStartTimeNum: nextStartTime.toNumber(),
        nextEndTimeNum: nextEndTime.toNumber(),
      };
    } catch (error) {}
  }

  async getRedemptionAmount(itankContract, decimal, address) {
    try {
      let amount = await itankContract.getRedemptionAmount(address);

      return getTonumber(amount, decimal);
    } catch (error) {
      return "0";
    }
  }
  async itankStake(itankContract, amount, value) {
    try {
      return await itankContract.subscribeIns(amount, {
        from: this.myAccount,
        ...value,
      });
    } catch (error) {
      return error;
    }
  }
  async itankUnstake(itankContract, amount) {
    try {
      return await itankContract.redemptionIns(amount, this.gasOptions());
    } catch (error) {
      return error;
    }
  }
  async getExchangeFee(itankContract) {
    try {
      const fee = await itankContract._feeRate();
      return fee.toNumber() / 1000;
    } catch (error) {}
  }
  async getFetchData(url) {
    try {
      let res = await fetch(url);
      let resData = await res.json();
      if (res.status === 200) {
        return resData;
      }
    } catch (error) {
      return {};
    }
  }
  getStartEndDate(value) {
    const funcList = {
      "1W": getWeekDate,
      "1M": getMonthDate,
      ALL: getAllDate,
    };
    const func = funcList[value];
    const date = func();

    return date;
  }

  async getUserOverview() {
    let { value } = await this.getFetchData(
      "https://apiv2.parasset.top/api/user/overview"
    );
    return value;
  }
  async getDebtOverview() {
    let { value } = await this.getFetchData(
      "https://apiv2.parasset.top/api/coin/debtTotal"
    );
    return value;
  }
  async getActiveUsers(activeUsersValue) {
    const date = this.getStartEndDate(activeUsersValue);
    let { value } = await this.getFetchData(
      `https://apiv2.parasset.top/api/user/active/${date.startDate}/${date.endDate}`
    );

    return value;
  }

  async getNewUsers(newUsersValue) {
    const date = this.getStartEndDate(newUsersValue);
    let { value } = await this.getFetchData(
      `https://apiv2.parasset.top/api/user/new/${date.startDate}/${date.endDate}`
    );

    return value;
  }

  async getItankTvlDatum(tvlDatumValue) {
    const date = this.getStartEndDate(tvlDatumValue);
    let { value } = await this.getFetchData(
      `https://apiv2.parasset.top/api/insPool/tvl/${date.startDate}/${date.endDate}`
    );

    return value;
  }

  async getItankFeeDatum(feeDatumValue) {
    const date = this.getStartEndDate(feeDatumValue);
    let { value } = await this.getFetchData(
      `https://apiv2.parasset.top/api/insPool/fee/${date.startDate}/${date.endDate}`
    );

    return value;
  }
  async getItankNetValueDatum(netValueDatumValue) {
    const date = this.getStartEndDate(netValueDatumValue);
    let { value } = await this.getFetchData(
      `https://apiv2.parasset.top/api/insPool/netValue/${date.startDate}/${date.endDate}`
    );

    return value;
  }
  async getCoinTvlDatum(tvlDatumValue) {
    const date = this.getStartEndDate(tvlDatumValue);
    let { value: insTvlDatum } = await this.getFetchData(
      `https://apiv2.parasset.top/api/coin/insTvl/${date.startDate}/${date.endDate}`
    );

    let { value: morTvlDatum } = await this.getFetchData(
      `https://apiv2.parasset.top/api/coin/morTvl/${date.startDate}/${date.endDate}`
    );

    return {
      insTvlDatum,
      morTvlDatum,
    };
  }

  async getDebtDatum(debtDatumValue) {
    const date = this.getStartEndDate(debtDatumValue);
    let { value: avgRateDatum } = await this.getFetchData(
      `https://apiv2.parasset.top/api/coin/avgRate/${date.startDate}/${date.endDate}`
    );
    let { value: debtDatum } = await this.getFetchData(
      `https://apiv2.parasset.top/api/coin/debtData/${date.startDate}/${date.endDate}`
    );

    return {
      avgRateDatum,
      debtDatum,
    };
  }

  async getChannelInfo(address, block) {
    try {
      const { Mine } = this.contracts;
      let info = await Mine.getChannelInfo(address);
      const endBlock = info.endBlock.toNumber();

      return {
        rewardRate: block > endBlock ? 0 : getTonumber(info.rewardRate),
        totalSupply: getTonumber(info.totalSupply),
      };
    } catch (error) {
      return "0";
    }
  }

  async getMineTvl(depositToken, address, block, itank) {
    try {
      let {
        totalSupply: stakeTotalSupply,
        rewardRate,
      } = await this.getChannelInfo(address, block);
      const totalSupply = await depositToken.totalSupply();
      const ratio = new BigNumber(stakeTotalSupply)
        .div(getTonumber(totalSupply))
        .toNumber();
      let itankInfo = await this.getFundAsset(itank);
      const totalValue = new BigNumber(itankInfo.depositFundValue).plus(
        itankInfo.earnFundValue
      );

      return {
        tvl: new BigNumber(ratio).times(totalValue).toNumber(),
        rewardRate,
      };
    } catch (error) {
      console.log(error);
      return "0";
    }
  }
  async getMineApy(tvl, rewardRate) {
    try {
      const { asetPrice } = this.config;

      return new BigNumber(rewardRate)
        .times(5760)
        .times(365)
        .times(asetPrice)
        .div(tvl)
        .times(100)
        .toNumber();
    } catch (error) {
      console.log(error);

      return "0";
    }
  }

  async stake(amount, address) {
    try {
      const { Mine } = this.contracts;
      return await Mine.stake(amount, address, this.gasOptions());
    } catch (error) {
      return error;
    }
  }

  async unstake(amount, address) {
    try {
      const { Mine } = this.contracts;

      return await Mine.withdraw(amount, address, this.gasOptions());
    } catch (error) {
      return error;
    }
  }

  async harvest(address) {
    try {
      const { Mine } = this.contracts;
      return await Mine.getReward(address, this.gasOptions());
    } catch (error) {
      return error;
    }
  }
  async exchangePTokenToUnderlying(itankContract, amount, value) {
    try {
      return await itankContract.exchangePTokenToUnderlying(amount, {
        from: this.myAccount,
        ...value,
      });
    } catch (error) {
      return error;
    }
  }

  async exchangeUnderlyingToPToken(itankContract, amount, value) {
    try {
      return await itankContract.exchangeUnderlyingToPToken(amount, {
        from: this.myAccount,
        ...value,
      });
    } catch (error) {
      return error;
    }
  }

  async coin(mortgagePoolContract, mortgageToken, amount, ratio, value) {
    console.log(this.gasETHAddress(mortgageToken), amount, ratio, value);
    try {
      return await mortgagePoolContract.coin(
        this.gasETHAddress(mortgageToken),
        amount,
        ratio,
        {
          value,
          from: this.myAccount,
        }
      );
    } catch (error) {
      return error;
    }
  }
  async liquidation(
    mortgagePoolContract,
    mortgageToken,
    amount,
    account,
    value
  ) {
    console.log(this.gasETHAddress(mortgageToken), account, amount, value);
    try {
      return await mortgagePoolContract.liquidation(
        this.gasETHAddress(mortgageToken),
        account,
        amount,
        "1000000000000000000000000000",
        {
          value,
          from: this.myAccount,
        }
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: BasisCash.ts ~ line 741 ~ BasisCash ~ error",
        error
      );
      return error;
    }
  }

  async handlerDebt(
    mortgagePoolContract,
    mortgageToken,
    amount,
    select,
    value
  ) {
    const funcList = {
      Stake: "supplement",
      Redeem: "decrease",
      Mint: "increaseCoinage",
      Repay: "reducedCoinage",
    };
    const func = funcList[select];
    try {
      const address = this.gasETHAddress(mortgageToken);
      return await mortgagePoolContract[func](address, amount, {
        value,
        from: this.myAccount,
      });
    } catch (error) {
      return error;
    }
  }
}
