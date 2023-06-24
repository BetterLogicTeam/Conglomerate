import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import whitearr from "../assets/whitearr.png";
import whitearr_btm from "../assets/whitearr_btm.png";

function Roadmap() {
  return (
    <div>
      <div className="token_heading d-flex flex-col items-center justify-center">
        <h1 className="pt-36 md:pt-48 text-white text-24 md:text-[38px]">
          Presale Stage
        </h1>
        <p className="text-22 text-white md:text-[25px] pt-6">
          Total Supply : 10000000 Token
        </p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12 sm:mt-6">
            <div className=" d-flex flex-col md:flex-row justify-center md:justify-evenly">
              <div className="main_cccrcl d-flex flex-col justify-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 1
                  </p>
                  <img
                    src={whitearr}
                    className="img-fluid w-75 md:ml-[10rem] md:-mt-6 hidden md:block"
                    alt=""
                  />
                  <img
                    src={whitearr_btm}
                    className="img-fluid w-[15%] ml-[4rem] mt-[4.5rem] block md:hidden"
                    alt=""
                  />
                </div>
              {/* <span className="pt-6 text-white">Presale for the Genesis Knights<br /> (Current)</span> */}
              </div>


              <div className="main_cccrcl mt-16 md:mt-0 d-flex flex-col justify-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 2
                  </p>
                  <img
                    src={whitearr}
                    className="img-fluid w-75 md:ml-[10rem] md:-mt-6 hidden md:block"
                    alt=""
                  />
                  <img
                    src={whitearr_btm}
                    className="img-fluid w-[15%] ml-[4rem] mt-[4.5rem] block md:hidden"
                    alt=""
                  />
                </div>
              {/* <span className="pt-6 text-white">Presale for the Elite Pioneers</span> */}
              </div>

              <div className="main_cccrcl mt-16 md:mt-0 d-flex flex-col justify-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 3
                  </p>
                  <img
                    src={whitearr}
                    className="img-fluid w-75 md:ml-[10rem] md:-mt-6 hidden md:block"
                    alt=""
                  />
                  <img
                    src={whitearr_btm}
                    className="img-fluid w-[15%] ml-[4rem] mt-[4.5rem] block md:hidden"
                    alt=""
                  />
                </div>
                {/* <span className="pt-6 text-white">Presale for the Vanguard Legends</span> */}
              </div>

              <div className="main_cccrcl mt-16 md:mt-0 d-flex flex-col justify-center">
                <div className="w-40 h-40 rounded-full border mt-5">
                  <p className="text-18 text-center text-white pt-[66px]">
                    Stage 4
                  </p>
                </div>
                {/* <span className="pt-6 text-white">Presale for the Stellar Titans</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
