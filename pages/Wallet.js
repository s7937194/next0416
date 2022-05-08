import CardWalletNft from "../components/CardWalletNft";
import Claim from "../components/Claim";
import WalletNftModel from "../components/WalletNftModel";

import React, {useState, useEffect} from 'react'
import { useMoralis } from "react-moralis"
import {cryptoboysAddress, chain, MORALIS_SERVER_URL, MORALIS_APPLICATION_ID } from "../config"

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

        // const totalNum = NFTs.total;
        // const pageSize = NFTs.page_size;
        // console.log(totalNum);
        // console.log(pageSize);
        let allNFTs = NFTs.result;

        let nftResult = [];
        let metadata = allNFTs.map((e) => JSON.parse(e.metadata));
        for (let j = 0; j < metadata.length; j++) {
            if (allNFTs[j].metadata) {
                allNFTs[j].metadata = JSON.parse(allNFTs[j].metadata);
                allNFTs[j].image = resolveLink(allNFTs[j].metadata.image);
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
        
            nftResult.push({
                name: allNFTs[j].name,
                token_id: allNFTs[j].token_id,
                image: allNFTs[j].image,
            });
        }
        setNFTResult(nftResult);
    };

    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    return ( 
        <div className="hero min-h-screen bg-base-200 ">
            <div className="text-center w-[90%] xl:w-[70%] my-10 ">
                <Claim/>
                <div className="flex flex-col justify-center items-center">                             
                    <div className="flex flex-row flex-wrap card rounded-box place-items-center borde  justify-center items-center">
                        { NFTResult.length > 0 &&
                            NFTResult.map((nft, index) => {
                                return (
                                    <CardWalletNft key={index} tokenId={nft.token_id} src={nft.image} name={nft.name}/>
                                );
                            })
                        }
                    </div>
                    { NFTResult.length > 0 ? (
                        NFTResult.map((nft, index) => {
                            return (
                                <WalletNftModel key={index} tokenId={nft.token_id}/>
                            );
                        })
                    ) : null }
                </div>
            </div>
        </div>
    );
}
 
export default Wallet;