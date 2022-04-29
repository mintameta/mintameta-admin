//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
export interface CardProps {
  className?: string;
  children?: any;
  onClick?: any;
}
const CardButton: React.FC<CardProps> = ({
  children,
  className = "text-center  flex-row-center-center ",
  size,
  onClick,
  height,
}) => (
  <>
    <StyledButton
      className={`wing-blank ${className}`}
      onClick={onClick}
      style={{ height: height || "auto" }}
    >
      {size === "lg" ? <Spacer size="sm" /> : null}
      {children}
      {size === "lg" ? <Spacer size="sm" /> : null}
    </StyledButton>
  </>
);

const StyledButton = styled.div`
  /* box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]}; */
  border: 1px solid #eeeeee;
  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]} inset;
  border-radius: 999999px;
  min-height: 40px;
`;

export default CardButton;
