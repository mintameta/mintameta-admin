//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Card from "../Card";
import { useTranslation } from "react-i18next";
const Tab: React.FC = ({ tabs, tab, onChangeTab }) => {
  const { t } = useTranslation();
  return (
    <StyledTab className="flex-jc-center text-center">
      {tabs.map((item) => {
        return (
          <StyledTabItem
            key={item.id}
            className={`${item.id === tab ? "active" : ""} flex1`}
            onClick={() => {
              onChangeTab(item.id);
            }}
          >
            <span className=" cursor-pointer color-grey">{t(item.text)}</span>
          </StyledTabItem>
        );
      })}
    </StyledTab>
  );
};

const StyledTab = styled(Card)`
  height: 50px;
`;
const StyledTabItem = styled.div`
  &.active span {
    color: ${(props) => props.theme.color.primary.main}!important;
    box-sizing: border-box;
    font-weight: 600;
  }
`;
export default Tab;
