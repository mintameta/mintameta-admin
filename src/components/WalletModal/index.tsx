//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Button from "../Button";
import CardButton from "../CardButton";
import TokenSymbol from "../TokenSymbol";
import Copy from "../Copy";
import Value from "../Value";
import configAll from "../../tools/config";
import useBasisCash from "./../../hooks/useBasisCash";
import useTokenBalance from "./../../hooks/useTokenBalance";
import useEncryptAddress from "./../../hooks/useEncryptAddress";
import Toast from "light-toast";
export default function WalletModal({ isOpen, onDismiss }) {
  const { t } = useTranslation();
  const { account, connect, connector, status, reset } = useWallet();
  const [backWallet, setBackWallet] = useState(false);
  const newAccount = useEncryptAddress(account);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={onDismiss}
        width="330px"
        showHeader={true}
        title={status !== "connected" || backWallet ? t("h_item15") : t("h_item19")}
      >
        {status !== "connected" || backWallet ? (
          <>
            <Spacer size="mmd" />
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("injected");
                onDismiss();
              }}
            >
              <div className="flex-jc-start width-100  bold-600 font-size-16">
                <img
                  src={require("../../assets/images/metamask.png")}
                  width="35"
                  height="35"
                  className="margin-right-10"
                />
                MetaMask
              </div>
            </CardButton>
            <Spacer size="mmd" />
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("walletconnect");
                onDismiss();
              }}
            >
              <div className="flex-jc-start width-100  bold-600 font-size-16">
                <img
                  src={require("../../assets/images/walletconnect.png")}
                  width="35"
                  height="35"
                  className="margin-right-10"
                />
                WalletConnect
              </div>
            </CardButton>
          </>
        ) : (
          <>
            <div >
              <Spacer size="mmd" />
              <div className="flex-jc-center">
                <div className="flex-jc-start  bold-600 font-size-16">
                  {/* injected  */}
                  <img
                    src={
                      connector === "injected"
                        ? require("../../assets/img/metamask.png")
                        : require("../../assets/img/walletconnect.png")
                    }
                    width="25"
                    height="25"
                    className="margin-right-10"
                  />
                  {connector === "injected" ? "MetaMask" : "WalletConnect"}
                </div>
                <div className="flex-jc-end ">
                  <Button
                    variant="secondary"
                    text={t("h_item20")}
                    width="60px"
                    className="margin-right-10"
                    onClick={() => {
                      setBackWallet(true);
                    }}
                  />
                  <Button
                    variant="tertiary"
                    text={t("h_item21")}
                    width="60px"
                    onClick={reset}
                  />
                </div>
              </div>
              <Spacer size="mmd" />
              <div className="flex-jc-start">
                <img
                  src={require("../../assets/img/account_icon.png")}
                  width="25"
                  height="25"
                  className="margin-right-10"
                />

                <span className=" bold-600 font-size-16">{newAccount}</span>


              </div>
              <Spacer size="mmd" />
              <div className="flex-jc-start fz0">
                <Copy toCopy={account}/>
                <button className={`dib fz0`}>
                  <a
                      className="color-light-blue"
                      href={`${configAll.etherscanUrl}/${account}`}
                      target={`_blank`}
                  >
                    <img
                        src={require("../../assets/img/etherscan_icon.png")}
                        width="25"
                        height="25"
                        className="margin-right-10 dib"
                    />
                    <span className={`dib`}>在浏览器上查看</span>
                  </a>
                </button>
              </div>
              <Spacer size="mmd" />
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
