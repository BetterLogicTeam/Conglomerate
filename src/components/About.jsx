import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
// import telegram from "../assets/telegram.png";
export default function About() {
  return (
    <div className="rounded-t-lg bg-black p-5 lg:pt-[34px] lg:pl-[46px] lg:pr-[98px]">
      <h3 className="text-22 text-white">About Conglomerate </h3>
      <p className="pt-5 text-white pb-[9px] text-16">
        The Conglomerate Capital is a web3, BEP20 blockchain-based investment
        and funding platform, governed by a Decentralized Autonomous
        Organization (DAO), from which disruptive startups as well as SME
        businesses will raise capital, where investors will be able to access
        Venture Capital and Private Equity outstanding opportunities through the
        CONG token.
      </p>
      {/* <a
        href="https://www.linkedin.com/company/the-conglomerate-capital/"
        className="flex items-center gap-2 pb-[22px] text-b_16 text-[#088AD3]"
      >
        <span>Join Community</span> <AiOutlineArrowRight />{" "}
      </a> */}

      <div className="flex items-center gap-2 pb-[22px]">
        <div className="flex items-center gap-2  text-b_16 text-[#088AD3]">
          <span>Join Community</span> <AiOutlineArrowRight />{" "}
        </div>
        <a
          href="https://t.me/congtoken"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTelegram className="h-5 w-6 text-sky-600" />
        </a>
        <a
          href="https://twitter.com/ConglomerateCap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter} alt="" />
        </a>

        <a
          href="https://www.linkedin.com/company/the-conglomerate-capital/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="" />
        </a>


      </div>
    </div>
  );
}
