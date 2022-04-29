import React from "react";
import styled from "styled-components";
import PETH from "../../assets/img/PETH.png";
import ASET from "../../assets/img/ASET.png";
import NEST from "../../assets/img/NEST.png";
import ETH from "../../assets/img/ETH.png";
import USDT from "../../assets/img/USDT.png";
import PUSD from "../../assets/img/PUSD.png";

const logosBySymbol: { [title: string]: string } = {
  PETH,
  ASET,
  NEST,
  ETH,
  USDT,
  PUSD,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
  className?: string;
  isRight?: boolean;
};

const TokenSymbol: React.FC<BasisLogoProps> = ({
  symbol,
  className,
  size = 35,
  isRight = false,
}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  return (
    <StyledImg
      className={`${className} ${isRight ? "margin-left-minus-10" : ""}`}
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  );
};

const StyledImg = styled.img``;

export default TokenSymbol;
