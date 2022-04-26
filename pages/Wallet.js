import CardWalletNft from "../components/CardWalletNft";
import Claim from "../components/Claim";
import WalletNftModel from "../components/WalletNftModel";

import React, {useState, useEffect} from 'react'
import { useMoralis } from "react-moralis"
import {cryptoboysAddress, chain, MORALIS_SERVER_URL, MORALIS_APPLICATION_ID } from "../config"

const Wallet = () => {

    const { account, Moralis } = useMoralis();
    const [ nfts, setNFTs ] = useState([]);

    const startOptions = {
        appId : MORALIS_APPLICATION_ID,
        serverUrl : MORALIS_SERVER_URL,
    }

    useEffect( async () => {
        await allNFTs();
    }, [account]);

    const allNFTs = async () => {

        await Moralis.start(startOptions);
        
        const options = {
            address: account,
            token_address: cryptoboysAddress,
            chain: chain,
        };
        
        const allCryptoBoys = await Moralis.Web3API.account.getNFTsForContract(options);
        
        let arr = [];
        allCryptoBoys.result.forEach(function(nft){

            let url = fixUrl(nft.token_uri);
            
            fetch(url)
            .then(res => res.json())
            .then(data => {

                var newElement = {
                    'img' : fixUrl(data.image),
                    'name': data.name,
                    'id'  : nft.token_id,
                }
                arr.push(newElement);
            });
        })
        console.log(arr);
        setNFTs(arr);
    };

    function fixUrl(url) {
        if (url.startsWith("ipfs")) {
            return "https://gateway.pinata.cloud/ipfs/" + url.split("ipfs://")[1];
        } else {
            if (url.endsWith("json")) {
                return url + "?format=json";
            }else {
                return url + ".json?format=json";
            }
        }
    };

    return ( 
        <div className="hero min-h-screen bg-base-200 ">
            <div className="text-center w-[90%] xl:w-[70%] my-10 ">
                <Claim/>
                <div className="flex flex-col justify-center items-center">                             
                    <div class="flex flex-row flex-wrap card rounded-box place-items-center borde  justify-center items-center">
                        {nfts.length > 0 ? (
                            nfts.sort((a, b) => (a.id > b.id) ? 1 : -1).map((cryptoboy, index) => {
                                return (
                                    <CardWalletNft key={index} img={cryptoboy.img} id={cryptoboy.id} name={cryptoboy.name} />
                                );
                            })
                        ):null}
                    </div>
                    <WalletNftModel/>
                </div>
            </div>
        </div>
    );
}
 
export default Wallet;