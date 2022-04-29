//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import TokenSymbol from "../TokenSymbol";
const Select: React.FC = ({
  showSelect,
  list,
  active,
  toggleShow,
  onChangeSelect,
}) => {
  const selectItem = useMemo(() => {
    let item = list.filter((item) => {
      return item.id === active;
    });
    return item[0];
  }, [list, active]);

  return (
    <>
      <div className="wing-blank">
        {showSelect ? (
          <StyledSelectBox
            className="form-select-content  "
            onClick={(e) => {
              e.stopPropagation();

              toggleShow();
            }}
          >
            {list.map((item, i) => {
              return (
                <StyledSelectItem
                  className={`flex-jc-center  wing-blank-lg cursor-pointer ${
                    item.id === active ? "active" : ""
                  } `}
                  key={item.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeSelect(item);
                    toggleShow();
                  }}
                >
                  <StyledSelectItemBox className=" flex-jc-center width-100">
                    <TokenSymbol size={25} symbol={item.name} />
                    <span className="font-size-12"> {item.name}</span>
                  </StyledSelectItemBox>
                </StyledSelectItem>
              );
            })}
          </StyledSelectBox>
        ) : null}
      </div>
    </>
  );
};

const StyledSelectBox = styled.div`
  position: absolute;
  width: 100px;
  left: 0;
  border-radius: 10px;
  padding: 5px 0;
  top: 120%;
  z-index: 99;
  background: #fff;

  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]};
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledSelectItem = styled.div`
  height: 35px;
`;
const StyledSelectItemBox = styled.div`
  @media (max-width: 768px) {
    justify-content: flex-start!important;
    img {
      margin-right: 5px;
    }
  }
`;

export default Select;
