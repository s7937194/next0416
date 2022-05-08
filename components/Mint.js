import {useState} from "react"
import Typewriter from "typewriter-effect";

import {useMoralis, useMoralisWeb3Api} from "react-moralis"
import {cryptoboysAddress } from "../config"
import CryptoBoyContract from "../abis/CryptoBoys.json"

import generateRarity from "./saveToMoralis";

const Mint = () => {
    let [count, setCount] = useState(1);
    const { user, account, authenticate, Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    function incrementCount() {
        count = count + 1;
        setCount(count);
    }

    function decrementCount() {
        count = count == 1 ? 1 : count - 1;
        setCount(count);
    }

    async function initMint () {
        console.log(user);

        if (!user) {
            try {
                user = await authenticate()
                mintNFT();
            } catch(error) {
                console.log(error)
            }
        } else {
            mintNFT();
        }
    }

    async function mintNFT(){
        await Moralis.enableWeb3();
        const options = {
            contractAddress: cryptoboysAddress,
            abi: CryptoBoyContract,
        };

        const mint = await Moralis.executeFunction({
            functionName: "mint",
            params : { amount: count.toString() }, 
            msgValue: Moralis.Units.ETH("0.025") * count,
            ...options,
        });
        console.log(mint);

        await mint.wait();
        alert("success");
    }

    return ( 
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content w-[85%] flex-col justify-between lg:flex-row-reverse ">
                <img src="https://api.lorem.space/image/movie?w=260&h=400" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold ">Discover a new era of cool
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                        }}
                        onInit={(typewriter) => {
                            typewriter
                            .typeString(`<span className="text-5xl">NFTs.</span>`)
                            .pauseFor(2000)
                            .deleteAll()
                            .typeString(`<span className="text-5xl">Collectible Items.</span>`)
                            .pauseFor(2000)
                            .deleteAll()
                            .typeString(`<span className="text-5xl">Ape Killers!</span>`)
                            .pauseFor(2000)
                            .deleteAll()
                            .start();
                        }}
                    />
                    </h1>      
                    <h1 className="text-2xl font-bold">Bored Of Apes? Try Something New.</h1>
                    <button className=" btn-primary rounded-full w-10 h-10 mx-1" onClick={incrementCount} >+</button>
                    <input type="nember" placeholder="Type here" className="input w-20 max-w-xs mx-1 " defaultValue={count}/>
                    <button className=" btn-primary rounded-full w-10 h-10 mx-1" onClick={decrementCount} >-</button>
                    <button className="btn btn-primary mx-3" onClick={initMint}>Mint</button>
                    <generateRarity />
                </div>
            </div>
        </div>
    );
}
 
export default Mint;