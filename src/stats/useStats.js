import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core";
import { getWeb3Contract, MulticallContractWeb3 } from "../hooks/contractHelper";
import { toast } from "react-toastify";
import { contract, DEFAULT_CHAIN, GOAL, totalRaised } from "../hooks/constant";
import tokenAbi from '../json/token.json';
import stakeAbi from '../json/staking.json';


export const useCommonStats = (updater) => {
    let { chainId } = useWeb3React();

    const [stats, setStats] = useState({
        allBuyers: 0,
        perDollarPrice: 0,
        salePrice : 0,
        totalSold: 0,
        usdtDecimals: 0,
        usdcDecimals: 0,
        busdDecimals: 0,
        tokenDecimals: 0,
        totalRaised: 0,
        percentageRaised: 0,
        tokenAddress: '',
        usdtAddress: '',
        usdcAddress: '',
        busdAddress: ''
    });


    let stakeContract = getWeb3Contract(stakeAbi, contract[DEFAULT_CHAIN].PRESALE_ADDRESS);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await MulticallContractWeb3(
                    [
                        stakeContract.methods.allBuyers(), //0
                        stakeContract.methods.perDollarPrice(), //1
                        stakeContract.methods.totalSold(), //2
                        stakeContract.methods.usdt(), //3
                        stakeContract.methods.usdc(), //4
                        stakeContract.methods.busd(), //5
                        stakeContract.methods.token() //6
                    ]
                );

                let usdtContract = getWeb3Contract(tokenAbi, data[3]);
                let usdcContract = getWeb3Contract(tokenAbi, data[4]);
                let busdContract = getWeb3Contract(tokenAbi, data[5]);
                let tokenContract = getWeb3Contract(tokenAbi, data[6]);

                let tokenData = await MulticallContractWeb3(
                    [
                        usdtContract.methods.decimals(), //0
                        usdcContract.methods.decimals(), //1
                        busdContract.methods.decimals(), //2
                        tokenContract.methods.decimals(), //3
                    ]
                );

                setStats({
                    allBuyers: data[9],
                    perDollarPrice: data[1] / Math.pow(10, 8),
                    totalSold: data[2] / Math.pow(10, tokenData[3]),
                    salePrice : parseFloat(1 / (data[1] / Math.pow(10, 8))),
                    usdtDecimals: tokenData[0],
                    usdcDecimals: tokenData[1],
                    busdDecimals: tokenData[2],
                    tokenDecimals: tokenData[3],
                    totalRaised: totalRaised,
                    percentageRaised: (parseFloat(totalRaised) * 100) / parseFloat(GOAL),
                    tokenAddress: data[6],
                    usdtAddress: data[3],
                    usdcAddress: data[4],
                    busdAddress: data[5]
                })
            }
            catch (err) {
                console.log(err.message);
                toast.error(err.reason)
            }
        }

        if (stakeContract) {
            fetch();
        }
        else {
            setStats({
                UsdtoBnb: 0,
                allBuyers: 0,
                salePrice : 0,
                perDollarPrice: 0,
                totalSold: 0,
                usdtDecimals: 0,
                usdcDecimals: 0,
                busdDecimals: 0,
                tokenDecimals: 0,
                totalRaised: 0,
                percentageRaised: 0
            })
        }

        // eslint-disable-next-line
    }, [updater, chainId]);

    return stats;
}


export const useAccountStats = (updater) => {
    let { chainId, account } = useWeb3React();

    const [stats, setStats] = useState({
        usdtDecimals: 0,
        usdcDecimals: 0,
        busdDecimals: 0,
        tokenDecimals: 0,
        usdtBal: 0,
        busdBal: 0,
        usdcBal: 0,
        tokenBal: 0,
        isusdtApproved: false,
        isbusdApproved: false,
        isusdcApproved: false,
        isOwner : false
    });


    let stakeContract = getWeb3Contract(stakeAbi, contract[DEFAULT_CHAIN].PRESALE_ADDRESS);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await MulticallContractWeb3(
                    [
                        stakeContract.methods.usdt(), //0
                        stakeContract.methods.usdc(), //1
                        stakeContract.methods.busd(), //2
                        stakeContract.methods.token(), //3
                        stakeContract.methods.owner() //4
                    ]
                );

                let usdtContract = getWeb3Contract(tokenAbi, data[0]);
                let usdcContract = getWeb3Contract(tokenAbi, data[1]);
                let busdContract = getWeb3Contract(tokenAbi, data[2]);
                let tokenContract = getWeb3Contract(tokenAbi, data[3]);

                let tokenData = await MulticallContractWeb3(
                    [
                        usdtContract.methods.decimals(), //0
                        usdcContract.methods.decimals(), //1
                        busdContract.methods.decimals(), //2
                        tokenContract.methods.decimals(), //3
                        usdtContract.methods.balanceOf(account), //4
                        usdcContract.methods.balanceOf(account), //5
                        busdContract.methods.balanceOf(account), //6
                        tokenContract.methods.balanceOf(account), //7
                        usdtContract.methods.allowance(account, contract[DEFAULT_CHAIN].PRESALE_ADDRESS), //8
                        usdcContract.methods.allowance(account, contract[DEFAULT_CHAIN].PRESALE_ADDRESS), //9
                        busdContract.methods.allowance(account, contract[DEFAULT_CHAIN].PRESALE_ADDRESS), //10
                    ]
                );




                setStats({
                    usdtDecimals: tokenData[0],
                    usdcDecimals: tokenData[1],
                    busdDecimals: tokenData[2],
                    tokenDecimals: tokenData[3],
                    usdtBal: tokenData[4] / Math.pow(10, tokenData[0]),
                    usdcBal: tokenData[5] / Math.pow(10, tokenData[1]),
                    busdBal: tokenData[6] / Math.pow(10, tokenData[2]),
                    tokenBal: tokenData[7] / Math.pow(10, tokenData[3]),
                    isusdtApproved: parseFloat(tokenData[8] / Math.pow(10, tokenData[0])) > 10000000000 ? true : false,
                    isusdcApproved: parseFloat(tokenData[9] / Math.pow(10, tokenData[1])) > 10000000000 ? true : false,
                    isbusdApproved: parseFloat(tokenData[10] / Math.pow(10, tokenData[2])) > 10000000000 ? true : false,
                    isOwner : data[4].toString().toLowerCase() === account.toLowerCase() ? true : false
                })
            }
            catch (err) {
                console.log(err.message);
                toast.error(err.reason)
            }
        }

        if (stakeContract && account) {
            fetch();
        }
        else {
            setStats({
                usdtDecimals: 0,
                usdcDecimals: 0,
                busdDecimals: 0,
                tokenDecimals: 0,
                usdtBal: 0,
                busdBal: 0,
                usdcBal: 0,
                tokenBal: 0,
                isusdtApproved: false,
                isbusdApproved: false,
                isusdcApproved: false,
                isOwner : false
            })
        }

        // eslint-disable-next-line
    }, [updater, chainId, account]);

    return stats;
}


export const useAdminStats = (updater) => {
    let { chainId , account } = useWeb3React();

    const [stats, setStats] = useState({
        allBuyers: 0,
        buyers: [],
        balances: [],
    });


    let stakeContract = getWeb3Contract(stakeAbi, contract[DEFAULT_CHAIN].PRESALE_ADDRESS);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await MulticallContractWeb3(
                    [
                        stakeContract.methods.allBuyers()
                    ]
                );

                let _buyers = [];
                let _balances = [];

                for (let i = 0; i < data[0]; i++) {
                    _buyers.push(await stakeContract.methods.buyers(i).call());
                    _balances.push(
                        (await stakeContract.methods.userBuy(_buyers[i]).call()) / Math.pow(10, 8)
                    );
                }


                setStats({
                    allBuyers: data[0],
                    buyers: _buyers,
                    balances: _balances,
                })
            }
            catch (err) {
                console.log(err.message);
                toast.error(err.reason)
            }
        }

        if (stakeContract) {
            fetch();
        }
        else {
            setStats({
                allBuyers: 0,
                buyers: [],
                balances: [],
            })
        }

        // eslint-disable-next-line
    }, [updater, chainId , account]);

    return stats;
}







