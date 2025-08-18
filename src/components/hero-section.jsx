
import { IoIosArrowRoundForward } from "react-icons/io";
import shoeImage from "../assets/shoe.jpg"
import clothImage from "../assets/cloth.jpg"
import pefumeImage from "../assets/pefume.jpg"

export default function HeroSection(){
    return (<>
        <section className="w-full">
            <div className="w-[95%] px-3 mx-auto lg:mt-20 mt-15 flex items-center justify-center flex-wrap lg:flex-row">
              <div className="lg:w-[50%] w-full p-2">
                <h3 className="lg:text-5xl text-4xl font-bold font-[Montserrat] text-[#130645] lg:leading-[60px] leading-[45px] tracking-wide text-center lg:text-left">Elevate Your Style. Define Your Scent. Step into Confidence.</h3>
                <p className="mt-3 font-semibold font-[Montserrat] text-[#130645] text-xl lg:text-2xl text-center lg:text-left">Unleash your best look today.</p>
                <div className="text-center lg:text-left mt-10 lg:mt-0">
                    <button className="relative mt-3 overflow-hidden group bg-white rounded-full py-3 px-6 cursor-pointer">
                        <span className="absolute inset-0 transition-transform translate-x-[-100%] bg-[#130645] group-hover:-translate-x-0 duration-400"></span>
                        <span className="flex items-center justify-center gap-1 relative z-10 text-gray-700 group-hover:text-white transition-colors duration-400 font-[Montserrat] font-semibold text-md">Shop Now <IoIosArrowRoundForward size={20}/></span>
                    </button>
                </div>
              </div>
              
              <div className="lg:w-[50%] w-full p-2 lg:mt-0 mt-10">
                <div className="flex items-center justify-center lg:flex-col gap-5 flex-row">
                    <div className="flex items-center gap-5">
                        <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full">
                            <img src={shoeImage} alt="shoe image" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full">
                            <img src={clothImage} alt="shoe image" className="w-full h-full object-cover rounded-full" />
                        </div>
                    </div>
                    <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full">
                        <img src={pefumeImage} alt="shoe image" className="w-full h-full object-cover rounded-full" />
                    </div>
                </div>
              </div>
            </div>
        </section>
    </>);
}