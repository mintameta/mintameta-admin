//@ts-nocheck
import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { UseWalletProvider } from "use-wallet";
import MinesProvider from "./contexts/Mines";
import ItanksProvider from "./contexts/ITanks";
import DebtsProvider from "./contexts/Debts";
import BasisCashProvider from "./contexts/BasisCashProvider";
import Page from "./components/Page";
import GraphProvider from "./GraphProvider"

import store from "./state";
import theme from "./theme";
// import Updaters from "./state/Updaters";
import StatusModal from "./components/StatusModal";
import { RouterConfig } from "./router";
import Admin from './views/Admin'

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Page>
                {/*<Redirect path={`/`} to={`/admin`} />*/}
                <Route path={`/`} exact={true} component={Admin} />
                {
                    RouterConfig.map((item,index)=>{
                        return (
                            <Route key={index} path={item.path} exact={item.exact} component={item.component} />
                            )
                    })
                }

          </Page>
        </Switch>
        <StatusModal />
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {/*<UseWalletProvider*/}
      {/*  chainId={configAll.chainId}*/}
      {/*  connectors={{*/}
      {/*    walletconnect: { rpcUrl: configAll.defaultProvider },*/}
      {/*  }}*/}
      {/*>*/}
        <Provider store={store}>
            <GraphProvider>
                {/*<BasisCashProvider>*/}
                      {/*<Updaters />*/}
                        <>{children}</>
                {/*</BasisCashProvider>*/}
            </GraphProvider>
        </Provider>
      {/*</UseWalletProvider>*/}
    </ThemeProvider>
  );
};

export default App;
