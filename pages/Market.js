import FloorPrice from "../components/FloorPrice";
import MarketInfo from "../components/MarketInfo";
import MatketItem from "../components/MatketItem";

const Market = () => {
      return ( 
            <div class="hero min-h-screen bg-base-200 ">
                  <div class="text-center w-[90%] xl:w-[80%] my-10 ">
                        <MarketInfo />
                        <FloorPrice />
                        <MatketItem />
                  </div>
            </div>
       );
}
 
export default Market;