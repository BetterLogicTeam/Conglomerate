import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
// import telegram from "../assets/telegram.png";
export default function About() {
  return (
    <div className="rounded-t-lg bg-black p-5 lg:pt-[34px] lg:pl-[46px] lg:pr-[98px]">
      <h3 className="text-22 text-white">About CURE COIN </h3>
      <p className="pt-5 text-white pb-[9px] text-17">
      Cure Coin operates on the Binance Smart Chain (BSC), offering a
          seamless and secure investment experience. Say hello to $CURE, the
          symbol of both financial growth and a brighter future. With a starting
          token supply of 10%, and an astonishing 90% held for future rewards,
          your investment has the potential to soar to new heights.
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
          href="#"
          // target="_blank"
          rel="noopener noreferrer"
        >
          <BsTelegram className="h-5 w-6 text-sky-600" />
        </a>
        <a
          href="#"
          // target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter} alt="" />
        </a>

        <a
          href="#"
          // target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin} alt="" />
        </a>


      </div>
    </div>
  );
}
