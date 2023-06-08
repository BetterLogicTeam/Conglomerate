import React, { useState, useEffect } from "react";
import About from "./About";
import Program from "./Program";
import PreSale from "./PreSale";
import BuyNow from "./BuyNow";
import Brand from "./Brand";
import { useAccountStats, useCommonStats } from "../stats/useStats";
import Admin from "./Admin";

export default function Home() {
  const [updater, setUpdater] = useState(1);
  const accStats = useAccountStats(updater);
  const commonStats = useCommonStats(updater);

  return (
    <>
      <main className="container grid grid-cols-1 sm:gap-4 lg:gap-20 pt-[97px] sm:grid-cols-12 lg:grid-cols-11">
        <div className="col-span-1 order-2 lg:order-1 sm:col-span-6 lg:col-span-7">
          <About />
          <Brand />
          <Program />
        </div>
        <div className="col-span-1 order-1 rounded-lg bg-black p-5 lg:p-10 sm:col-span-6 lg:col-span-4">
          <PreSale
            accStats={accStats}
            commonStats={commonStats}
            setUpdater={setUpdater}
            />
    <div className="buy_Now py-8 px-8 border-2 w-auto border-white-600">
          <BuyNow
            commonStats={commonStats}
            accStats={accStats}
            setUpdater={setUpdater}
          />
          </div>
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
