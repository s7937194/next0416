import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const MarketInfo = () => {
      return (
            <section class="w-full mb-6  text-center shadow stats  py-10 ">
                  
                  <div class="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-2 lg:gap-x-0 items-center">
                        <div class="mb-6 lg:mb-0 relative">
                        <h6 class="font-medium text-gray-500">Total Volume</h6>
                        <h5 class="text-2xl   font-bold ">52238.0444 <Image src={Avax} width={20} height={20} /></h5>

                        <hr class="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
                        </div>

                        <div class="mb-6 lg:mb-0 relative">
                        <h6 class="font-medium text-gray-500">Total Sales</h6>
                        <h5 class="text-2xl   font-bold ">6836</h5>

                        <hr class="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
                        </div>

                        <div class="mb-6 md:mb-0 relative">
                        <h6 class="font-medium text-gray-500">Highest Sale Price</h6>
                        <h5 class="text-2xl   font-bold ">1200 <Image src={Avax} width={20} height={20} /></h5>

                        <hr class="absolute right-0 top-0 w-px bg-gray-200 h-full hidden lg:block" />
                        </div>

                        <div class="mb-6 md:mb-0 relative">
                        <h6 class="font-medium text-gray-500 ">Holder</h6>
                        <h5 class="text-2xl   font-bold ">1044</h5>
                        </div>
                  </div>
            </section>
      );
}
 
export default MarketInfo;