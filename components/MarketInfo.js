import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'
import React, {useState, useEffect} from 'react'

import { useMoralis } from "react-moralis"
import {cryptoboysAddress, marketAddress, chain } from "../config"
import MarketContract from "../abis/Market.json"

const MarketInfo = () => {

    const { Moralis } = useMoralis();
    const [ totalActiveListings, setTotalActiveListings ] = useState(0);
    const [ totalSales, setTotalSales ] = useState(0);
    const [ highestSalePrice, setHighestSalePrice ] = useState(0);
    const [ ownerCount, setOwnerCounts ] = useState(0);

    useEffect( async () => {
        await getTotalActiveListings();
        await getTotalSales();
        await getHighestSalePrice();
        await getNFTOwners();
    }, []);

    const getTotalActiveListings = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const resp = await Moralis.executeFunction({
            functionName: "totalActiveListings",
            ...options,
        });

        setTotalActiveListings(resp.toNumber());
    }

    const getHighestSalePrice = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const resp = await Moralis.executeFunction({
            functionName: "highestSalePrice",
            ...options,
        });

        setHighestSalePrice(resp.toNumber());
    }

    const getTotalSales = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };

        const resp = await Moralis.executeFunction({
            functionName: "totalSales",
            ...options,
        });

        setTotalSales(resp.toNumber());
    }

    const getNFTOwners = async () => {
        const options = { address: cryptoboysAddress, chain: chain };
        const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);

        let arr1 = [];
        nftOwners.result.forEach(async (nftInfo) => {
            if (!arr1.includes(nftInfo.owner_of)) {
                arr1.push(nftInfo.owner_of);
            }
        });
        setOwnerCounts(arr1.length);
    }

    return (
        <section className="w-full mb-6  text-center shadow stats  py-10 ">
                
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-2 lg:gap-x-0 items-center">
                <div className="mb-6 lg:mb-0 relative">
                <h6 className="font-medium text-gray-500">Total Volume</h6>
                <h5 className="text-2xl   font-bold ">{totalSales}<Image src={Avax} width={20} height={20} /></h5>

                <hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
                </div>

                <div className="mb-6 lg:mb-0 relative">
                <h6 className="font-medium text-gray-500">Total Sales</h6>
                <h5 className="text-2xl   font-bold ">{totalActiveListings}</h5>

                <hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
                </div>

                <div className="mb-6 md:mb-0 relative">
                <h6 className="font-medium text-gray-500">Highest Sale Price</h6>
                <h5 className="text-2xl   font-bold ">{highestSalePrice} <Image src={Avax} width={20} height={20} /></h5>

                <hr className="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
                </div>

                <div className="mb-6 md:mb-0 relative">
                <h6 className="font-medium text-gray-500 ">Holder</h6>
                <h5 className="text-2xl   font-bold ">{ownerCount}</h5>
                </div>
            </div>
        </section>
    );
}
 
export default MarketInfo;