import React, { useRef, useContext, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../../hooks/useIsMobile";
import styled from "styled-components";
const Lang: React.FC = () => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
  const changeLanguage = useCallback(
    (lang) => {
      //console.log(lang, "lang");
      localStorage.setItem("lang", lang);
      i18n.changeLanguage(lang);
    },
    [i18n.language]
  );
  return (
    <div className="wing-blank-lg ">
      <StyledLang className={` ${isMobile ? "" : "width-100"} `}>
        <div className="space-white-lg"></div>
        <div
          className={`wing-blank  ${
            isMobile ? "flex-row-center-center" : "flex-jc-start  flex-wrap"
          } `}
        >
          <div
            className={`${
              i18n.language === "en" ? "" : "opacity-6"
            } flex-row-center-center cursor-pointer ${isMobile ? "" : ""} `}
          >
            <img
              src={require("../../../assets/img/EN.png")}
              width="30"
              height="30"
              onClick={() => {
                changeLanguage("en");
              }}
            />
          </div>
          <div
            className={`${
              i18n.language === "zh" ? "" : "opacity-6"
            } flex-row-center-center cursor-pointer   ${isMobile ? "" : " "} `}
          >
            <img
              src={require("../../../assets/img/CN.png")}
              width="30"
              height="30"
              onClick={() => {
                changeLanguage("zh");
              }}
            />
          </div>
        </div>
        <div className="space-white-lg"></div>
      </StyledLang>
    </div>
  );
};

const StyledLang = styled.div`
  @media (min-width: 1024px) {
    position: absolute;
    bottom: 10px;
    left: 0;
    box-sizing: border-box;
    padding-left: 20px;
    border-top: 1px solid rgba(238, 238, 238, 0.6);
    img {
      margin-right: 15px;
    }
  }
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    border-top: 1px solid rgba(238, 238, 238, 0.6);
    img {
      margin-right: 10px;
    }
  }
`;
export default Lang;
