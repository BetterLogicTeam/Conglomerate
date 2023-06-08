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

export default function BuyNow(props) {
  let { chainId, account, library } = useWeb3React();
  const [approve, setApprove] = useState(false);
  let { commonStats, accStats, setUpdater } = props;
  let [plan, setPlan] = useState(1);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalToken, setTotalToken] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const search = useLocation().search;
  const [refAddress, setRefAddress] = useState("");

  useEffect(() => {
    let refAddr = "";

    const queryRefAddress = new URLSearchParams(search).get("ref");
    if (queryRefAddress !== "") {
      refAddr = queryRefAddress;
    }

    setRefAddress(refAddr);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (plan === 1) {
      setApprove(accStats.isusdtApproved);
      setBalance(accStats.usdtBal);
    } else if (plan === 2) {
      setApprove(accStats.isbusdApproved);
      setBalance(accStats.busdBal);
    } else if (plan === 3) {
      setApprove(accStats.isusdcApproved);
      setBalance(accStats.usdcBal);
    } else {
      setApprove(false);
      setBalance(0);
    }
  }, [plan, accStats]);

  const handleAmountChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
    setTotalToken(parseFloat(e.target.value / commonStats.salePrice));
    if (isNaN(e.target.value)) {
      setError("Please enter valid amount.");
    } else {
      setError("");
    }
    return;
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (account) {
      if (chainId) {
        try {
          let tokenContract;
          if (plan === 1) {
            tokenContract = getContract(
              tokenAbi,
              commonStats.usdtAddress,
              library
            );
          } else if (plan === 2) {
            tokenContract = getContract(
              tokenAbi,
              commonStats.busdAddress,
              library
            );
          } else if (plan === 3) {
            tokenContract = getContract(
              tokenAbi,
              commonStats.usdcAddress,
              library
            );
          } else {
            setLoading(true);
            toast.error("selected paln doesn't exist!!");
            return false;
          }

          let amount = ethers.utils
            .parseEther("1000000000000000000")
            .toString();
          let tx = await tokenContract.approve(
            contract[DEFAULT_CHAIN].PRESALE_ADDRESS,
            amount,
            { from: account }
          );
          toast.loading("Waiting for confirmation..");

          var interval = setInterval(async function () {
            let web3 = getWeb3();
            var response = await web3.eth.getTransactionReceipt(tx.hash);
            if (response != null) {
              clearInterval(interval);
              if (response.status === true) {
                toast.dismiss();
                toast.success("success ! your last transaction is success");
                setUpdater(Math.random());
                setLoading(false);
              } else if (response.status === false) {
                toast.dismiss();
                toast.error("error ! Your last transaction is failed.");
                setUpdater(Math.random());
                setLoading(false);
              } else {
                toast.dismiss();
                toast.error("error ! something went wrong.");
                setUpdater(Math.random());
                setLoading(false);
              }
            }
          }, 5000);
        } catch (err) {
          toast.dismiss();
          toast.error(err.reason ? err.reason : err.message);
          setLoading(false);
        }
      } else {
        toast.dismiss();
        toast.error("please connect network to Bsc chain!!");
        setLoading(false);
      }
    } else {
      toast.dismiss();
      toast.error("please connect wallet!!");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (account) {
      if (chainId) {
        if (plan >= 1 && plan <= 3) {
          if (parseFloat(amount) > 0) {
            try {
              let decimals =
                plan === 1
                  ? commonStats.usdtDecimals
                  : plan === 2
                  ? commonStats.busdDecimals
                  : commonStats.usdcDecimals;
              let stakeContract = getContract(
                stakeAbi,
                contract[DEFAULT_CHAIN].PRESALE_ADDRESS,
                library
              );
              let bamount = ethers.utils.parseUnits(
                amount.toString(),
                decimals
              );
              let ref = refAddress
                ? refAddress.toLowerCase() === account.toLowerCase()
                  ? "0x0000000000000000000000000000000000000000"
                  : refAddress
                : "0x0000000000000000000000000000000000000000";
              let tx = await stakeContract.buyfromToken(plan, ref, bamount, {
                from: account,
              });
              toast.loading("Waiting for confirmation..");

              var interval = setInterval(async function () {
                let web3 = getWeb3();
                var response = await web3.eth.getTransactionReceipt(tx.hash);
                if (response != null) {
                  clearInterval(interval);
                  if (response.status === true) {
                    toast.dismiss();
                    toast.success("success ! your last transaction is success");
                    setUpdater(Math.random());
                    setLoading(false);
                  } else if (response.status === false) {
                    toast.dismiss();
                    toast.error("error ! Your last transaction is failed.");
                    setUpdater(Math.random());
                    setLoading(false);
                  } else {
                    toast.dismiss();
                    toast.error("error ! something went wrong.");
                    setUpdater(Math.random());
                    setLoading(false);
                  }
                }
              }, 5000);
            } catch (err) {
              toast.dismiss();
              toast.error(err.reason ? err.reason : err.message);
              setLoading(false);
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
      } else {
        toast.dismiss();
        toast.error("please connect network to Bsc chain!!");
        setLoading(false);
      }
    } else {
      toast.dismiss();
      toast.error("please connect wallet!!");
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="bg-black text-white">
        <h3 className="text-center text-19">Buy Now</h3>
        <p className="text-15 text-white text-center mt-2 mb-2">
          Your Balance : {balance ? formatPrice(balance) : 0}{" "}
          {plan === 1 ? "USDT" : plan === 2 ? "BUSD" : "USDC"}{" "}
        </p>
        <RadioGroup value={plan} onChange={(value) => setPlan(value)}>
          <RadioGroup.Label className={"text-15"}>ChooseToken</RadioGroup.Label>
          <div className="flex justify-center gap-2 pt-4">
            <RadioGroup.Option value={1}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] cursor-pointer items-center justify-center gap-2 rounded-lg " +
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
            <RadioGroup.Option value={2} onChange={(value) => setPlan(value)}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] cursor-pointer items-center justify-center gap-2 rounded-lg " +
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
            <RadioGroup.Option value={3} onChange={(value) => setPlan(value)}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] cursor-pointer items-center justify-center gap-2 rounded-lg " +
                    (checked
                      ? "bg-white text-black"
                      : "bg-[#d9d9d9] text-black")
                  }
                >
                  <img src={usdc} alt="" className="" />
                  <span className="text-12 font-semibold ">USDC</span>
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={4} onChange={(value) => setPlan(value)}>
              {({ checked }) => (
                <div
                  className={
                    "flex h-6 w-[70px] cursor-pointer items-center justify-center gap-2 rounded-lg " +
                    (checked
                      ? "bg-white text-black"
                      : "bg-[#d9d9d9] text-black")
                  }
                >
                  <img src={usdd} alt="" className="" />
                  <span className="text-12 font-semibold ">BNB</span>
                </div>
              )}
            </RadioGroup.Option>
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
              className="w-full border-b border-white bg-black py-1 outline-none ring-0 placeholder:text-10 placeholder:text-[#6c6c6c]"
            />
            <span>{error}</span>
          </div>
          <div className="flex w-[107px] flex-col items-start">
            <p className="text-15 text-white">CONG Tokens</p>
            <input
              value={totalToken}
              disabled={true}
              type="text"
              className="w-full border-b border-white bg-black py-1 outline-none ring-0"
            />
          </div>
        </div>

        <p className="mt-3 text-12">
          Please click the button twice. <br /> First time to approve and second
          time to buy.
        </p>
        {approve ? (
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
        )}

        <button
          type="button"
          disabled={loading}
          className="mt-3 h-[31px] w-[98px] rounded-lg bg-white text-12.5 text-black"
        >
          Claim
        </button>
      </div>
    </div>
  );
}
