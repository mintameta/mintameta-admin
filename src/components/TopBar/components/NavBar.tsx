//@ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spacer from "../../Spacer";
import useIsMobile from "../../../hooks/useIsMobile";
let flag=true
const Nav: React.FC = ({ toggleShow }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState({
      status: false,
      name: null,
      list: [],
      obj: {
          1: {name: 'title 1',icon: '123'},
          2: {name: 'title 2',icon: '456'}
      }
  });
    useEffect(() => {
        setTimeout(()=>{
            setData({...data,status: true})
            //console.log("data22",data)
        },2000)
        return () => {
            //console.log("data33",data)
        }
    }, [])
    useEffect(() => {
        // 相当于 componentDidMount
        //console.log("data11",data)
    })
  useEffect(() => {
    if (pathname.includes("/datum")&&flag) {
      setShowMenu(true);
      flag=false
    }
  }, [pathname, showMenu]);
  return (
    <div className="wing-blank-lg font-size-16">
        <div className={` abctd ${data.status ? "hide" : ""} `} style={{color: "red"}}>
            <p>测试1111</p>
        </div>
      <div className={` ${isMobile ? "" : "bd-bottom width-100"} `}>
        <div className="wing-blank">
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/"
            onClick={toggleShow}
          >
            <img
              src={
                pathname === "/"
                  ? require("../../../assets/img/home_icon1.png")
                  : require("../../../assets/img/home_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("shouye")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/coin"
            onClick={toggleShow}
            isActive={(match, { pathname }) => {
              return (
                (pathname.includes("/coin") ||
                  pathname.includes("/debt/detail")) &&
                !pathname.includes("/datum")
              );
            }}
          >
            <img
              src={
                (pathname.includes("/coin") ||
                  pathname.includes("/debt/detail")) &&
                !pathname.includes("/datum")
                  ? require("../../../assets/img/coin_icon1.png")
                  : require("../../../assets/img/coin_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("zhubi")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/exchange"
            onClick={toggleShow}
          >
            <img
              src={
                pathname.includes("/exchange")
                  ? require("../../../assets/img/exchange_icon1.png")
                  : require("../../../assets/img/exchange_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("duihuan")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/itank"
            isActive={(match, { pathname }) => {
              return (
                pathname.includes("/itank") && !pathname.includes("/datum")
              );
            }}
            onClick={toggleShow}
          >
            <img
              src={
                pathname.includes("/itank") && !pathname.includes("/datum")
                  ? require("../../../assets/img/pool_icon1.png")
                  : require("../../../assets/img/pool_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("bxc")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start "
            exact
            activeClassName="active"
            to="/mine"
            isActive={(match, { pathname }) => {
              return pathname.includes("/mine");
            }}
            onClick={toggleShow}
          >
            <img
              src={
                pathname.includes("/mine")
                  ? require("../../../assets/img/mine_icon1.png")
                  : require("../../../assets/img/mine_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("wakuang")}
          </StyledBarItem>


          <StyledBarItem
            className="flex-jc-start "
            exact
            activeClassName="active"
            to="/liquidation"

            onClick={toggleShow}
          >
            <img
              src={
                pathname.includes("/liquidation")
                  ? require("../../../assets/img/liquidation_icon1.png")
                  : require("../../../assets/img/liquidation_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("qingsuan")}
          </StyledBarItem>



        </div>
      </div>
      <div className={` ${isMobile ? "" : "bd-bottom width-100"} `}>
        <div className="wing-blank">
          <StyledBarItem
            className="flex-jc-center cursor-pointer"
            as="div"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <div className="flex-jc-center">
              <img
                src={require("../../../assets/img/icon_datum.png")}
                width="35"
                height="35"
                className="margin-right-5"
              />
               {t("shuju")}
            </div>

            <img
              src={
                showMenu
                  ? require("../../../assets/img/icon_arrow_top.png")
                  : require("../../../assets/img/arrow_bottom_icon.png")
              }
              width="8"
              height="5"
              className="margin-left-10"
            />
          </StyledBarItem>
          {showMenu ? (
            <>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/overview"
                onClick={toggleShow}
              >
                {t("gailan")}
              </StyledMenuItem>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/coin"
                onClick={toggleShow}
              >
                  {t("zhubi")}
              </StyledMenuItem>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/itank"
                onClick={toggleShow}
              >
                  {t("bxc")}
              </StyledMenuItem>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/user"
                onClick={toggleShow}
              >
                {t("yonghu")}
              </StyledMenuItem>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const StyledBarItem = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[300]};
  padding-top: 10px;
  &.active {
    color: ${(props) => props.theme.color.primary.main}!important;
    box-sizing: border-box;
    font-weight: 600;
  }
  &:last-child {
    padding-bottom: 10px;
  }
`;
const StyledMenuItem = styled(StyledBarItem)`
  padding-left: 40px;
  box-sizing: border-box;
`;

export default Nav;
