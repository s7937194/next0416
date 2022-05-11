import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

import { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import {marketAddress, cryptoboysAddress, chain, collectionName} from "../config"
import MarketContract from "../abis/Market.json"

const CardMarket = ({nftData}) => {

    const { account, Moralis } = useMoralis();
    // const [nft, setNft] = useState();
    const [price, setPrice] = useState(0);
    const [lastPrice, setLastPrice] = useState(0);
    // const Web3Api = useMoralisWeb3Api();

    const getListing = async (id) => {
        if (nftData.isForSale){
            const dbNFTs = Moralis.Object.extend(collectionName+"_price");
            const query = new Moralis.Query(dbNFTs);
            let results = await query.equalTo("tokenId", id).limit(2).descending("createAt").find();
            
            if (results.length == 2) {
                setPrice(results[0].attributes.SalePrice)
                setLastPrice(results[1].attributes.SalePrice)
            } else {
                for (let i = 0; i < results.length; i++) {
                    const obj = results[i].attributes;
                    setPrice(obj.SalePrice);
                }
            }
        }
    }

    useEffect( async () => {
        let isMounted = false;

        if (!isMounted) {
            await getListing(nftData.token_id);
        }

        return () => {
            isMounted = true;
        }
    }, [account]);

    return ( 
        <label htmlFor={"MarketNftModel_"+nftData.token_id} className=" modal-button">
            <div className="card card-compact w-[300px] bg-base-100 shadow-xl  my-2 mx-2 hover:scale-105">
                <figure><img className="w-[300px] h-[300px]" src={nftData.image} alt={nftData.name} /></figure>
                <div className="card-body">
                    <div className="card-actions justify-center items-center">
                        <h2 className="card-title">{nftData.name} #{nftData.token_id}</h2>
                        <div className="text-blue-600 bg-slate-200 rounded-xl px-3">
                            {nftData.rarity}
                        </div>
                    </div>
                    <div className="bg-green-600 rounded-xl p-2 text-lg font-semibold text-white">
                        For Sale
                    </div>

                    <div className="flex justify-between text-lg font-medium">
                        <a>Price</a>
                        <a className="">{price} <Image src={Avax} width={15} height={15}/></a>
                    </div>
                    <div className="flex justify-between text-lg font-medium">
                        <a>Last Price</a>
                        <a>{lastPrice} <Image src={Avax} width={15} height={15}/></a>
                    </div>
                </div>
            </div>
        </label>
    )
}
 
export default CardMarket;