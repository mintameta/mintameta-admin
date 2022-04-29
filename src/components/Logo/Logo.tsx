import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/Parasset.svg";
import useIsMobile from "../../hooks/useIsMobile";
const Logo: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <StyledLogo
      className={` ${isMobile ? "" : "bd-bottom"} flex-row-center-center`}
    >
      <StyledLogoImg src={logo} />
    </StyledLogo>
  );
};
const StyledLogo = styled.div`
  height: 90px;
  @media (max-width: 768px) {
   height: auto;
  }
`;

const StyledLogoImg = styled.img`
  width: 148px;
  height: 44px;
  @media (max-width: 768px) {
    width: 98px;
    height: 29px;
  }
`;

export default Logo;
