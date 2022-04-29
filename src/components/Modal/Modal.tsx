//@ts-nocheck
import React from "react";
import styled from "styled-components";

import Card from "../Card";
import CardContent from "../CardContent";
import Container from "../Container";
export interface ModalProps {
  isOpen?: boolean;
  topClassName?: string;
  className?: string;
  children: any;
  onDismiss: () => void;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onDismiss,
  children,
    topClassName,
  className,
  width,
  showHeader = false,
  title
}) => {
  return (
    <>
      {isOpen && (
        <StyledModalWrapper className={topClassName} >
          <StyledModalBackdrop onClick={onDismiss} />

          <StyledModal className={className} width={width}>
            {showHeader ? (
              <StyledModalHeader className="flex-jc-center bd-bottom popup_header">
                <div className={`popup_title fz0`}>
                  <img className={`dib`} src={require("../../assets/images/img_line.png")} />
                  <h3 className={`dib`}>{title}</h3>
                </div>
                <CloseIcon
                  className="cursor-pointer"
                  src={require("../../assets/img/icon_close.png")}
                  width="15"
                  height="15"
                  onClick={onDismiss}
                />
              </StyledModalHeader>
            ) : null}

            {children}
          </StyledModal>
        </StyledModalWrapper>
      )}
    </>
  );
};

const StyledModal = styled.div`
  border-radius: 12px;
  background-color: #fff;
  position: relative;
  width: ${({ width }) => (width ? width : "400px")};
  max-width: 400px;
  min-width: 300px;
  padding: 20px 15px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 85%!important;
  }
`;
const StyledModalWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`;
const CloseIcon = styled.img``;

const StyledModalBackdrop = styled.div`
  background-color: #00000088;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
const StyledModalHeader = styled.div`
  margin-top: -20px;
`;
export default Modal;
