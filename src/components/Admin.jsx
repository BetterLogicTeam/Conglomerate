import React, { useState } from 'react'
import { useAdminStats } from '../stats/useStats';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { contract, DEFAULT_CHAIN } from '../hooks/constant';
import stakingAbi from '../json/staking.json';
import { useWeb3React } from "@web3-react/core";
import { getWeb3 } from '../hooks/connectors';
import { toast } from 'react-toastify';
import { getContract } from '../hooks/contractHelper';


export default function Admin() {
    let { account, library } = useWeb3React();
    const [updater, setUpdater] = useState(1);
    const adminStats = useAdminStats(updater);
    const [release_address, setRelease_address] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRelease = async (e) => {
        setLoading(true)
        try {
            if (account) {
                let tokenStakingAddress = contract[DEFAULT_CHAIN].PRESALE_ADDRESS;

                let stakingContract = await getContract(
                    stakingAbi,
                    tokenStakingAddress,
                    library
                );
                let tx = await stakingContract.releaseToken(release_address, {
                    from: account,
                });
                toast.loading('Waiting for confirmation..');

                var interval = setInterval(async function () {
                    let web3 = getWeb3();
                    var response = await web3.eth.getTransactionReceipt(tx.hash);
                    if (response != null) {
                        clearInterval(interval)
                        if (response.status === true) {
                            toast.dismiss();
                            toast.success('success ! your last transaction is success');
                            setLoading(false);
                        }
                        else if (response.status === false) {
                            toast.dismiss();
                            toast.error('error ! Your last transaction is failed.');
                            setLoading(false);
                        }
                        else {
                            toast.dismiss();
                            toast.error('error ! something went wrong.');
                            setUpdater(Math.random());
                            setLoading(false);
                        }
                    }
                }, 5000);
            }
            else {
                toast.dismiss();
                toast.error('Please connect wallet!!');
                setLoading(false);
            }
        }
        catch (err) {
            toast.dismiss();
            toast.error(err.reason ? err.reason : err.message);
            setLoading(false);
        }
    };

    return (
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <h3 className='text-center text-22 text-black'>Admin Page</h3>
                        <div className='text-center mt-4 mb-5'>
                            <p class="text-15 text-black">Enter Amount</p>
                            <input placeholder="Type Address here" onChange={(e) => setRelease_address(e.target.value)} value={release_address} type="text" class="w-25 border-b border-black py-1 outline-none ring-0 placeholder:text-10 placeholder:text-[#6c6c6c]" />
                            <button
                                loading={loading}
                                className="mx-5 mt-3 h-[31px] w-[98px] rounded-lg bg-black text-12.5 text-white"
                                onClick={()=>handleRelease()}
                            >
                                Release
                            </button>
                        </div>
                        <table class="min-w-full">
                            <thead class="border-b">
                                <tr>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        #
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Address
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Amount
                                    </th>
                                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Token
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {adminStats.buyers.map(
                                    (buyer, index) =>
                                        adminStats.balances[index] > 0 && (
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={index}>
                                                    {buyer ? buyer : '' }
                                                    <CopyToClipboard
                                                        text={buyer}
                                                    >
                                                        <button
                                                            style={{
                                                                color: "black",
                                                            }}
                                                            className="mx-3"
                                                        >
                                                            Copy
                                                        </button>
                                                    </CopyToClipboard>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={index}>
                                                    {adminStats.balances[index]}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={index + 1}>
                                                    CONG
                                                </td>
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
