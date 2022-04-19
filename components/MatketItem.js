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
            <div >

                  <div class="flex flex-col w-full lg:flex-row ">

                        {/* Filters */}
                        <div class="  card rounded-box stats shadow h-[730px] lg:w-[300px]">
                              <div class="w-full text-center">
                                    <div class="grid md:grid-cols-1   items-center ">


                                          
                                          <div class="stat">
                                                <select class="select select-bordered w-full ">
                                                      <option disabled selected>Sort</option>
                                                      <option>Han Solo</option>
                                                      <option>Greedo</option>
                                                </select>
                                          </div>

                                          <div class="divider m-0"/>

                                          <div class="  flex justify-end mx-4 ">
                                                <button class=" w-[100px] btn-outline rounded-full">Clear filters</button>
                                          </div>
                                          

                                          <div class="stat ">
                                                { forSale ? (
                                                      <div  class="btn-group ">
                                                            <button onClick={handleForSale} class="btn btn-active w-1/2 normal-case">For Sale</button>
                                                            <button onClick={handleForAll} class="btn w-1/2 normal-case ">Shaw All</button>
                                                      </div>
                                                ):(
                                                      <div  class="btn-group ">
                                                            <button onClick={handleForSale} class="btn  w-1/2 normal-case">For Sale</button>
                                                            <button onClick={handleForAll} class="btn btn-active w-1/2 normal-case ">Shaw All</button>
                                                      </div>
                                                )}
                                                
                                          </div>



                                          

                                          <div class="stat">
                                                <input type="text" placeholder="Search for ID" class="input input-bordered w-full max-w-xs"/>
                                          </div>

                                          <div class="stat">
                                                <select class="select select-bordered w-full ">
                                                      <option disabled selected>Rarity</option>
                                                      <option>Han Solo</option>
                                                      <option>Greedo</option>
                                                </select>
                                          </div>

                                          <div class="stat">
                                                <select class="select select-bordered w-full ">
                                                      <option disabled selected>Hard</option>
                                                      <option>Han Solo</option>
                                                      <option>Greedo</option>
                                                </select>
                                          </div>
                                          <div class="stat">
                                                <select class="select select-bordered w-full ">
                                                      <option disabled selected>Body</option>
                                                      <option>Han Solo</option>
                                                      <option>Greedo</option>
                                                </select>
                                          </div>
                                          <div class="stat">
                                                <select class="select select-bordered w-full ">
                                                      <option disabled selected>Hat</option>
                                                      <option>Han Solo</option>
                                                      <option>Greedo</option>
                                                </select>
                                          </div>
                                          <div class="stat flex justify-center">
                                                <label  for="recentModel" class="btn  modal-button btn-outline mt-10  text-sm ">VIEW RECENT SALES</label>
                                          </div>
                                    </div>
                              </div>
                        </div> 

                        <div class="divider lg:divider-horizontal"></div> 

                        {/* NFT */}
                        
                        <div class="flex flex-col justify-center items-center basis-10/12">

                              <div class="flex flex-row flex-wrap card rounded-box place-items-center borde  justify-center items-center">
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
                              <div class="btn-group mt-6 flex justify-center items-center">
                              <button class="btn">«</button>
                              <button class="btn">-100</button>
                              <button class="btn">-50</button>
                              <button class="btn">-25</button>
                              <button class="btn">‹</button>
                              <button class="btn">›</button>
                              <button class="btn">+25</button>
                              <button class="btn">+50</button>
                              <button class="btn">+100</button>
                              <button class="btn">»</button>
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