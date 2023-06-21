import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

const data = [
  {
    id: 1,
    title: "Referral Program",
    desc: "Share your referral link and get paid 5% instantly to your wallet for every referred token purchase. The referral cash back will be paid in USDT, USDC or BUSD, depending on which token was used to buy CURE COIN with the referral link.",
  },
  // {
  //   id: 2,
  //   title: "Vesting",
  //   desc: "To protect investors against rug pulls and governance attacks, CONG Tokens will have 3-month lockup and 6-month vesting thereafter (16.67% release/month). Tokens can be trackable and claimable, after the presale period, through Trust Swap Team Finance tool on https://www.team.finance/claim.",
  // },
];

export default function Program() {
  const [refAddress, setRefAddress] = useState("");
  const [copied, setCopied] = useState(false);
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  useEffect(() => {
    if (acc) {
      setRefAddress(`${window.location.origin}/?ref=${acc}`);
    } else {
      setRefAddress("connect wallet");
    }
  }, [acc]);

  return (
    <>
      <div className="grid grid-cols-1 text-white gap-[29px] lg:grid-cols-1">
        {data?.map(({ id, title, desc }) => (
          <>
            <div
              key={id}
              className="rounded-lg sm:pb-7 sm:pr-9 sm:pl-[43px] sm:pt-8 px-5 "
            >
              <h3 className="pb-7 main_hsgsr">{title}</h3>
              <p className="text-22">{desc}</p>
              {id === 1 && (
                <div class="w-full items-center justify-between pt-7">
                  <div class="flex flex-col items-start">
                    <p class="text-15 text-white">Your Referral Link</p>
                    <input
                      placeholder="Referral Addrses"
                      type="text"
                      class="w-auto border-b mt-3 p-2 border-white py-1 text-black outline-none ring-0 placeholder:text-10 placeholder:text-[#0e0d0d]"
                      value={refAddress}
                    />
                    <CopyToClipboard
                      text={refAddress}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 2000);
                      }}
                    >
                      <button
                        type="button"
                        class="h-[31px] w-[120px] rounded-lg mt-3 bg-white text-12.5 text-black"
                      >
                        {copied ? "Copied!" : "Copy Referral"}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              )}
              <div className="flex justify-center items-center gap-4 mt-[50px]">
                <div className="flex  items-center gap-2  text-b_16 text-[#088AD3]">
                  {/* <span>Join Community</span> <AiOutlineArrowRight />{" "} */}
                </div>
                <a
                  href="#"
                  // target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="h-10 w-10 bg-slate-800 p-2 rounded-md fs-3"/>
                </a>

                <a
                  href="#"
                  // target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsDiscord className="h-10 w-10 bg-slate-800 p-2 rounded-md fs-3" />
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
