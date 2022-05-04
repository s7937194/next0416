import Image from 'next/image';
import Avax from  '../assets/image/avax.svg'

const CardMarket = ({src="", tokenId="", name="", rarity="Common"}) => {

    return ( 
        <label htmlFor="MarketNftModel" className=" modal-button">
            <div className="card card-compact w-[300px] bg-base-100 shadow-xl  my-2 mx-2 hover:scale-105">
                <figure><img className="w-[300px] h-[300px]" src={src} alt={name} /></figure>
                <div className="card-body">
                    <div className="card-actions justify-center items-center">
                        <h2 className="card-title">{name} #{tokenId}</h2>
                        <div className="text-blue-600 bg-slate-200 rounded-xl px-3">
                            {rarity}
                        </div>
                    </div>
                    <div className="bg-green-600 rounded-xl p-2 text-lg font-semibold text-white">
                        For Sale
                    </div>

                    <div className="flex justify-between text-lg font-medium">
                        <a>Price</a>
                        <a className="">24 <Image src={Avax} width={15} height={15}/></a>
                    </div>
                    <div className="flex justify-between text-lg font-medium">
                        <a>Last Price</a>
                        <a>7 <Image src={Avax} width={15} height={15}/></a>
                    </div>
                </div>
            </div>
        </label>
    )
}
 
export default CardMarket;