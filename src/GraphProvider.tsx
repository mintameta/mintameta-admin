//@ts-nocheck
import React, {useEffect, useState} from "react";

import useConfigCommon from "./tools/configCommon";
import useStore from "./tools/store";
import ApolloClient, {gql} from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
// import {infts} from './tools/query';

// client.query({query:infts}).then(result=>console.log('client',result))

const GraphProvider: React.FC = ({ children }) => {
    const {getStore,setStore} = useStore()
    const configAll = useConfigCommon()
    const [client,setClient] = useState(new ApolloClient ({
        uri: configAll.graphAddr,
    }))
    useEffect(()=>{
        // console.log('configAll.graphAddr',configAll.chainId)
        setClient(new ApolloClient ({
            uri: configAll.graphAddr,
        }))
    },[configAll])
  return (
      <ApolloProvider client = {client}>
          {children}
      </ApolloProvider>
  );
};
export default GraphProvider;
