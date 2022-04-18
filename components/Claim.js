import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const Claim = () => {
      return ( 
            <section class="w-full mb-6  text-center py-10 ">
                  <div class="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-2 lg:gap-x-0 items-center  stats  ">
                        <div class="stat">
                              <div class="stat-title">Mint Rewards</div>
                              <div class="stat-value">$11 <Image src={Avax} width={25} height={25}/></div>
                              <div class="stat-actions">
                                    <button class="btn">Claim </button>
                              </div>
                        </div>
                        

                        <div class="stat">
                              <div class="stat-title">Market Rewards</div>
                              <div class="stat-value">$20 <Image src={Avax} width={25} height={25}/></div>
                              <div class="stat-actions">
                                    <button class="btn">Claim</button>
                              </div>
                        </div>
                  </div>
            </section>

      );
}
 
export default Claim;