import Image from 'next/image';
import { useState, useEffect } from 'react';
import Avax from  '../assets/image/avax.svg'

import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import {cryptoboysAddress, marketAddress, chain, collectionName } from "../config"
import MarketContract from "../abis/Market.json"
import NFTContract from "../abis/CryptoBoys.json"
import { resolveLink, getEllipsisTxt } from "../helpers/formatters";

const WalletNftModel = ({tokenId=""}) => {

    const [detailSwitch,setDetailSwitch] = useState(false)
    const [nft, setNft] = useState();
    const [nftDetail, setNftDetail] = useState();
    const [price, setPrice] = useState(1);

    const { account, Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const headleDetailSwitch = () =>{
        if (detailSwitch) setDetailSwitch(false)
        else setDetailSwitch(true)
    }

    const handleSelectToken = async (num) => {
        if (num && collectionName) {
            const dbNFTs = Moralis.Object.extend(collectionName);
            const query = new Moralis.Query(dbNFTs);
            query.equalTo("tokenId", num);
            let selectedNFT = await query.first();

            if (selectedNFT != null) {
                selectedNFT = selectedNFT.attributes;
                // console.log(selectedNFT);
                setNft(selectedNFT);
                // setDetailSwitch(true);
            }
        }
        // if (num) {
        //     const options = {
        //         address: cryptoboysAddress,
        //         token_id: tokenId,
        //         chain: chain,
        //     };
        //     const tokenIdMetadata = await Web3Api.token.getTokenIdMetadata(options);
        //     let metadata = JSON.parse(tokenIdMetadata.metadata)

        //     console.log(metadata);
        //     setNft(metadata);
        // }
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

    const listNFT = async (tokenId) => {
        await Moralis.enableWeb3();

        const ercOpts = {
            contractAddress: cryptoboysAddress,
            abi: NFTContract,
        };

        const isApprove = await Moralis.executeFunction({
            functionName: "isApprovedForAll",
            params : {operator : marketAddress, owner : account},
            ...ercOpts,
        });

        // if (isApprove == false) {
        //     const setApprove = await Moralis.executeFunction({
        //         functionName: "setApprovalForAll",
        //         params : {operator : marketAddress, approved : true},
        //         ...ercOpts,
        //     });
    
        //     await setApprove.wait();
        // }
        const setApprove = await Moralis.executeFunction({
            functionName: "approve",
            params : {to : marketAddress, tokenId : tokenId},
            ...ercOpts,
        });

        const resp = await setApprove.wait();

        const MarketOpts = {
            contractAddress: marketAddress,
            abi: MarketContract,
        };
        
        const addListing = await Moralis.executeFunction({
            functionName: "addListing",
            params : {
                tokenId : tokenId, 
                price : Moralis.Units.ETH(price)
            },
            ...MarketOpts,
        });
        const respListing = await addListing.wait();
        console.log(respListing);
        window.location.reload()
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
            <input type="checkbox" id={"WalletNftModel_"+tokenId} className="modal-toggle"/>
            {nft && nftDetail && (
                <div className="modal bg-black bg-opacity-80" htmlFor={"WalletNftModel_"+tokenId}>
                <div className="modal-box">
                    <div className="flex justify-between items-center pb-2">
                        <a className="underline" target="_blank">
                            <strong className="text-2xl">{`${collectionName} #${nft.tokenId}`}</strong>
                        </a>
                        
                        <label htmlFor={"WalletNftModel_"+tokenId}>
                            <svg className="cursor-pointer fill-current w-md h-md" fill="#d2cfca" width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"> 
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L9 8.29289L16.6464 0.646447C16.8417 0.451184 17.1583 0.451184 17.3536 0.646447C17.5488 0.841709 17.5488 1.15829 17.3536 1.35355L9.70711 9L17.3536 16.6464C17.5488 16.8417 17.5488 17.1583 17.3536 17.3536C17.1583 17.5488 16.8417 17.5488 16.6464 17.3536L9 9.70711L1.35355 17.3536C1.15829 17.5488 0.841709 17.5488 0.646447 17.3536C0.451184 17.1583 0.451184 16.8417 0.646447 16.6464L8.29289 9L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" />
                            </svg>
                        </label>
                    </div>
                        

                    <div className="px-md">
                        <div className="flex gap-x-md mb-8" >
                            <div className="relative h-[200px] xs:h-[120px]">
                                <figure><img className="w-[200px] h-[200px] rounded-xl" src={nft.image} alt={`${collectionName} #${nft.tokenId}`} /></figure>
                            </div>
                            <div className="flex justify-between items-start ml-6 flex-col">
                                <div className="flex flex-col text-md w-full">
                                    <span className="flex flex-wrap pb-xs xs:pb-0 my-1">
                                        <strong>Rarity: &nbsp;</strong>
                                        <div className="text-blue-600 bg-slate-200 rounded-xl px-3">
                                                {nft.rarity && (
                                                    nft.rarity.toFixed(1)
                                                )}
                                        </div>
                                    </span>

                                    <span className="flex flex-wrap pb-xs xs:pb-0 my-1">
                                        <strong>Last Price: &nbsp;</strong>
                                        <a> {nft.price} <Image src={Avax} width={13} height={13}/></a>
                                    </span>
                                </div>

                                <label htmlFor={"my-modal_"+tokenId} className="btn btn-primary rounded-full text-xl px-10 modal-button capitalize">
                                    List NFT
                                </label>

                                <input type="checkbox" id={"my-modal_"+tokenId}  className="modal-toggle"/>
                                <div className="modal">
                                    <div className="modal-box">
                                        <div className="form-control w-full  flex justify-center">
                                                <h3 className="font-bold text-2xl mb-5 mt-5">Sell your NFT on the marketplace</h3>
                                                <div>
                                                    <input defaultValue={price} onChange={event => setPrice(event.target.value)} type="number" placeholder="1" className="input input-bordered w-[60%] "/>
                                                </div>
                                                <span className="label-text-alt">Price in AVAX</span>
                                                
                
                                        </div>

                                        <div className="modal-action flex justify-center">
                                                <label onClick={() => listNFT(tokenId)} className="btn btn-primary capitalize ">List</label>
                                                <label htmlFor={"my-modal_"+tokenId}  className="btn capitalize ">Cancel</label>
                                        </div>
                                    </div>
                                </div>
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
                                {nft.attributes && 
                                    nft.attributes.map((e, index) => {
                                        return (
                                            <div key={index}  className="flex items-center text-xs xs:text-[10px] rounded-xl border overflow-hidden border-solid mr-2 mb-2">
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

                            {nftDetail && 
                                nftDetail.map((e, index) => {

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
                                })
                            }
                                
                            </div>
                            {/*this */}
                        </div>
                        }
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
 
export default WalletNftModel;