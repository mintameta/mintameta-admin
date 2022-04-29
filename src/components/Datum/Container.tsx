//@ts-nocheck
import React from "react";
import Spacer from "../Spacer";
import Card from "../Card";
import styled from "styled-components";
const Container: React.FC = ({ title, children }) => (
  <>
    <StyledContainer>
      <Spacer size="sm" />
      <div className="color-dark  bold-600 font-size-16">{title}</div>
      <Spacer size="sm" />
      <Spacer size="sm" />
      {children}
    </StyledContainer>
    <Spacer size="mmd" />
  </>
);

const StyledContainer = styled(Card)`
  padding-bottom: 16px;
  @media (max-width: 768px) {
    padding: 10px 16px;
    padding-bottom: 16px;
  }
`;
export default Container;
