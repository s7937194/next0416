import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const CardWalletNft = ({src="", tokenId="", name="", rarity="Common"}) => {
    return ( 
        <label htmlFor={"WalletNftModel_"+tokenId} className=" modal-button">
            <div className="card card-compact w-[300px] bg-base-100 shadow-xl ml-4 my-2 mr-2 hover:scale-105">
                <figure><img className="w-[300px] h-[300px]" src={src} alt="NFT" /></figure>
                <div className="card-body">
                    <div className="card-actions justify-center items-center">
                        <h2 className="card-title">{name}#{tokenId}</h2>
                        <div className="text-blue-600 bg-slate-200 rounded-xl px-3">
                            {rarity}
                        </div>
                    </div>
                    <div className="bg-gray-600 rounded-xl p-2 text-lg font-semibold text-white">
                        Sale
                    </div>
                </div>
            </div>
        </label>
    );
}
 
export default CardWalletNft;