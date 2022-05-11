import CardWalletNft from "../components/CardWalletNft";
import Claim from "../components/Claim";
import WalletNftModel from "../components/WalletNftModel";

import React, {useState, useEffect} from 'react'
import { useMoralis } from "react-moralis"
import {cryptoboysAddress, chain, MORALIS_SERVER_URL, MORALIS_APPLICATION_ID, collectionName, RarityPrice} from "../config"
import { resolveLink, attributesRarityPrice, getRarityTag } from "../helpers/formatters";

const Wallet = () => {

    const { account, Moralis } = useMoralis();
    const [NFTResult, setNFTResult] = useState([]);

    useEffect( async () => {
        let isMounted = false;

        if (!isMounted) {
            await allNFTs();
        }

        return () => {
            isMounted = true;
        }
    }, [account]);

    const allNFTs = async () => {
        const startOptions = {
            appId : MORALIS_APPLICATION_ID,
            serverUrl : MORALIS_SERVER_URL,
        }
        await Moralis.start(startOptions);
        
        const options = {
            address: account,
            token_address: cryptoboysAddress,
            chain: chain,
        };

        const NFTs = await Moralis.Web3API.account.getNFTsForContract(options);
        let allNFTs = NFTs.result;
        let nftResult = [];
        let metadata = allNFTs.map((e) => JSON.parse(e.metadata));
        for (let j = 0; j < metadata.length; j++) {
            if (allNFTs[j].metadata) {
                allNFTs[j].metadata = JSON.parse(allNFTs[j].metadata);
                allNFTs[j].image = resolveLink(allNFTs[j].metadata.image);
                allNFTs[j].attributes = resolveLink(allNFTs[j].metadata.attributes);
            } else if (allNFTs[j].token_uri) {
                try {
                    await fetch(allNFTs[j].token_uri)
                    .then((response) => response.json())
                    .then((data) => {
                        allNFTs[j].image = resolveLink(data.image);
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            await saveDB(allNFTs[j]);

            nftResult.push({
                name: allNFTs[j].name,
                token_id: allNFTs[j].token_id,
                image: allNFTs[j].image,
                attributes: allNFTs[j].attributes,
            });
        }
        setNFTResult(nftResult);
    };

    async function saveDB(nftData) {
        // console.log(nftData);

        const dbNFTs = Moralis.Object.extend(collectionName);
        const query = new Moralis.Query(dbNFTs);
        
        let selectedNFT = await query.equalTo("tokenId", nftData.token_id).first();
        if (!selectedNFT) {
            const newClass = Moralis.Object.extend(collectionName);
            const newObject = new newClass();

            if (nftData.metadata) {
                let attr = nftData.metadata.attributes;
                for (let j = 0; j < attr.length; j++) {
                    let key = attr[j].trait_type;
                    let value = attr[j].value;
                    newObject.set(key, value);
                }
                newObject.set("attributes", attr);

                let rarity = attributesRarityPrice(RarityPrice, attr).toString();
                let rarityTag = getRarityTag(parseInt(rarity));
                newObject.set("Rarity", rarity);
                newObject.set("RarityTag", rarityTag);
            }
            newObject.set("tokenId", nftData.token_id);
            newObject.set("image", nftData.image);
            newObject.set("isForSale", false);

            await newObject.save();
        }
    } 

    return ( 
        <div className="hero min-h-screen bg-base-200 ">
            <div className="text-center w-[90%] xl:w-[70%] my-10 ">
                <Claim/>
                <div className="flex flex-col justify-center items-center">                             
                    <div className="flex flex-row flex-wrap card rounded-box place-items-center borde  justify-center items-center">
                        { NFTResult.length > 0 &&
                            NFTResult.sort((a, b) => (a.token_id > b.token_id) ? 1 : -1).map((nft, index) => {
                                return (
                                    <CardWalletNft key={index} nftData={nft}/>
                                );
                            })
                        }
                    </div>
                    { NFTResult.length > 0 ? (
                        NFTResult.map((nft, index) => {
                            return (
                                <WalletNftModel key={index} nftData={nft}/>
                            );
                        })
                    ) : null }
                </div>
            </div>
        </div>
    );
}
 
export default Wallet;