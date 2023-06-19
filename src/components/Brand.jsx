import React from "react";

import logo from "../assets/news/608ded2b7472f_thumb900-removebg-preview.png";
import logo1 from "../assets/news/AI-Logo-Black-removebg-preview.png";
import logo2 from "../assets/news/business2community-removebg-preview.png";
import logo3 from "../assets/news/coinpedia-removebg-preview.png";
import logo4 from "../assets/news/cryptobasic-removebg-preview.png";
import logo5 from "../assets/news/cryptonwes-removebg-preview.png";
import logo6 from "../assets/news/cryptopolitan_logo-removebg-preview.png";
import logo7 from "../assets/news/cryptopress-portada-removebg-preview.png";
import logo8 from "../assets/news/Digital-Journal-logo-removebg-preview.png";
import logo9 from "../assets/news/etf-logo-removebg-preview.png";
import logo10 from "../assets/news/micky_logo-removebg-preview.png";
import logo11 from "../assets/news/Outlook-Logo-removebg-preview.png";

// please import here fast from news folder then you can add link like this
// hlw please check how to import it from folder
// open link one by one bro in google and see logos or put link..
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper";

const data = [
  // {
  //   id: 1,
  //   img: logo,
  //   uri: "https://www.crypto-news-flash.com/new-gem-coming-out-first-outlook-at-the-conglomerate-capitals-token-cong/",
  // },
  {
    id: 2,
    img: logo1,
    uri: "https://www.analyticsinsight.net/the-cong-token-is-set-to-explode/",
  },
  {
    id: 3,
    img: logo2,
    uri: "https://www.business2community.com/crypto-news/dao-based-governance-is-the-future-for-companies-raising-funds-and-the-conglomerate-capital-cong-is-leading-the-change-02606401",
  },
  {
    id: 4,
    img: logo3,
    uri: "https://coinpedia.org/press-release/the-cong-token-is-set-to-explode/",
  },
  {
    id: 5,
    img: logo4,
    uri: "https://thecryptobasic.com/2023/01/09/the-cong-token-is-set-to-explode/",
  },
  {
    id: 6,
    img: logo5,
    uri: "https://cryptonews.com/news/conglomerate-capital-building-investment-platform-for-future-presale-already-causing-waves.htm",
  },

  {
    id: 8,
    img: logo7,
    uri: "https://cryptopress.site/crypto/the-cong-token-is-set-to-take-off/",
  },
  {
    id: 9,
    img: logo8,
    uri: "https://www.digitaljournal.com/pr/first-outlook-at-the-conglomerate-capitals-token-cong",
  },
  // {
  //   id: 11,
  //   img: logo10,
  //   uri: "https://micky.com.au/the-cong-token-is-the-new-crypto-hype/",
  // },
];
export default function Brand() {
  return (
    <div className="h-[90px] rounded-b-lg bg-[#f1f1f1] py-5 px-12 flex items-center">
      <Swiper
        breakpoints={{
          80: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {data?.map(({ id, img, uri }) => (
          <SwiperSlide key={id}>
            <a href={uri} target="_blank" rel="noopener noreferrer">
              <img className="h-[85px]" src={img} alt="" />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
