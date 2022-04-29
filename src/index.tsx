//@ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import "./index.css";
import "antd/dist/antd.css";
import "./assets/css/antd_rest.css";
import "./assets/css/style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// window.console.log=()=>{}
//
ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
