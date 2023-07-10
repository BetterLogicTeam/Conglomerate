import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import {  Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import Web3 from 'web3';

const chains = [bsc];
const projectId = "ae64d2d938316ce3350fea4c10f6cc79";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const web3 = new Web3(publicClient);
console.log("web3web3",web3);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
// console.log("publicClient",wagmiConfig);

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 60000;
  return library;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Web3ReactProvider getLibrary={getLibrary} >
      <BrowserRouter>
        <Provider store={store}>
          <WagmiConfig config={wagmiConfig}>
            <App />
          </WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </Provider>
      </BrowserRouter>
    </Web3ReactProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
