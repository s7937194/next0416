import CardWalletNft from "../components/CardWalletNft";
import Claim from "../components/Claim";
import WalletNftModel from "../components/WalletNftModel";


const Wallet = () => {
      return ( 
            <div class="hero min-h-screen bg-base-200 ">
                  <div class="text-center w-[90%] xl:w-[70%] my-10 ">
                        <Claim/>

                        <div class="flex flex-col justify-center items-center">

                              <div class="flex flex-row flex-wrap card rounded-box place-items-center borde  justify-center items-center">
                                    <CardWalletNft /> 
                                    <CardWalletNft />
                                    <CardWalletNft />
                                    <CardWalletNft />
                                    <CardWalletNft />
                                    <CardWalletNft />
                                    <CardWalletNft />
                                    <CardWalletNft />
                              </div>
                              <WalletNftModel/>
                        </div>


                  </div>
            </div>
       );
}
 
export default Wallet;