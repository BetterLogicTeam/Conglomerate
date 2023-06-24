import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import whitearr from "../assets/whitearr.png";
import whitearr_btm from "../assets/whitearr_btm.png";

function Roadmap() {
  return (
    <div className="pb-16">
      <div className="token_heading d-flex flex-col items-center justify-center">
        <h1 className="pt-36 md:pt-48 text-white text-24 md:text-[38px]">
          Presale Stage
        </h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 sm:mt-6">
            <div className=" d-flex flex-col md:flex-row justify-center md:items-baseline items-center md:justify-evenly">
              <div className="main_cccrcl d-flex flex-col-reverse md:flex-col justify-center items-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 1
                  </p>
                  <img
                    src={whitearr}
                    className="img-fluid whitearr w-75 md:ml-[10rem] md:-mt-6 hidden md:block"
                    alt=""
                  />
                  <img
                    src={whitearr_btm}
                    className="img-fluid w-[15%] ml-[4rem] mt-[4.5rem] block md:hidden"
                    alt=""
                  />
                </div>
                <span className="pt-5 md:pt-6 text-center -mb-10 md:mb-0   text-white">
                  Presale for the Genesis Knights
                  <br /> (Current)
                </span>
              </div>

              <div className="main_cccrcl mt-16 md:mt-0 d-flex flex-col-reverse md:flex-col justify-center items-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 2
                  </p>
                  <img
                    src={whitearr}
                    className="img-fluid whitearr  w-75 md:ml-[10rem] md:-mt-6 hidden md:block"
                    alt=""
                  />
                  <img
                    src={whitearr_btm}
                    className="img-fluid w-[15%] ml-[4rem] mt-[4.5rem] block md:hidden"
                    alt=""
                  />
                </div>
                <span className="md:pt-6 -mb-8 text-center md:mb-0 pt-5  text-white">
                  Presale for the Elite Pioneers
                </span>
              </div>

              <div className="main_cccrcl mt-16 md:mt-0 d-flex flex-col-reverse md:flex-col justify-center items-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 3
                  </p>
                  <img
                    src={whitearr}
                    className="img-fluid whitearr w-75 md:ml-[10rem] md:-mt-6 hidden md:block"
                    alt=""
                  />
                  <img
                    src={whitearr_btm}
                    className="img-fluid w-[15%] ml-[4rem] mt-[4.5rem] block md:hidden"
                    alt=""
                  />
                </div>
                <span className="md:pt-11 pt-14 -mb-8  text-white">
                  Presale for the Vanguard Legends
                </span>
              </div>

              <div className="main_cccrcl mt-16 md:mt-0 d-flex flex-col-reverse md:flex-col justify-center items-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 4
                  </p>
                </div>
                <span className="md:pt-11 pt-14 -mb-8 text-white">
                  Presale for the Stellar Titans
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="token_heading d-flex flex-col items-center justify-center">
        <h1 className="pt-36 md:pt-18 text-white text-24 md:text-[38px]">
          Roadmap
        </h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="phase_box_main d-flex justify-center items-center">
              <div className="phase_box mt-10 border w-80 h-60 p-10 text-white">
                <h3 className="text-center pb-6 text-18">Phase 1</h3>
                <u className="list-none text-decoration-none">
                  <li>New Website and Branding</li>
                  <li>Launch of our Official Whitepaper</li>
                  <li>Audit Applications and Reviews</li>
                  <li>Presale for the Genesis Knights</li>
                </u>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="phase_box_main d-flex justify-center items-center">
              <div className="phase_box mt-10 border w-80 h-60 p-10 text-white">
                <h3 className="text-center pb-6 text-18">Phase 2</h3>
                <u className="list-none text-decoration-none">
                  <li>Token development</li>
                  <li>Community / Team Building</li>
                  <li>Listing on CoinGecko and CoinMarketCap </li>
                </u>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="phase_box_main d-flex justify-center items-center">
              <div className="phase_box mt-10 border w-80 h-60 p-10 text-white">
                <h3 className="text-center pb-6 text-18">Phase 3</h3>
                <u className="list-none text-decoration-none">
                  <li>Public Sale</li>
                  <li>Release of Token Claim</li>
                  <li>Staking Platform Launch</li>
                  <li>Listing on Major Exchanges</li>
                  <li>Influencer Marketing Push</li>
                </u>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
