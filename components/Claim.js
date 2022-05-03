import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

import {useState, useEffect} from 'react'
import {useMoralis} from "react-moralis"
import {cryptoboysAddress, marketAddress, chain } from "../config"
import MarketContract from "../abis/Market.json"
import CryptoContract from "../abis/CryptoBoys.json"

const Claim = () => {

    const [ marketReward, setMarketReward ] = useState(0);
    const [ mintReward, setMintReward ] = useState(0);
    const { Moralis } = useMoralis();

    useEffect( async () => {
        await MarketReward();
        await MintReward();
    }, []);

    const MarketReward = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const resp = await Moralis.executeFunction({
            functionName: "getRewards",
            ...options,
        });

        setMarketReward(resp.toNumber());
    }

    const CliamMarketReward = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const resp = await Moralis.executeFunction({
            functionName: "claimRewards",
            ...options,
        });
        console.log(resp);
    }

    const MintReward = async () => {
        // await Moralis.enableWeb3();
        // const options = {
        //     contractAddress: cryptoboysAddress,
        //     abi: CryptoContract,
        // };

        // const resp = await Moralis.executeFunction({
        //     functionName: "getReflectionBalances",
        //     ...options,
        // });

        // setMintReward(resp.toNumber());
    }

    const CliamMintReward = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: cryptoboysAddress,
            abi: CryptoContract,
        };

        const resp = await Moralis.executeFunction({
            functionName: "claimRewards",
            ...options,
        });

        console.log(resp);
    }

    return ( 
        <section className="w-full mb-6  text-center py-10 ">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 lg:gap-x-0 items-center  stats  ">
                <div className="stat">
                    <div className="stat-title">Mint Rewards</div>
                    <div className="stat-value">${mintReward} <Image src={Avax} width={25} height={25}/></div>
                    <div className="stat-actions">
                        <button className="btn" onClick={CliamMarketReward}>Claim </button>
                    </div>
                </div>
                

                <div className="stat">
                    <div className="stat-title">Market Rewards</div>
                    <div className="stat-value">${marketReward} <Image src={Avax} width={25} height={25}/></div>
                    <div className="stat-actions">
                        <button className="btn" onClick={CliamMintReward}>Claim</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Claim;