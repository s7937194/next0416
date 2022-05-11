import Image from 'next/image';
import { useState, useEffect } from 'react';
import Avax from  '../assets/image/avax.svg'

import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import {cryptoboysAddress, marketAddress, chain, collectionName } from "../config"
import MarketContract from "../abis/Market.json"
import NFTContract from "../abis/CryptoBoys.json"
import { resolveLink, getEllipsisTxt } from "../helpers/formatters";

const MarketNftModel = ({src="", tokenId="", name="", rarity="Common", isForSale=false}) => {

    const [detailSwitch, setDetailSwitch] = useState(false)
    const [nft, setNft] = useState();
    // const [nftInContract, setNftInContract] = useState();
    const [nftDetail, setNftDetail] = useState();
    const [price, setPrice] = useState(0);
    const [lastPrice, setLastPrice] = useState(0);

    const { account, Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const ercOpts = {
        contractAddress: marketAddress,
        abi: MarketContract,
    };

    const headleDetailSwitch = () =>{
        if (detailSwitch) setDetailSwitch(false)
        else setDetailSwitch(true)
    }

    const handleSelectToken = async (num) => {
        if (num && collectionName && isForSale) {
            try {
                // const listItem = await Moralis.executeFunction({
                //     functionName: "listings",
                //     params : { "": num },
                //     ...ercOpts,
                // });
                // setNftInContract(listItem);
                // setPrice(listItem.price.toString());
                if (isForSale){
                    const dbNFTs = Moralis.Object.extend(collectionName+"_price");
                    const query = new Moralis.Query(dbNFTs);
                    let results = await query.equalTo("tokenId", num).limit(2).descending("createAt").find();
                    
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

            } catch (err) {
                console.log("Error getting listings"+ err.message);
            }

            const dbNFTs = Moralis.Object.extend(collectionName);
            const query = new Moralis.Query(dbNFTs);
            query.equalTo("tokenId", num);
            let selectedNFT = await query.first();

            if (selectedNFT != null) {
                selectedNFT = selectedNFT.attributes;
            } else {
                selectedNFT = {
                    tokenId: num,
                    image: "",
                }
            }
            setNft(selectedNFT);
        }
    }

    const handleTokenDetail = async (tokenId) => {
        const options = {
            address: cryptoboysAddress,
            token_id: tokenId,
            chain: chain,
        };

        try {
            const tokenIdMetadata = await Web3Api.token.getWalletTokenIdTransfers(options);
            if (tokenIdMetadata) {
                // console.log(tokenIdMetadata.result);
                setNftDetail(tokenIdMetadata.result);
            }
        } catch {
            console.log("err: "+ tokenId);
        }
    }

    const buyNFT = async (tokenId) => {
        if (tokenId){
            try {
                const fill = await Moralis.executeFunction({
                    functionName: "fulfillListing",
                    params : { "id": tokenId },
                    msgValue: Moralis.Units.ETH(price),
                    ...ercOpts,
                });
                await fill.wait();
                console.log("buy success" + fill);
            } catch (err) {
                console.log("Error:"+ err.message);
            }
        }
    }

    useEffect( async () => {
        let isMounted = false;

        if (!isMounted) {
            await handleSelectToken(tokenId);
            await handleTokenDetail(tokenId);
        }

        return () => {
            isMounted = true;
        }
    }, [account]);

    return ( 
        <div>
            <input type="checkbox" id={"MarketNftModel_"+tokenId} className="modal-toggle"/>
            
            <div className="modal bg-black bg-opacity-80" htmlFor={"MarketNftModel_"+tokenId}>
                <div className="modal-box">
                    <div className="flex justify-between items-center pb-2">
                        <a className="underline" target="_blank">
                            <strong className="text-2xl">{`${collectionName} #${tokenId}`}</strong>
                        </a>
                        
                        <label htmlFor={"MarketNftModel_"+tokenId} >
                            <svg className="cursor-pointer fill-current w-md h-md" fill="#d2cfca" width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"> 
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L9 8.29289L16.6464 0.646447C16.8417 0.451184 17.1583 0.451184 17.3536 0.646447C17.5488 0.841709 17.5488 1.15829 17.3536 1.35355L9.70711 9L17.3536 16.6464C17.5488 16.8417 17.5488 17.1583 17.3536 17.3536C17.1583 17.5488 16.8417 17.5488 16.6464 17.3536L9 9.70711L1.35355 17.3536C1.15829 17.5488 0.841709 17.5488 0.646447 17.3536C0.451184 17.1583 0.451184 16.8417 0.646447 16.6464L8.29289 9L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" />
                            </svg>
                        </label>
                    </div>
                    

                    <div className="px-md">
                        <div className="flex gap-x-md mb-8" >
                            <div className="relative h-[200px] xs:h-[120px]">
                                {nft && 
                                    <figure><img className="w-[200px] h-[200px] rounded-xl" src={src} alt={`${collectionName} #${nft.tokenId}`} /></figure>
                                }
                                
                            </div>
                            <div className="flex justify-between items-start ml-6 flex-col">
                                <div className="flex flex-col text-md w-full">
                                    {/* <span className="flex flex-wrap pb-xs xs:pb-0 my-1">
                                        <strong>Owner: &nbsp;</strong>
                                        <a className="underline" href="/">0xa5b7...c68de6</a>
                                    </span>

                                    <span className="flex flex-wrap pb-xs xs:pb-0 my-1">
                                        <strong>Creator: &nbsp;</strong>
                                        <a className="underline" href="/">0xddc1...7de2bc</a>
                                    </span> */}
                                    <span className="flex flex-wrap pb-xs xs:pb-0 my-1">
                                        <strong>Rarity: &nbsp;</strong>
                                        <div className="text-blue-600 bg-slate-200 rounded-xl px-3">
                                                {nft && nft.RarityTag}
                                        </div>
                                    </span>

                                    <span className="flex flex-wrap pb-xs xs:pb-0 my-1">
                                        <strong>Last Price: &nbsp;</strong>
                                        <a> {lastPrice} <Image src={Avax} width={13} height={13}/></a>
                                    </span>
                                </div>

                                <button onClick={() => buyNFT(nft.tokenId)} className="btn rounded-full text-xl px-10">
                                    {price} &nbsp;<Image src={Avax} width={20} height={20}/>&nbsp; BUY
                                </button>
                            </div>
                        </div>

                        
                        {/* 屬性 */}  

                        { !detailSwitch &&
                        <div className="">
                            <div className="tabs">
                                <a className="tab tab-bordered tab-active w-1/2 font-bold text-lg">Details</a> 
                                <a onClick={headleDetailSwitch} className="tab tab-bordered w-1/2 font-bold text-lg">Transactions</a> 
                            </div>
                            <div className="text-xl xs:text-lg mb-xs text-left m-2 font-bold mt-6">Attributes</div>
                            <div className="grid grid-cols-2 gap-y-[4px] gap-x-md xs:gap-xs z-[1]">

                            {nft && nft.attributes && 
                                nft.attributes.map((e, index) => {
                                    return (
                                    <div key={index} className="flex items-center text-xs xs:text-[10px] rounded-xl border overflow-hidden border-solid mr-2 mb-2">
                                        <strong className="uppercase p-2 xs:p-[4px] min-w-[80px] xs:min-w-[60px] h-full bg-primary text-base">{e.trait_type}</strong>
                                        <span className="ml-6 capitalize text-base">{e.value ? e.value : "<null>"}</span>
                                    </div>
                                    )
                                })
                            }  
                            </div>
                        </div>
                        }


                        {/* 交易紀錄 */}  
                        { detailSwitch &&
                        <div className="">
                            <div className="tabs mb-8">
                                <a onClick={headleDetailSwitch} className="tab tab-bordered w-1/2 font-bold text-lg">Details</a> 
                                <a className="tab tab-bordered tab-active w-1/2 font-bold text-lg">Transactions</a> 
                            </div>

                            <div className="pb-4 my-2 border-b-2 border-gray-500">
                            {nftDetail && nftDetail.map((e, index) => {
                                return (
                                    <div key={index}>
                                        <div className="flex   mb-2">
                                            <div className="flex xs:flex-col">
                                                <strong>TX ID: &nbsp;</strong>
                                                <a className="flex mr-2  underline" href="">{getEllipsisTxt(e.transaction_hash)}</a>
                                            </div>
                                            <div className="flex xs:flex-col">
                                                <strong>Token ID: &nbsp;</strong>
                                                <a className="flex mr-2  underline" href="">{e.tokend_id}</a>
                                            </div>
                                            <span className="flex flex-1"></span>
                                            <span className="text-xs "> {e.block_timestamp}</span>
                                        </div>
                                        <div className="flex items-center">         
                                            <div className="flex flex-col ">
                                                <strong>From</strong>
                                                <a className=" underline" href="">{getEllipsisTxt(e.from_address)}</a>
                                            </div>
                                            <div className="px-4 text-2xl xs:px-xs"> »</div>
                                            <div className="flex flex-col ">
                                                <strong>To</strong>
                                                <a className=" underline" href="">{getEllipsisTxt(e.to_address)}</a>
                                            </div>
                                            <div className="flex justify-end flex-1 pr-lg">
                                                <div className="flex items-center ">
                                                        {Moralis.Units.FromWei(e.value)} &nbsp;
                                                        <Image src={Avax} width={13} height={13}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) }
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default MarketNftModel;