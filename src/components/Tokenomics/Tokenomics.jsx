import React from "react";
// import "./Tokenomics";

function Tokenomics() {
  return (
    <div className="Token_main pb-20">
      <div className="container">
        <div className="token_heading d-flex flex-col items-center justify-center">
          <h1 className="pt-36 md:pt-48 text-white text-24 md:text-[38px]">
            Tokenomics
          </h1>
          <p className="text-22 text-white md:text-[25px] pt-6">
            Total Supply : 10000000 Token
          </p>
        </div>
        <div className="row">
          <div className="col-md-6 sm:mt-6">
            <div className="token_box_main d-flex justify-center sm:justify-around">
              <div className="token_box border mt-5 px-12 py-2 sm:py-7 sm:px-16">
                <p className="text-18 pb-3 text-center text-white">Presale</p>
                <p className="text-24 text-white">100000</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 sm:mt-6">
            <div className="token_box_main d-flex justify-center sm:justify-around">
              <div className="token_box border mt-5 px-12 py-2 sm:py-7 sm:px-16">
                <p className="text-18 pb-3 text-center text-white">Staking</p>
                <p className="text-24 text-white">100000</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 sm:mt-6">
            <div className="token_box_main d-flex justify-center sm:justify-around">
              <div className="token_box border mt-5 px-12 py-2 sm:py-7 sm:px-16">
                <p className="text-18 pb-3 text-center text-white">
                  Public sale
                </p>
                <p className="text-24 text-white">100000</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 sm:mt-6">
            <div className="token_box_main d-flex justify-center sm:justify-around">
              <div className="token_box border mt-5 px-12 py-2 sm:py-7 sm:px-16">
                <p className="text-18 pb-3 text-center text-white">Liquidity</p>
                <p className="text-24 text-white">100000</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 sm:mt-6">
            <div className="token_box_main d-flex justify-center sm:justify-around">
              <div className="token_box border mt-5 px-12 py-2 sm:py-7 sm:px-16">
                <p className="text-18 pb-3 text-center text-white">Farming</p>
                <p className="text-24 text-white">100000</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 sm:mt-6">
            <div className="token_box_main d-flex justify-center sm:justify-around">
              <div className="token_box border mt-5 px-12 py-2 sm:py-7 sm:px-16">
                <p className="text-18 pb-3 text-center text-white">Airdrop</p>
                <p className="text-24 text-white">100000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tokenomics;
