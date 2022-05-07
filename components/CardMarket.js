import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

import { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import {marketAddress, cryptoboysAddress, chain} from "../config"
import MarketContract from "../abis/Market.json"

const CardMarket = ({src="", tokenId="", name="", rarity="Common"}) => {

    const { account, Moralis } = useMoralis();
    const [nft, setNft] = useState();
    const Web3Api = useMoralisWeb3Api();

    const getListing = async (id) => {

        const ercOpts = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const listItem = await Moralis.executeFunction({
            functionName: "listings",
            params : { "": id },
            ...ercOpts,
        });
        setNft(listItem);
    }

    useEffect( async () => {
        let isMounted = false;

        if (!isMounted) {
            await getListing(tokenId);
        }

        return () => {
            isMounted = true;
        }
    }, [account]);

    return ( 
        <label htmlFor={"MarketNftModel_"+tokenId} className=" modal-button">
            <div className="card card-compact w-[300px] bg-base-100 shadow-xl  my-2 mx-2 hover:scale-105">
                <figure><img className="w-[300px] h-[300px]" src={src} alt={name} /></figure>
                <div className="card-body">
                    <div className="card-actions justify-center items-center">
                        <h2 className="card-title">{name} #{tokenId}</h2>
                        <div className="text-blue-600 bg-slate-200 rounded-xl px-3">
                            {rarity}
                        </div>
                    </div>
                    <div className="bg-green-600 rounded-xl p-2 text-lg font-semibold text-white">
                        For Sale
                    </div>

                    <div className="flex justify-between text-lg font-medium">
                        <a>Price</a>
                        <a className="">{nft && nft.price.toString()} <Image src={Avax} width={15} height={15}/></a>
                    </div>
                    <div className="flex justify-between text-lg font-medium">
                        <a>Last Price</a>
                        <a>0 <Image src={Avax} width={15} height={15}/></a>
                    </div>
                </div>
            </div>
        </label>
    )
}
 
export default CardMarket;