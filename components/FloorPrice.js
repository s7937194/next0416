import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const FloorPrice = () => {
      return ( 
            <section class="w-full mb-10  text-center shadow stats py-2 ">
                  
                  <div class="  grid md:grid-cols-2 lg:grid-cols-5 grid-cols-2 lg:gap-x-0 items-center">


                        <div class="stat">
                              <div class="  text-green-600 ">Common</div>
                              <div class="text-2xl   font-bold ">2 <Image src={Avax} width={20} height={20} /></div>
                              
                        </div>
                        <div class="stat">
                              <div class=" text-blue-600">Rare</div>
                              <div class="text-2xl   font-bold ">4.5 <Image src={Avax} width={20} height={20} /></div>
                        </div>
                        <div class="stat">
                              <div class=" text-red-600">Exceptional</div>
                              <div class="text-2xl   font-bold ">6.5 <Image src={Avax} width={20} height={20} /></div>
                        </div>
                        <div class="stat">
                              <div class=" text-purple-600">Epic</div>
                              <div class="text-2xl   font-bold ">9.8 <Image src={Avax} width={20} height={20} /></div>
                        </div>
                        <div class="stat">
                              <div class="e text-yellow-600">Legendary</div>
                              <div class="text-2xl   font-bold ">30.5 <Image src={Avax} width={20} height={20} /></div>
                        </div>


                  </div>
                  

                  
            </section>
       );
}
 
export default FloorPrice;