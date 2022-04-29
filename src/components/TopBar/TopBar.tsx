import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Nav from "./components/Nav";
import { useTranslation } from "react-i18next";
const TopBar: React.FC = () => {
  return (
    <>
      <Nav />
    </>
  );
};

export default TopBar;
