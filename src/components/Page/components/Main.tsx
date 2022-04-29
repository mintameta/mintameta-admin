//@ts-nocheck
import React, { useMemo } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "./Header";
const Main: React.FC = ({ children }) => {
  return (
      <>
          <Header />
          {children}
      </>
  );
};
export default Main;
