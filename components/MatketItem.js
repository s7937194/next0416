import CardMarket from "./CardMarket";
import MarketNftModel from './MarketNftModel';
import { useState } from 'react';
import RecentModel from "./RecentModel";

const MarketItem = () => {

    const [forSale, setForSale] = useState(true)

    const handleForSale = () => {
        setForSale(true)
    }
    const handleForAll = () => {
        setForSale(false)
    }


    return ( 
        <div>
            <div className="flex flex-col w-full lg:flex-row ">

                {/* Filters */}
                <div className="grid flex-grow card rounded-box stats shadow h-[730px] mr-2">
                        <div className="w-full text-center">
                            <div className="grid md:grid-cols-1  lg:gap-x-0 items-center ">
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
                                    <input type="text" placeholder="Search for ID" className="input input-bordered w-full max-w-xs"/>
                                </div>

                                <div className="stat">
                                    <select className="select select-bordered w-full ">
                                        <option disabled selected>Rarity</option>
                                        <option>Han Solo</option>
                                        <option>Greedo</option>
                                    </select>
                                </div>

                                <div className="stat">
                                    <select className="select select-bordered w-full ">
                                        <option disabled selected>Hard</option>
                                        <option>Han Solo</option>
                                        <option>Greedo</option>
                                    </select>
                                </div>
                                <div className="stat">
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
                                </div>
                                <div className="stat flex justify-center">
                                    <label  for="recentModel" className="btn  modal-button btn-outline mt-10  text-sm ">VIEW RECENT SALES</label>
                                </div>
                            </div>
                        </div>
                </div> 

                <div className="divider lg:divider-horizontal"></div> 

                {/* NFT */}
                
                <div className="flex flex-col justify-center items-center">

                    <div className="grid  md:grid-cols-2 xl:grid-cols-4 card rounded-box place-items-center borde">
                        <CardMarket /> 
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                        <CardMarket />
                    </div>

                    {/* Page */}
                    <div className="btn-group mt-6 flex justify-center items-center">
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
                    </div>
                </div>

                {/* Model 彈窗*/}
                <MarketNftModel />
                <RecentModel />


            </div>
        </div>
    );
}
 
export default MarketItem;