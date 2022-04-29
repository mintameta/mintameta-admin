//@ts-nocheck
import React from "react";
import styled from "styled-components";
export interface CardProps {
  className?: string;
  children?: any;
}
const Card: React.FC<CardProps> = ({ className, children,onClick }) => (
  <StyledCard className={`wing-blank ${className}`} onClick={onClick}>{children}</StyledCard>
);

const StyledCard = styled.div`
  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]};
  padding:10px 30px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.grey[200]};
`;

export default Card;
