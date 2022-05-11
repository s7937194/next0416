import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'
import React, {useState, useEffect} from 'react'
import {useMoralis} from "react-moralis"
import {MORALIS_SERVER_URL, MORALIS_APPLICATION_ID,collectionName} from "../config"

const FloorPrice = () => {

    const [commonPrice, setCommonPrice] = useState(0);
    const [uncommonPrice, setUnCommonPrice] = useState(0);
    const [rarePrice, setRarePrice] = useState(0);
    const [mysticPrice, setMysticPrice] = useState(0);
    const [legendaryPrice, setLegendaryPrice] = useState(0);

    const { account, Moralis } = useMoralis();

    useEffect( async () => {
        let isMounted = false;

        if (!isMounted) {
            await getFloorPrice();
        }

        return () => {
            isMounted = true;
        }
    }, [account]);

    const getFloorPrice = async () => {
        const startOptions = {
            appId : MORALIS_APPLICATION_ID,
            serverUrl : MORALIS_SERVER_URL,
        }
        await Moralis.start(startOptions);

        const dbNFTs = Moralis.Object.extend(collectionName+"_price");
        const query = new Moralis.Query(dbNFTs);
        let results = await query.equalTo("RarityTag", "Common").ascending("SalePrice").first();
        if (results) {
            setCommonPrice(results.attributes.SalePrice);
        }

        results = await query.equalTo("RarityTag", "Uncommon").ascending("SalePrice").first();
        if (results) {
            setUnCommonPrice(results.attributes.SalePrice);
        }

        results = await query.equalTo("RarityTag", "Rare").ascending("SalePrice").first();
        if (results) {
            setRarePrice(results.attributes.SalePrice);
        }

        results = await query.equalTo("RarityTag", "Mystic").ascending("SalePrice").first();
        if (results) {
            setMysticPrice(results.attributes.SalePrice);
        }

        results = await query.equalTo("RarityTag", "Legendary").ascending("SalePrice").first();
        if (results) {
            setLegendaryPrice(results.attributes.SalePrice);
        }
    };


    return ( 
        <section className="w-full mb-10  text-center shadow stats py-2 ">
            <div className="  grid md:grid-cols-2 lg:grid-cols-5 grid-cols-2 lg:gap-x-0 items-center">
                <div className="stat">
                    <div className="  text-green-600 ">Common</div>
                    <div className="text-2xl   font-bold ">{commonPrice} <Image src={Avax} width={20} height={20} /></div>
                
                </div>
                <div className="stat">
                    <div className=" text-blue-600">Uncommon</div>
                    <div className="text-2xl   font-bold ">{uncommonPrice} <Image src={Avax} width={20} height={20} /></div>
                </div>
                <div className="stat">
                    <div className=" text-red-600">Rare</div>
                    <div className="text-2xl   font-bold ">{rarePrice} <Image src={Avax} width={20} height={20} /></div>
                </div>
                <div className="stat">
                    <div className=" text-purple-600">Mystic</div>
                    <div className="text-2xl   font-bold ">{mysticPrice} <Image src={Avax} width={20} height={20} /></div>
                </div>
                <div className="stat">
                    <div className="e text-yellow-600">Legendary</div>
                    <div className="text-2xl   font-bold ">{legendaryPrice} <Image src={Avax} width={20} height={20} /></div>
                </div>
            </div>
        </section>
    );
}
 
export default FloorPrice;