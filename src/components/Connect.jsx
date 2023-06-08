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
export const Connect = function ({ id }) {
  const context = useWeb3React();
  const { connector, account, deactivate, active, error, activate } = context;

  useEffect(() => {
    if (account) {
      localStorage.set("address", account);
    }
  }, [account]);

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEagerConnect();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  function getErrorMessage(error) {
    if (error instanceof NoEthereumProviderError) {
      const dappUrl = window.location.origin; // TODO enter your dapp URL.
      let metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
      window.open(metamaskAppDeepLink);
    }
    if (error instanceof UnsupportedChainIdError) {
      return (
        <span
          className="btn-text"
          onClick={(e) => switchNetwork(supportNetwork[DEFAULT_CHAIN].chainId)}
        >
          Switch Network
        </span>
      );
    }

    deactivate(injected);
  }

  const activating = (connection) => connection === activatingConnector;
  const connected = (connection) => connection === connector;

  const switchNetwork = (networkid) => {
    try {
      // @ts-ignore
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${networkid.toString(16)}` }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <button
          type="button"
          className="mx-auto mb-8 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-black text-white"
          onClick={() => {
            setActivatingConnector();
          }}
        >
          <img
            style={{
              width: "30px",
              height: "30px",
            }}
            src={id == 1 ? mask : tw}
            alt={id == 1 ? "Metamsk" : "Trust Wallet"}
          />
          <span className="text-15">{getErrorMessage(error)}</span>
        </button>
      )}
      {!error && (
        <>
          {active && connected(injected) && (
            <button
              type="button"
              className="mx-auto mb-8 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-black text-white"
              onClick={() => {
                localStorage.remove("address");
                deactivate();
              }}
            >
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src={id == 1 ? mask : tw}
                alt={id == 1 ? "Metamsk" : "Trust Wallet"}
              />
              <span className="text-15">{"Connected"}</span>
            </button>
          )}
          {!active && !connected(injected) && (
            <button
              type="button"
              className="mx-auto mb-8 mr-2 md:mr-0 lg:mr-0 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-black text-white"
              onClick={() => activate(injected)}
            >
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                src={id == 1 ? mask : tw}
                alt={id == 1 ? "Metamsk" : "Trust Wallet"}
              />
              {activating(injected) ? (
                <span className="text-15">Connecting...</span>
              ) : (
                <span className="text-15">
                  {id == 1 ? "Metamask" : "Trust wallet"}
                </span>
              )}
            </button>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default Connect;
