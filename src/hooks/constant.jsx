export const trimAddress = (addr) => {
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
};

export const contract = {
  56: {
    //mainnet
    MULTICALL_ADDRESS: "0x2cc8fe3e04d7b1edaeb42e2e73f78c4cac074116",
    PRESALE_ADDRESS: "0xcb20d181036710b45f2a5d64341581f2c321e6ca",
    //testnet
    // MULTICALL_ADDRESS: "0xa54fe4a3dbd1eb21524cd73754666b7e13b4cb18",
    // PRESALE_ADDRESS: "0xd4fa96ac02c658fd5c26cbbdeb81e28df7c60a91",
  },
};

export const DEFAULT_CHAIN = 56;
//here we need the timespame
export const ENDTIME = 1688261825000; //use webiste - https://www.epochconverter.com/
export const GOAL = 2500000;
export const totalRaised = 550000;

export const formatPrice = (num, precision = 2) => {
  try {
    return new Intl.NumberFormat("ja-JP", {
      maximumFractionDigits: precision,
    }).format(num);
  } catch (err) {
    console.log(err.message);
    return 0;
  }
};
