import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const CardWalletNft = () => {
      return ( 
            <label for="WalletNftModel" class=" modal-button">
                  <div class="card card-compact w-[300px] bg-base-100 shadow-xl ml-4 my-2 mr-2 hover:scale-105">
                        <figure><img class="w-[300px] h-[300px]" src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                        <div class="card-body">
                              <div class="card-actions justify-center items-center">
                                    <h2 class="card-title">Survivor #393</h2>
                                    <div class="text-blue-600 bg-slate-200 rounded-xl px-3">
                                          Common
                                    </div>
                              </div>
                              <div class="bg-gray-600 rounded-xl p-2 text-lg font-semibold text-white">
                                    Not For Sale
                              </div>

                        </div>
                  </div>
            </label>
      );
}
 
export default CardWalletNft;