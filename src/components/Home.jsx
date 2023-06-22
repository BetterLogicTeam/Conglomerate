import React, { useState, useEffect } from "react";
import About from "./About";
import Program from "./Program";
import PreSale from "./PreSale";
import BuyNow from "./BuyNow";
import Brand from "./Brand";
import Connect from "./Connect";
import { useAccountStats, useCommonStats } from "../stats/useStats";
import Admin from "./Admin";
import { DEFAULT_CHAIN, trimAddress } from "../hooks/constant";
import { useSelector } from "react-redux";

export default function Home() {
  const [updater, setUpdater] = useState(1);
  const accStats = useAccountStats(updater);
  const [modal, setModal] = useState(false);

  const commonStats = useCommonStats(updater);
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );

  const handleModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };
  return (
    <>
      <main className="container grid grid-cols-1 sm:gap-4 lg:gap-20 pt-[97px] md:grid-cols-12  lg:grid-cols-11">
        <div className="col-span-1 flex flex-col sm:col-span-6 lg:col-span-7">
          <About className=""/>
          {/* <Brand /> */}
        </div>
        <div id="buy_now" className="col-span-1 rounded-lg paddng_res p-5 lg:p-10 sm:col-span-6 lg:col-span-4  main_div_buy">
          <div id="myModal" class={!acc && modal ? "modal" : "modal-hide"}>
            <div class="modal-content flex flex-col justify-center  md:block w-[90%] md:w-[40%] md:h-[40%]">
              <span class="close" onClick={hideModal}>
                &times;
              </span>
              <h2>Connect Your Wallet</h2>
              <p>Please select a wallet provider:</p>
              <div class="buttons md:ml-[-20px] md:mr-10">
                <Connect id="1" hideModal={hideModal} />
              </div>
            </div>
          </div>
          {acc != null ? (
            <button className="mx-auto mb-8 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-white text-black">
              <span className="text-15">{acc && trimAddress(acc)}</span>
            </button>
          ) : (
            <button className="mx-auto mt-12 mb-8 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-white text-black">
              <span className="text-15" onClick={handleModal}>
                Connect Wallet
              </span>
            </button>
          )}
          <div className="buy_Now py-8 px-8 border-2 lg:w-[400px] md:w-auto  border-white-600  ">
            <PreSale
              accStats={accStats}
              commonStats={commonStats}
              setUpdater={setUpdater}
            />
            <BuyNow
              commonStats={commonStats}
              accStats={accStats}
              setUpdater={setUpdater}
            />
          </div>
        </div>

        <div className="col-span-1 referrl_mrgn flex flex-col justify-center sm:col-span-6 lg:col-span-7">
          <Program />
        </div>
      </main>
      {accStats.isOwner && (
        <div className="container">
          <Admin />
        </div>
      )}
    </>
  );
}
