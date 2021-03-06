import Image from 'next/image';
import { useState } from 'react';
import Avax from  '../assets/image/avax.svg'

const WalletNftModel = () => {

      const [detailSwitch,setDetailSwitch] =useState(false)

      const headleDetailSwitch = () =>{
            if (detailSwitch) setDetailSwitch(false)
            else setDetailSwitch(true)
      }

      return ( 
            <div>
                  <input type="checkbox" id="WalletNftModel" class="modal-toggle"/>
                  
                  <div class="modal bg-black bg-opacity-80" for="WalletNftModel">
                        <div class="modal-box">
                              <div class="flex justify-between items-center pb-2">
                                    <a class="underline" target="_blank">
                                          <strong class="text-2xl">Survivor #393</strong>
                                    </a>
                                    
                                    <label for="WalletNftModel" >
                                          <svg class="cursor-pointer fill-current w-md h-md" fill="#d2cfca" width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"> 
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L9 8.29289L16.6464 0.646447C16.8417 0.451184 17.1583 0.451184 17.3536 0.646447C17.5488 0.841709 17.5488 1.15829 17.3536 1.35355L9.70711 9L17.3536 16.6464C17.5488 16.8417 17.5488 17.1583 17.3536 17.3536C17.1583 17.5488 16.8417 17.5488 16.6464 17.3536L9 9.70711L1.35355 17.3536C1.15829 17.5488 0.841709 17.5488 0.646447 17.3536C0.451184 17.1583 0.451184 16.8417 0.646447 16.6464L8.29289 9L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" />
                                          </svg>
                                    </label>
                              </div>
                              

                              <div class="px-md">
                                    <div class="flex gap-x-md mb-8" >
                                          <div class="relative h-[200px] xs:h-[120px]">
                                                <figure><img class="w-[200px] h-[200px] rounded-xl" src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                                          </div>
                                          <div class="flex justify-between items-start ml-6 flex-col">
                                                <div class="flex flex-col text-md w-full">


                                                      <span class="flex flex-wrap pb-xs xs:pb-0 my-1">
                                                            <strong>Creator: &nbsp;</strong>
                                                            <a class="underline" href="/">0xddc1...7de2bc</a>
                                                      </span>
                                                      <span class="flex flex-wrap pb-xs xs:pb-0 my-1">
                                                            <strong>Rarity: &nbsp;</strong>
                                                            <div class="text-blue-600 bg-slate-200 rounded-xl px-3">
                                                                  Common
                                                            </div>
                                                      </span>

                                                      <span class="flex flex-wrap pb-xs xs:pb-0 my-1">
                                                            <strong>Last Price: &nbsp;</strong>
                                                            <a> 5 <Image src={Avax} width={13} height={13}/></a>
                                                      </span>
                                                      
                                                      
                                                </div>

                                                <label for="my-modal" class="btn btn-primary rounded-full text-xl px-10 modal-button capitalize">
                                                      List NFT
                                                </label>

                                                <input type="checkbox" id="my-modal" class="modal-toggle"/>
                                                <div class="modal">
                                                      <div class="modal-box">
                                                            <div class="form-control w-full  flex justify-center">
                                                                  <h3 class="font-bold text-2xl mb-5 mt-5">Sell your NFT on the marketplace</h3>
                                                                  <div>
                                                                        <input type="number" placeholder="1" class="input input-bordered w-[60%] "/>
                                                                  </div>
                                                                  <span class="label-text-alt">Price in AVAX</span>
                                                                  
                                   
                                                            </div>

                                                            <div class="modal-action flex justify-center">
                                                                  <label  class="btn btn-primary capitalize ">List</label>
                                                                  <label for="my-modal" class="btn capitalize ">Cancel</label>
                                                            </div>
                                                      </div>
                                                </div>

                                          </div>
                                    </div>

                                    
                                    {/* ?????? */}  

                                    { !detailSwitch &&
                                    <div class="">
                                          <div class="tabs">
                                                <a class="tab tab-bordered tab-active w-1/2 font-bold text-lg">Details</a> 
                                                <a onClick={headleDetailSwitch} class="tab tab-bordered w-1/2 font-bold text-lg">Transactions</a> 
                                          </div>
                                          <div class="text-xl xs:text-lg mb-xs text-left m-2 font-bold mt-6">Attributes</div>
                                          <div class="grid grid-cols-2 gap-y-[4px] gap-x-md xs:gap-xs z-[1]">
                                                <div class="flex items-center text-xs xs:text-[10px] rounded-xl border overflow-hidden border-solid mr-2 mb-2">
                                                      <strong class="uppercase p-2 xs:p-[4px] min-w-[80px] xs:min-w-[60px] h-full bg-primary text-base">color</strong>
                                                      <span class="ml-6 capitalize text-base">brown</span>
                                                </div>
                                                <div class="flex items-center text-xs xs:text-[10px] rounded-xl border overflow-hidden border-solid mr-2 mb-2">
                                                      <strong class="uppercase p-2 xs:p-[4px] min-w-[80px] xs:min-w-[60px] h-full bg-primary text-base">body</strong>
                                                      <span class="ml-6 capitalize text-base">brown</span>
                                                </div>
                                                <div class="flex items-center text-xs xs:text-[10px] rounded-xl border overflow-hidden border-solid mr-2 mb-2">
                                                      <strong class="uppercase p-2 xs:p-[4px] min-w-[80px] xs:min-w-[60px] h-full bg-primary text-base">hat</strong>
                                                      <span class="ml-6 capitalize text-base">brown</span>
                                                </div>
                                                <div class="flex items-center text-xs xs:text-[10px] rounded-xl border overflow-hidden border-solid mr-2 mb-2">
                                                      <strong class="uppercase p-2 xs:p-[4px] min-w-[80px] xs:min-w-[60px] h-full bg-primary text-base">hair</strong>
                                                      <span class="ml-6 capitalize text-base">brown</span>
                                                </div>   
                                          </div>
                                    </div>
                                    }


                                    {/* ???????????? */}  
                                    { detailSwitch &&
                                    <div class="">
                                          <div class="tabs mb-8">
                                                <a onClick={headleDetailSwitch} class="tab tab-bordered w-1/2 font-bold text-lg">Details</a> 
                                                <a class="tab tab-bordered tab-active w-1/2 font-bold text-lg">Transactions</a> 
                                          </div>

                                          <div className="pb-4 my-2 border-b-2 border-gray-500">
                                                <div className="flex   mb-2">
                                                      <div className="flex xs:flex-col">
                                                            <strong>TX ID: &nbsp;</strong>
                                                            <a className="flex mr-2  underline" href="">0x2df5...13d531</a>
                                                      </div>
                                                      <div className="flex xs:flex-col">
                                                            <strong>Token ID: &nbsp;</strong>
                                                            <a className="flex mr-2  underline" href="">5083</a>
                                                      </div>
                                                      <span className="flex flex-1"></span>
                                                      <span className="text-xs "> 2022/4/9 ??????4:16:19</span>
                                                </div>

                                                <div className="flex items-center">
                        
                                                      <div className="flex flex-col ">
                                                            <strong>From</strong>
                                                            <a className=" underline" href="">0xddc1...7de2bc</a>
                                                      </div>
                                                      <div className="px-4 text-2xl xs:px-xs"> ??</div>
                                                      <div className="flex flex-col ">
                                                            <strong>To</strong>
                                                            <a className=" underline" href="">0xa5b7...c68de6</a>
                                                      </div>
                                                      <div className="flex justify-end flex-1 pr-lg">
                                                            <div className="flex items-center ">
                                                                  2.69 &nbsp;
                                                                  <Image src={Avax} width={13} height={13}/>
                                                            </div>
                                                      </div>
 
                                                </div>
                                          </div>


                                          
                                          
                                          
                                                
                                          
                                          
                                        
                                    

                              


                                          {/*this */}
                                    </div>
                                    }

                              </div>
                              
                        </div>
                  </div>
            </div>

       );
}
 
export default WalletNftModel;