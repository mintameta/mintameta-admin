import React, { useRef, useContext, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../../hooks/useIsMobile";
import styled from "styled-components";
import useStore from "../../../tools/store";

const Lang: React.FC = () => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
    const {getStore,setStore} = useStore()
  const changeLanguage = useCallback(
    (lang) => {
      //console.log(lang, "lang");
      localStorage.setItem("lang", lang);
      i18n.changeLanguage(lang);
    },
    [i18n.language]
  );
  return (
      <>
          <div className='lang fz0'>
              <div className='padd'>
                  <img className='dib cp' src={require("../../../assets/images/EN.png")}
                       onClick={() => {
                           changeLanguage("en");
                           setStore('leftMobileShow',false)
                       }}
                  />
                  <img className='dib cp' src={require("../../../assets/images/CN.png")}
                      onClick={() => {
                          changeLanguage("zh");
                          setStore('leftMobileShow',false)
                      }}
                  />
              </div>
          </div>
      </>
  );
};

export default Lang;
