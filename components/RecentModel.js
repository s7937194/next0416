import Avax from  '../assets/image/avax.svg'
import Image from 'next/image';

const RecentModel = () => {
    return ( 
        <div>  
            <input type="checkbox" id="recentModel" className="modal-toggle"/>
            <label htmlFor="recentModel" className="modal bg-black bg-opacity-80">
                <label className="modal-box w-4/12 max-w-5xl" htmlFor="">
                    <div className="flex justify-between items-center pb-2">   
                        <a className="" target="_blank">
                            <strong className="text-2xl mr-2">Recent Market Sales</strong>
                            <strong >  Last 10 transactions </strong>
                        </a> 
                        <label htmlFor="recentModel" >
                            <svg className="cursor-pointer fill-current w-md h-md" fill="#d2cfca" width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"> 
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L9 8.29289L16.6464 0.646447C16.8417 0.451184 17.1583 0.451184 17.3536 0.646447C17.5488 0.841709 17.5488 1.15829 17.3536 1.35355L9.70711 9L17.3536 16.6464C17.5488 16.8417 17.5488 17.1583 17.3536 17.3536C17.1583 17.5488 16.8417 17.5488 16.6464 17.3536L9 9.70711L1.35355 17.3536C1.15829 17.5488 0.841709 17.5488 0.646447 17.3536C0.451184 17.1583 0.451184 16.8417 0.646447 16.6464L8.29289 9L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" />
                            </svg>
                        </label>
                    </div>
                    <div className="divider m-0" />

                    <div className="pb-4 my-2 border-b-2 ">
                        <div className="flex mx-1  mt-xs mb-2">
                            <div className="flex xs:flex-col">
                            <strong>TX ID: &nbsp;</strong>
                            <a className="flex mr-2  underline" href="">0x2df5...13d531</a>
                            </div>
                            <div className="flex xs:flex-col ml-2">
                            <strong>Token ID:&nbsp;</strong>
                            <a className="flex mr-2  underline" href="">5083</a>
                            </div>
                            <span className="flex flex-1"></span>
                            <span className="text-sm"> 2022/4/9 下午4:16:19</span>
                        </div>
                        <div className="flex items-center">
                            <figure><img className="w-[100px] h-[100px] rounded-xl" src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                            <div className="flex flex-col items-start ml-5">
                                <span>From</span>
                                <a className="" href="">0xddc1...7de2bc</a>
                            </div>
                            <div className="px-4 text-2xl xs:px-xs"> »</div>
                            <div className="flex flex-col items-start ml-5">
                                <span>To</span>
                                <a className=" underline" href="">0xa5b7...c68de6</a>
                            </div>
                            <div className="flex justify-end flex-1 pr-lg">
                                <span className=" text-blue-600 bg-slate-200 rounded-xl px-3 mx-10">Common</span>
                            </div>
                            <div className="flex justify-end min-w-[50px]">
                                <div className="flex items-center ">
                                        2.69 &nbsp;
                                        <Image src={Avax} width={13} height={13}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
            </label>
        </div>
    );
}
 
export default RecentModel;