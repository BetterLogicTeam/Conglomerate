import { ethers } from "ethers";
import { getWeb3 } from "./connectors";
import { contract, DEFAULT_CHAIN } from "./constant";
import multiCallAbi from '../json/multicall.json';


export const getContract = (abi, address, library) => {
  try {
    return new ethers.Contract(address, abi, library.getSigner())
  }
  catch {
    return false;
  }
}

export const getWeb3Contract = (abi, address) => {
  let web3 = getWeb3(DEFAULT_CHAIN);
  return new web3.eth.Contract(abi, address);
}

export const MulticallContractWeb3 = async (calls = []) => {
  let web3 = getWeb3(DEFAULT_CHAIN);
  let multicallAddress = contract[DEFAULT_CHAIN].MULTICALL_ADDRESS;
  const mc = new web3.eth.Contract(multiCallAbi, multicallAddress);
  const callRequests = calls.map((call) => {
    const callData = call.encodeABI();
    return {
      target: call._parent._address,
      callData,
    };
  });

  const { returnData } = await mc.methods
    .aggregate(callRequests)
    .call({});

  let finalData = returnData.map((hex, index) => {
    const types = calls[index]._method.outputs.map((o) =>
      o.internalType !== o.type && o.internalType !== undefined ? o : o.type
    );

    let result = web3.eth.abi.decodeParameters(types, hex);

    delete result.__length__;

    result = Object.values(result);

    return result.length === 1 ? result[0] : result;
  });

  return finalData;
}

export const multiCallContractConnect = () => {
  let multicallAddress = contract[DEFAULT_CHAIN].MULTICALL_ADDRESS;
  let web3 = getWeb3();
  return new web3.eth.Contract(multiCallAbi, multicallAddress);
}




