import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import usdt from "../assets/tether-usdt-logo-FA55C7F397-seeklogo 1.svg";
import usdc from "../assets/tether-usdt-logo-FA55C7F397-seeklogo 2.svg";
import usdd from "../assets/tether-usdt-logo-FA55C7F397-seeklogo 3.svg";
import { contract, DEFAULT_CHAIN, formatPrice } from "../hooks/constant";
import { getContract } from "../hooks/contractHelper";
import { getWeb3 } from "../hooks/connectors";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import tokenAbi from "../json/token.json";
import stakeAbi from "../json/staking.json";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Web3 from "web3";
import {
  BUSD_ABI,
  BUSD_Address,
  USDC_ABI,
  USDC_Address,
  USDT_ABI,
  USDT_Address,
  presale_ABI,
  presale_Address,
} from "../utilies/constant";

export default function BuyNow(props) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  let { chainId, account, library } = useWeb3React();
  const [Spinner, setSpinner] = useState(false);
  let { commonStats, accStats, setUpdater } = props;
  let [plan, setPlan] = useState(1);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [totalToken, setTotalToken] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const search = useLocation().search;
  const [refAddress, setRefAddress] = useState("");
  const [IsClaim, setIsClaim] = useState(false);
  const webSupply = new Web3("https://bsc-testnet.publicnode.com");
  useEffect(() => {
    let refAddr = "";

    const queryRefAddress = new URLSearchParams(search).get("ref");
    if (queryRefAddress !== "") {
      refAddr = queryRefAddress;
    }

    setRefAddress(refAddr);
    // eslint-disable-next-line
  }, []);

  const Get_Token_Balance = async () => {
    try {
      let ContractOf = new webSupply.eth.Contract(presale_ABI, presale_Address);
      let ClaimStatus = await ContractOf.methods.ClaimStatus().call();
      setIsClaim(ClaimStatus);
      if (plan === 1) {
        let USDTContractOf = new webSupply.eth.Contract(USDT_ABI, USDT_Address);
        let USDT_Balace = await USDTContractOf.methods.balanceOf(acc).call();
        USDT_Balace = webSupply.utils.fromWei(USDT_Balace.toString());
        console.log("USDT_Balace", USDT_Balace);
        setBalance(USDT_Balace);
      } else if (plan === 2) {
        let BUSDContractOf = new webSupply.eth.Contract(BUSD_ABI, BUSD_Address);
        let BUSD_Balance = await BUSDContractOf.methods.balanceOf(acc).call();
        BUSD_Balance = webSupply.utils.fromWei(BUSD_Balance.toString());
        setBalance(BUSD_Balance);

        console.log("BUSD_Balance", BUSD_Balance);
      } else if (plan === 3) {
        let USDCContractOf = new webSupply.eth.Contract(USDC_ABI, USDC_Address);
        let USDC_Balance = await USDCContractOf.methods.balanceOf(acc).call();
        USDC_Balance = webSupply.utils.fromWei(USDC_Balance.toString());
        setBalance(USDC_Balance);

        console.log("USDC_Balance", USDC_Balance);
      } else {
        let Bnb_Balace = await web3.eth.getBalance(acc);
        Bnb_Balace = webSupply.utils.fromWei(Bnb_Balace.toString());
        setBalance(Bnb_Balace);

        console.log("Bnb_Balace", Bnb_Balace);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Get_Token_Balance();
  }, [plan, accStats, acc]);

  const handleAmountChange = async (e) => {
    e.preventDefault();
    setAmount(e.target.value);
    let Value = e.target.value;
    console.log("Value", Value);
    let ContractOf = new webSupply.eth.Contract(presale_ABI, presale_Address);

    // setTotalToken(parseFloat(e.target.value / commonStats.salePrice));
    if (Value === "") {
      setError("Please enter valid amount.");
      setTotalToken(0);
    } else {
      setError("");
      Value = webSupply.utils.toWei(Value.toString());
      if (plan === 1) {
        let USDT_Token = await ContractOf.methods
          .getTokenvalueperUSDT(Value)
          .call();
        USDT_Token = webSupply.utils.fromWei(USDT_Token.toString());
        console.log("USDT_Balace", USDT_Token);
        setTotalToken(USDT_Token);
      } else if (plan === 2) {
        let BUSD_Token = await ContractOf.methods
          .getTokenvalueperBUSD(Value)
          .call();
        BUSD_Token = webSupply.utils.fromWei(BUSD_Token.toString());
        console.log("USDT_Balace", BUSD_Token);
        setTotalToken(BUSD_Token);
      } else if (plan === 3) {
        let USDC_Token = await ContractOf.methods
          .getTokenvalueperUSDC(Value)
          .call();
        USDC_Token = webSupply.utils.fromWei(USDC_Token.toString());
        console.log("USDT_Balace", USDC_Token);
        setTotalToken(USDC_Token);
      } else {
        let BNB_Token = await ContractOf.methods
          .getTokenvalueperBNB(Value)
          .call();
        BNB_Token = webSupply.utils.fromWei(BNB_Token.toString());
        console.log("USDT_Balace", BNB_Token);
        setTotalToken(BNB_Token);
      }
    }
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (acc) {
      // if (chainId) {
      if (plan >= 1 && plan <= 4) {
        if (parseFloat(amount) > 0) {
          try {
            let web3 = window.web3;
            let ContractOf = new web3.eth.Contract(
              presale_ABI,
              presale_Address
            );
            let Amount = web3.utils.toWei(amount.toString());

            let ref = refAddress
              ? refAddress.toLowerCase() === acc.toLowerCase()
                ? "0x000000000000000000000000000000000000dead"
                : refAddress
              : "0x000000000000000000000000000000000000dead";
            if (plan === 1) {
              if (balance <= amount) {
                toast.error("Insufficient Balance");
                setLoading(false);
              } else {
                let USDTContractOf = new web3.eth.Contract(
                  USDT_ABI,
                  USDT_Address
                );

                await USDTContractOf.methods
                  .approve(presale_Address, Amount)
                  .send({
                    from: acc,
                  });
                toast.success("success ! Your First transaction is success");

                let tx = await ContractOf.methods
                  .BuyTokenWithUSDT(ref, Amount)
                  .send({
                    from: acc,
                  });
                toast.success("success ! your last transaction is success");
                setLoading(false);
              }
            } else if (plan === 2) {
              if (balance <= amount) {
                toast.error("Insufficient Balance");
                setLoading(false);
              } else {
                let BUSDContractOf = new web3.eth.Contract(
                  BUSD_ABI,
                  BUSD_Address
                );
                await BUSDContractOf.methods
                  .approve(presale_Address, Amount)
                  .send({
                    from: acc,
                  });
                toast.success("success ! Your First transaction is success");

                let tx = await ContractOf.methods
                  .BuyTokenWithBUSD(ref, Amount)
                  .send({
                    from: acc,
                  });
                toast.success("success ! your last transaction is success");
                setLoading(false);
              }
            } else if (plan === 3) {
              if (balance <= amount) {
                toast.error("Insufficient Balance");
                setLoading(false);
              } else {
                let USDCContractOf = new web3.eth.Contract(
                  USDC_ABI,
                  USDC_Address
                );
                await USDCContractOf.methods
                  .approve(presale_Address, Amount)
                  .send({
                    from: acc,
                  });
                toast.success("success ! Your First transaction is success");
                let tx = await ContractOf.methods
                  .BuyTokenWithUSDC(ref, Amount)
                  .send({
                    from: acc,
                  });
                toast.success("success ! your last transaction is success");
                setLoading(false);
              }
            } else {
              if (balance <= amount) {
                toast.error("Insufficient Balance");
                setLoading(false);
              } else {
                let tx = await ContractOf.methods.BuyTokenWithBNB(ref).send({
                  from: acc,
                  value: Amount,
                });
                toast.success("success ! your last transaction is success");
                setLoading(false);
              }
            }

            // let tx = await ContractOf.buyfromToken(plan, ref, {
            //   from: acc,
            // });
          } catch (err) {
            toast.dismiss();
            toast.error(err.reason ? err.reason : err.message);
            setLoading(false);
            console.log(err);
          }
        } else {
          toast.dismiss();
          toast.error("Please enter valid amount!!");
          setLoading(false);
        }
      } else {
        toast.dismiss();
        toast.error("selected paln doesn't exist!!");
        setLoading(false);
      }
      // } else {
      //   toast.dismiss();
      //   toast.error("please connect network to Bsc chain!!");
      //   setLoading(false);
      // }
    } else {
      toast.dismiss();
      toast.error("please connect wallet!!");
      setLoading(false);
    }
  };

  const Claim_Amount = async () => {
    try {
      if (acc) {
        setSpinner(true);
        let web3 = window.web3;
        console.log("We3", web3);
        let ContractOf = new web3.eth.Contract(presale_ABI, presale_Address);
        let tx = await ContractOf.methods.Claim().send({
          from: acc,
        });
        toast.success("Success ! your Claim transaction is success");
        setSpinner(false);
      } else {
        toast.error("please connect wallet!!");
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.reason ? error.reason : error.message);
      setSpinner(false);
    }
  };

  return (
    <div className="">
      <div className=" text-white">
        <h3 className="text-center text-19">Buy Now</h3>
        <p className="text-15 text-white text-center mt-2 mb-2">
          Your Balance : {balance ? formatPrice(balance) : 0}
          {plan === 1 ? " USDT" : plan === 2 ? " BUSD" : plan === 3? " USDC":" BNB"}
        </p>
        <RadioGroup value={plan} onChange={(value) => setPlan(value)}>
          <RadioGroup.Label className={"text-15"}>Choose Token</RadioGroup.Label>
          <div className="flex justify-center mdacont gap-2 pt-4">
            <div className="article_resds">
            <RadioGroup.Option value={1}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] wedt_resds cursor-pointer items-center justify-center gap-2 rounded-lg " +
                    (checked
                      ? "bg-white text-black"
                      : "bg-[#d9d9d9] text-black")
                  }
                >
                  <img src={usdt} alt="" className="" />
                  <span className="text-12 font-semibold">USDT</span>
                </div>
              )}
            </RadioGroup.Option>
            </div>
            <div className="article_resds">
            <RadioGroup.Option value={2} onChange={(value) => setPlan(value)}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] cursor-pointer wedt_resds items-center justify-center gap-2 rounded-lg " +
                    (checked
                      ? "bg-white text-black"
                      : "bg-[#d9d9d9] text-black")
                  }
                >
                  <img src={usdd} alt="" className="" />
                  <span className="text-12 font-semibold ">BUSD</span>
                </div>
              )}
            </RadioGroup.Option>
            </div>
            <div className="article_resds">
            <RadioGroup.Option value={3} onChange={(value) => setPlan(value)}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] wedt_resds cursor-pointer items-center justify-center gap-2 rounded-lg " +
                    (checked
                      ? "bg-white text-black"
                      : "bg-[#d9d9d9] text-black")
                  }
                >
                  <img src={usdc} alt="" className="" />
                  <span className="text-12 font-semibold ">USDC</span>
                </div>
              )}
            </RadioGroup.Option></div>
            <div className="article_resds">
            <RadioGroup.Option value={4} onChange={(value) => setPlan(value)}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] wedt_resds cursor-pointer items-center justify-center gap-2 rounded-lg " +
                    (checked
                      ? "bg-white text-black"
                      : "bg-[#d9d9d9] text-black")
                  }
                >
                  <img src={usdd} alt="" className="" />
                  <span className="text-12 font-semibold ">BNB</span>
                </div>
              )}
            </RadioGroup.Option></div>
          </div>
        </RadioGroup>
        <div className="flex w-full items-center justify-between pt-7">
          <div className="flex w-[107px] flex-col items-start">
            <p className="text-15 text-white">Enter Amount</p>
            <input
              placeholder="Type amount here"
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e)}
              className="w-full border-b border-white bg-transparent py-1 outline-none ring-0 placeholder:text-10 placeholder:text-[#6c6c6c]"
            />
            <span style={{ color: "red", fontSize: "0.7rem" }}>{error}</span>
          </div>
          <div className="flex w-[107px] flex-col items-start">
            <p className="text-15 text-white">CURE COIN</p>
            <input
              value={totalToken}
              disabled={true}
              placeholder="0"
              type="text"
              className="w-full border-b border-white bg-transparent py-1 outline-none ring-0"
            />
          </div>
        </div>

        <p className="mt-3 text-12">
          Please click the button twice. <br /> First time to approve and second
          time to buy.
        </p>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
          className="mt-3 h-[31px] w-[98px] rounded-lg bg-white text-12.5 text-black"
        >
          {loading ? "Loading..." : "Buy"}
        </button>
        {/* {approve ? (
          <button
            type="button"
            onClick={(e) => handleSubmit(e)}
            disabled={loading}
            className="mt-3 h-[31px] w-[98px] rounded-lg bg-white text-12.5 text-black"
          >
            {loading ? "Loading..." : "Buy"}
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => handleApprove(e)}
            disabled={loading}
            className="mt-3 h-[31px] w-[98px] rounded-lg bg-white text-12.5 text-black"
          >
            {loading ? "Loading..." : "Approve"}
          </button>
        )} */}

        <button
          type="button"
          onClick={() => Claim_Amount()}
          disabled={IsClaim === false ? true : false}
          style={{ cursor: IsClaim === false ? "no-drop" : "pointer" }}
          className="mt-3 h-[31px] w-[98px] rounded-lg bg-white text-12.5 text-black"
        >
           {Spinner ? "Loading..." : "Claim"}
          
        </button>
      </div>
    </div>
  );
}
