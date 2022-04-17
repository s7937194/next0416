import CardNft from "./CardNft";
import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const MarketItem = () => {
      return ( 
            <div class="flex flex-col w-full lg:flex-row ">

                  {/* Filters */}
                  <div class="grid flex-grow card rounded-box stats shadow h-[500px] mr-2">
                        <div class="w-full text-center">
                              <div class="grid md:grid-cols-1  lg:gap-x-0 items-center ">
                                    <div class="stat ">
                                          <div class="btn-group ">
                                                <button class="btn btn-active w-1/2 normal-case">For Sale</button>
                                                <button class="btn w-1/2 normal-case ">Shaw All</button>
                                          </div>
                                          
                                    </div>
                                    <div class="stat">
                                          <select class="select select-bordered w-full ">
                                                <option disabled selected>Who shot first?</option>
                                                <option>Han Solo</option>
                                                <option>Greedo</option>
                                          </select>
                                    </div>
                                    <div class="stat">
                                          <select class="select select-bordered w-full ">
                                                <option disabled selected>Who shot first?</option>
                                                <option>Han Solo</option>
                                                <option>Greedo</option>
                                          </select>
                                    </div>
                                    <div class="stat">
                                          <select class="select select-bordered w-full ">
                                                <option disabled selected>Who shot first?</option>
                                                <option>Han Solo</option>
                                                <option>Greedo</option>
                                          </select>
                                    </div>
                                    <div class="stat">
                                          <select class="select select-bordered w-full ">
                                                <option disabled selected>Who shot first?</option>
                                                <option>Han Solo</option>
                                                <option>Greedo</option>
                                          </select>
                                    </div>
                              </div>
                        </div>
                  </div> 

                  <div class="divider lg:divider-horizontal"></div> 
                  
                  {/* NFT */}
                  <div class="flex flex-col justify-center items-center">
                        <div class="grid  md:grid-cols-2 xl:grid-cols-4 card rounded-box place-items-center borde">
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                              <CardNft />
                        </div>

                        <div class="btn-group mt-6">
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
            </div>
           
           
       );
}
 
export default MarketItem;