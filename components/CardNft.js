import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const CardNft = () => {
      return ( 
            <div class="card card-compact w-[300px] bg-base-100 shadow-xl ml-4 my-2 mr-2 hover:scale-105">
                  <figure><img class="w-[300px] h-[300px]" src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                  <div class="card-body">
                        <div class="card-actions justify-center">
                              <h2 class="card-title">NFT #393</h2>
                              <progress class="progress progress-primary w-56" value="4793" max="10000"></progress>
                              <div>Rank:4793</div>
                              <div class="text-blue-600 bg-slate-200 rounded-xl px-3">
                                    Common
                              </div>
                        </div>
                        <div class="bg-green-600 rounded-xl p-2 text-lg font-semibold text-white">
                              For Sale
                        </div>

                         <div class="flex justify-between text-lg font-medium">
                              <a>Price</a>
                              <a class="">24 <Image src={Avax} width={15} height={15}/></a>
                        </div>
                        <div class="flex justify-between text-lg font-medium">
                              <a>Last Price</a>
                              <a>7 <Image src={Avax} width={15} height={15}/></a>
                        </div>


                  </div>
            </div>
       );
}
 
export default CardNft;