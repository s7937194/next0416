import { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import {cryptoboysAddress, marketAddress, chain, MORALIS_SERVER_URL, MORALIS_APPLICATION_ID, collectionName } from "../config"

export const GenerateRarity = async () => {
    
    console,log("generateRarity");

    const Web3Api = useMoralisWeb3Api();
    const NFTs = await Web3Api.account.getNFTsForContract({
        address: marketAddress,
        token_address: cryptoboysAddress,
        chain: chain,
    });

    let allNFTs = NFTs.result;
    console.log(allNFTs);

    for (let i = 0; i < allNFTs.length; i++) {
        const nft = allNFTs[i];
        console,log(nft);
    }

    return true;
}
