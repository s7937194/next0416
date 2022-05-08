import CardMarket from "./CardMarket";
import MarketNftModel from './MarketNftModel';
import RecentModel from "./RecentModel";


import React, {useState, useEffect} from 'react'
import { useMoralis } from "react-moralis"
import {cryptoboysAddress, marketAddress, chain, MORALIS_SERVER_URL, MORALIS_APPLICATION_ID, collectionName } from "../config"

const MarketItem = () => {

    const { account, Moralis } = useMoralis();
    const [NFTResult, setNFTResult] = useState([]);
    const [forSale, setForSale] = useState(true);
    const handleForSale = () => {
        setForSale(true)
    }
    const handleForAll = () => {
        setForSale(false)
    }

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
            address: marketAddress,
            token_address: cryptoboysAddress,
            chain: chain,
        };

        const NFTs = await Moralis.Web3API.account.getNFTsForContract(options);
        // console.log(NFTs);
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

    const handleSelectToken = async (num, col) => {
        if (num && col) {
            const dbNFTs = Moralis.Object.extend(col);
            const query = new Moralis.Query(dbNFTs);
            console.log(num);
            query.equalTo("tokenId", num);
            let selectedNFT = await query.first();
            selectedNFT = selectedNFT.attributes;
            console.log(selectedNFT);
            setNFTResult([{
                name: collectionName,
                token_id: selectedNFT.tokenId,
                image: selectedNFT.image,
            }]);
        }
    };

    const handleSelectByRarity = async (rarityTag) => {
        if (rarityTag) {
            const dbNFTs = Moralis.Object.extend(collectionName);
            const query = new Moralis.Query(dbNFTs);
            query.equalTo("rarityTag", rarityTag);
            let selectedList = await query.find();
            
            let nftResult = [];
            for (let i = 0; i < selectedList.length; i++) {

                let selectedNFT = selectedList[i].attributes;
                nftResult.push({
                    name: collectionName,
                    token_id: selectedNFT.tokenId,
                    image: selectedNFT.image,
                    rarity_tag: selectedNFT.rarityTag,
                });
            }
            setNFTResult(nftResult);
        }
    };

    const handleSelectByAttr = async (attr) => {
        if (attr) {
            console.log(attr);
            const dbNFTs = Moralis.Object.extend(collectionName);
            const query = new Moralis.Query(dbNFTs);
            query.containedIn("attributes", [attr]);

            let selectedList = await query.find();
            console.log(selectedList);
            // selectedNFT = selectedNFT.attributes;
            let nftResult = [];
            for (let i = 0; i < selectedList.length; i++) {

                let selectedNFT = selectedList[i].attributes;
                nftResult.push({
                    name: collectionName,
                    token_id: selectedNFT.tokenId,
                    image: selectedNFT.image,
                    rarity_tag: selectedNFT.rarityTag,
                });
            }
            console.log(nftResult);
            setNFTResult(nftResult);
        }
    };

    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };


    return ( 
        <div>
            <div className="flex flex-col w-full lg:flex-row ">

                {/* Filters */}
                <div className="card rounded-box stats shadow h-[730px] lg:w-[300px]">
                        <div className="w-full text-center">
                            <div className="grid md:grid-cols-1 items-center ">
                                <div className="stat">
                                    <select className="select select-bordered w-full ">
                                            <option disabled selected>Sort</option>
                                            <option>Han Solo</option>
                                            <option>Greedo</option>
                                    </select>
                                </div>

                                <div className="divider m-0"/>

                                <div className="  flex justify-end mx-4 ">
                                    <button className=" w-[100px] btn-outline rounded-full">Clear filters</button>
                                </div>
                                

                                <div className="stat ">
                                    { forSale ? (
                                        <div  className="btn-group ">
                                            <button onClick={handleForSale} className="btn btn-active w-1/2 normal-case">For Sale</button>
                                            <button onClick={handleForAll} className="btn w-1/2 normal-case ">Shaw All</button>
                                        </div>
                                    ):(
                                        <div  className="btn-group ">
                                            <button onClick={handleForSale} className="btn  w-1/2 normal-case">For Sale</button>
                                            <button onClick={handleForAll} className="btn btn-active w-1/2 normal-case ">Shaw All</button>
                                        </div>
                                    )}
                                    
                                </div>

                                <div className="stat">
                                    <input type="text" placeholder="Search for ID" className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => {
                                            if (e.target.value != "") {
                                                handleSelectToken(e.target.value, collectionName)
                                            }
                                        }}
                                    />
                                </div>

                                <div className="stat">
                                    <select className="select select-bordered w-full "
                                        onChange={(e) => {
                                            handleSelectByRarity(e.target.value)
                                        }}>
                                        <option disabled selected>Rarity</option>
                                        <option value="Lengendary">Lengendary</option>
                                        <option value="Mystic">Mystic</option>
                                        <option value="Rare">Rare</option>
                                        <option value="Uncommon">Uncommon</option>
                                        <option value="Common">Common</option>
                                    </select>
                                </div>

                                <div className="stat">
                                    <select className="select select-bordered w-full "
                                    onChange={(e) => {
                                        handleSelectByAttr(e.target.value)
                                    }}>
                                        <option disabled selected>Eyeball</option>
                                        <option value="White">White</option>
                                        <option value="Yellow">Yellow</option>
                                        <option value="Red">Red</option>
                                        
                                    </select>
                                </div>
                                {/* <div className="stat">
                                    <select className="select select-bordered w-full ">
                                        <option disabled selected>Body</option>
                                        <option>Han Solo</option>
                                        <option>Greedo</option>
                                    </select>
                                </div>
                                <div className="stat">
                                    <select className="select select-bordered w-full ">
                                        <option disabled selected>Hat</option>
                                        <option>Han Solo</option>
                                        <option>Greedo</option>
                                    </select>
                                </div> */}
                                <div className="stat flex justify-center">
                                    <label  htmlFor="recentModel" className="btn  modal-button btn-outline mt-10  text-sm ">VIEW RECENT SALES</label>
                                </div>
                            </div>
                        </div>
                </div> 

                <div className="divider lg:divider-horizontal"></div> 

                {/* NFT */}
                
                <div className="flex flex-col justify-center items-center basis-10/12">

                    <div className="flex flex-row flex-wrap card rounded-box place-items-center borde  justify-center items-center">
                        { NFTResult.length > 0 && NFTResult.map((nft, index) => {
                            return (
                                <CardMarket key={index} tokenId={nft.token_id} src={nft.image} name={nft.name} rarity={nft.rarity_tag}/>
                            );
                        }) }
                    </div>

                    {/* Page */}
                    {/* <div className="btn-group mt-6 flex justify-center items-center">
                        <button className="btn">«</button>
                        <button className="btn">-100</button>
                        <button className="btn">-50</button>
                        <button className="btn">-25</button>
                        <button className="btn">‹</button>
                        <button className="btn">›</button>
                        <button className="btn">+25</button>
                        <button className="btn">+50</button>
                        <button className="btn">+100</button>
                        <button className="btn">»</button>
                    </div> */}
                </div>

                {/* Model 彈窗*/}
                { NFTResult.length > 0 && NFTResult.map((nft, index) => {
                    return (
                        <MarketNftModel key={index} tokenId={nft.token_id} src={nft.image} name={nft.name}/>
                    );
                }) }
                {/* { NFTResult.length > 0 && NFTResult.map((nft, index) => {
                    return (
                        <RecentModel key={index} tokenId={nft.token_id} src={nft.image} name={nft.name}/>
                    );
                }) } */}

            </div>
        </div>
    );
}
 
export default MarketItem;