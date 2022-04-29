//@ts-nocheck
import React from "react";
import Toast from "light-toast";
import useCopyClipboard from "../../hooks/useCopyClipboard";
import { useTranslation } from "react-i18next";
import {
    CopyOutlined
} from '@ant-design/icons';

export default function CopyHelper({toCopy,color,font=13,children}) {
  const [isCopied, setCopied] = useCopyClipboard();
  const { t } = useTranslation();
  return (
      <button className={`dib fz0`}
              onClick={() => {
                  setCopied(toCopy)
                  Toast.info(t('h_item13'))
              }}
      >
          <span className={'dib'} style={{color: color,fontSize: font}}>
            <CopyOutlined />
          </span>
          {children}
      </button>
  );
}
