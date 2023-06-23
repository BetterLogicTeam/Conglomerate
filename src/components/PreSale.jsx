import React, { useState, useEffect } from "react";
import Connect from "./Connect";
import Countdown, { zeroPad } from "react-countdown";
import { ENDTIME, formatPrice, GOAL } from "../hooks/constant";
import { DEFAULT_CHAIN, trimAddress } from "../hooks/constant";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import arrow from "../assets/whitearr.png"
import { injected } from "../hooks/connectors";
import { useSelector } from "react-redux";
import Web3 from "web3";
import {
  BUSD_ABI,
  BUSD_Address,
  USDC_ABI,
  USDC_Address,
  USDT_ABI,
  USDT_Address,
  presale_Address,
} from "../utilies/constant";
export default function PreSale(props) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const webSupply = new Web3("https://bsc-testnet.publicnode.com");
  const [updater, setUpdater] = useState(0);
  const [data, setDate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const context = useWeb3React();
  const { connector, account, deactivate, active, error, activate } = context;
  const [totalUSDRaised, settotalUSDRaised] = useState();



  const fetchDate = async () => {
    
    const response = await fetch(
      "https://presale-backend-nine.vercel.app/api/getEndDate"
    );

    const json = await response.json();
    setDate(json?.endDate?.endDate);
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
      // setUpdater(json?.value?.sliderValue);
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

  const hideModal = () => {
    setModal(false);
  };

  const Get_Token_Balance = async () => {
    try {
      if (acc) {
        let addBalance = 0;
        let USDTContractOf = new webSupply.eth.Contract(USDT_ABI, USDT_Address);
        let USDT_Balace = await USDTContractOf.methods.balanceOf(presale_Address).call();
        USDT_Balace = webSupply.utils.fromWei(USDT_Balace.toString());
        console.log("USDT_Balace", USDT_Balace);
        addBalance = Number(addBalance) + Number(USDT_Balace);

        let BUSDContractOf = new webSupply.eth.Contract(BUSD_ABI, BUSD_Address);
        let BUSD_Balance = await BUSDContractOf.methods.balanceOf(presale_Address).call();
        BUSD_Balance = webSupply.utils.fromWei(BUSD_Balance.toString());
        addBalance = Number(addBalance) + Number(BUSD_Balance);

        console.log("BUSD_Balance", addBalance);

        let USDCContractOf = new webSupply.eth.Contract(USDC_ABI, USDC_Address);
        let USDC_Balance = await USDCContractOf.methods.balanceOf(presale_Address).call();
        USDC_Balance = webSupply.utils.fromWei(USDC_Balance.toString());
        addBalance = Number(addBalance) + Number(USDC_Balance);

        console.log("USDC_Balance", addBalance);

        let Bnb_Balace = await web3.eth.getBalance(presale_Address);
        Bnb_Balace = webSupply.utils.fromWei(Bnb_Balace.toString());
        // addBalance = Number(addBalance) + Number(Bnb_Balace);
        
        Bnb_Balace=Bnb_Balace*250
        addBalance = Number(addBalance) + Number(Bnb_Balace);
        console.log("Final_Balance", addBalance);
        // console.log("Bnb_Balace", Bnb_Balace);

        settotalUSDRaised(addBalance)
        


      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Get_Token_Balance();
  
  }, [acc]);

  return (
    <div>
      <h3 className="pb-4 text-center text-24 text-white">Join the Pre Sale</h3>
      <p className="pb-[14px] text-center text-white text-12.5">
        June 20, 2023 To July 02, 2023
      </p>
      <p className="pb-[14px] text-white text-center text-17.5">
        {/* Sale Ending In: */}
        {/* {loading ? (
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


        )} */}
        {/* <Countdown
          key={Math.floor(Math.random() * 10 + 1)}
          date={ENDTIME}
          renderer={countdownrender}
        /> */}
      </p>

      <div className="mb-[17px] h-4 w-full overflow-hidden rounded-full bg-[#000]">
        <div
          className={`h-full bg-[#008000]`}
          style={{
            width: `${(totalUSDRaised/20000)*100}px`,
          }}
        ></div>
      </div>
      <div className="flex items-center justify-between pb-6">
        <p className="text-13.5 text-white">
          Stage 1  
          {totalUSDRaised} 
          {/* {commonStats.totalRaised ? formatPrice(commonStats.totalRaised) : 0}{" "} */}
        </p>
        {/* <HiOutlineArrowNarrowRight className="arrow_icn" /> */}
        <img src={arrow} className="img-fluid arroww" alt="" />
        <p className="text-13.5 text-white">
          {/* Goal: {data?.goal ? formatPrice(data?.goal) : "0"} USD */}
          Stage 2 
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
            <Connect id="1" hideModal={hideModal} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pb-4">
        <p className="text-15 text-white">Sale Supply</p>
        <p className="text-15 text-white">Price per Token</p>
      </div>

      <div className="flex items-center justify-between pb-8">
        <p className="text-15 font-bold text-white">
          {data?.saleSupply ? formatPrice(data?.saleSupply) : "0"} CURE COIN
        </p>
        <p className="text-15 font-bold text-white">
          {/* {data?.pricePerToken
            ? parseFloat(parseFloat(data?.pricePerToken).toFixed(8))
            : "-"} */}
              0.001 USD
          {/* {commonStats.salePrice
            ? parseFloat(parseFloat(commonStats.salePrice).toFixed(8))
            : "-"}{" "} */}
        </p>
      </div>
    </div>
  );
}
