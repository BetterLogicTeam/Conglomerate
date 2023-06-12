import React from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../hooks/connectors";
import { DEFAULT_CHAIN, trimAddress } from "../hooks/constant";
import useEagerConnect from "../hooks/useWeb3";
import localStorage from "local-storage";
import { supportNetwork } from "../hooks/network";
import mask from "../assets/MetaMask_Fox 1.svg";
import tw from "../assets/tw.png";
import wallet_connect from '../assets/wallet_connect.svg'
import { connectWalletAction } from "../store/actions/login";
import { useDispatch } from "react-redux";
export const Connect = function ({ hideModal }) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <button
        type="button"
        className="mx-auto mb-8 mr-2 md:mr-0 lg:mr-0 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-black text-white"
        onClick={()=>(dispatch(connectWalletAction(2)),hideModal())}
     >
        <img
          style={{
            width: "30px",
            height: "30px",
          }}
          src={mask}
          alt="Metamsk"
        />
        <span className="text-15">Metamask</span>
      </button>

      <button
        type="button"
        className="mx-auto mb-8 mr-2 md:mr-0 lg:mr-0 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-black text-white"
        onClick={()=>(dispatch(connectWalletAction(1)),hideModal())}
     >
        <img
          style={{
            width: "30px",
            height: "30px",
          }}
          src={wallet_connect}
          alt="WalletConnect"
        />
        <span className="text-15">{"WalletConnect"}</span>
      </button>
    </React.Fragment>
  );
};

export default Connect;
