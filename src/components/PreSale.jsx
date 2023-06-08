import React, { useState, useEffect } from "react";
import Connect from "./Connect";
import Countdown, { zeroPad } from "react-countdown";
import { ENDTIME, formatPrice, GOAL } from "../hooks/constant";
import { DEFAULT_CHAIN, trimAddress } from "../hooks/constant";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../hooks/connectors";
export default function PreSale(props) {
  const [updater, setUpdater] = useState(1);
  const [data, setDate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const context = useWeb3React();
  const { connector, account, deactivate, active, error, activate } = context;
  const fetchDate = async () => {
    setLoading(true);
    const response = await fetch(
      "https://presale-backend-nine.vercel.app/api/getEndDate"
    );

    const json = await response.json();
    // setDate(json?.endDate?.endDate);
    setLoading(false);
  };
  async function fetchVal() {
    try {
      const response = await fetch(
        "https://presale-backend-nine.vercel.app/api/getSliderVal"
      );
      const json = await response.json();
      console.log("json...", json?.value);
      setDate(json?.value);
      setUpdater(json?.value?.sliderValue);
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  let { commonStats } = props;
  const countdownrender = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <>00 Days 00 Hours 00 Min 00 Sec</>;
    } else {
      // Render a countdown
      return (
        <>
          {zeroPad(days, 2)} Days {zeroPad(hours, 2)} Hours{" "}
          {zeroPad(minutes, 2)} Min {zeroPad(seconds, 2)} Sec
        </>
      );
    }
  };

  useEffect(() => {
    fetchDate();
    fetchVal();
  }, []);
  console.log("Data...", data);

  const handleModal = () => {
    setModal(true);
  };
  const hideModal = () => {
    setModal(false);
  };
  const connected = (connection) => connection === connector;
  return (
    <div>
      <h3 className="pb-4 text-center text-24 text-white">Join the Pre Sale</h3>
      <p className="pb-[14px] text-center text-white text-12.5">
        14 March, 2023 To April 16, 2023
      </p>
      <p className="pb-[14px] text-white text-center text-12.5">
        Sale Ending In:
        {loading ? (
          <Countdown
            key={Math.floor(Math.random() * 10 + 1)}
            date={ENDTIME}
            renderer={countdownrender}
          />
        ) : (
          <Countdown
            key={Math.floor(Math.random() * 10 + 1)}
            date={data?.endDate}
            renderer={countdownrender}
          />
        )}
      </p>

      <div className="mb-[17px] h-4 w-full overflow-hidden rounded-full bg-[#E8E8E8]">
        <div
          className={`h-full bg-white`}
          style={{
            width: `${updater}`,
          }}
        ></div>
      </div>
      <div className="flex items-center justify-between pb-6">
        <p className="text-13.5 text-white">
          Raised: {data?.raisedValue ? formatPrice(data?.raisedValue) : 0} {""}
          USD
          {/* {commonStats.totalRaised ? formatPrice(commonStats.totalRaised) : 0}{" "} */}
        </p>
        <p className="text-13.5 text-white">
          Goal: {data?.goal ? formatPrice(data?.goal) : "0"} USD
        </p>
      </div>
      <div id="myModal" class={!account && modal ? "modal" : "modal-hide"}>
        <div class="modal-content flex flex-col justify-center  md:block w-[90%] md:w-[40%] md:h-[40%]">
          <span class="close" onClick={hideModal}>
            &times;
          </span>
          <h2>Connect Your Wallet</h2>
          <p>Please select a wallet provider:</p>
          <div class="buttons md:ml-[-20px] md:mr-10">
            <Connect id="1" />
            <Connect id="2" />
          </div>
        </div>
      </div>
      {active && connected(injected) ? (
        <button className="mx-auto mb-8 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-white text-black">
          <span className="text-15">{account && trimAddress(account)}</span>
        </button>
      ) : (
        <button className="mx-auto mb-8 flex h-[44px] w-[174px] items-center justify-center gap-2 rounded-lg bg-white text-black">
          <span className="text-15" onClick={handleModal}>
            Connect Wallet
          </span>
        </button>
      )}

      <div className="flex items-center justify-between pb-4">
        <p className="text-15 text-white">Sale Supply</p>
        <p className="text-15 text-white">Price per Token</p>
      </div>

      <div className="flex items-center justify-between pb-8">
        <p className="text-15 font-bold text-white">
          {data?.saleSupply ? formatPrice(data?.saleSupply) : "0"} CONG
        </p>
        <p className="text-15 font-bold text-white">
          {data?.pricePerToken
            ? parseFloat(parseFloat(data?.pricePerToken).toFixed(8))
            : "-"}{" "}
          USDT
          {/* {commonStats.salePrice
            ? parseFloat(parseFloat(commonStats.salePrice).toFixed(8))
            : "-"}{" "} */}
        </p>
      </div>
    </div>
  );
}
