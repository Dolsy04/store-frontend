import { Link } from "react-router-dom";
import { TbHome2 } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


export default function ShopHeader({ toggleProfile }){
    return (<>
        <header className="w-full bg-white flex items-center justify-between lg:px-30 px-3 py-4 sticky top-0 z-90">
            <div className="flex items-center gap-2 lg:gap-20 md:gap-10">
                <h1 className="lg:text-3xl text-xl font-bold font-[Montserrat] text-blue-900">LOGO</h1>
                <div className="flex items-center lg:gap-1 gap-0.5">
                    <Link to="/" className="flex items-center gap-1 font-[mulish] tracking-wide text-sm md:text-base lg:text-base text-blue-600 font-normal"><TbHome2 /> Home</Link>
                    <span className="text-gray-500 "><MdKeyboardDoubleArrowRight /></span>
                    <span className="capitalize font-[mulish] tracking-wide text-sm lg:text-base md:text-base text-gray-400 font-normal">shop</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/cart" className="flex items-center gap-1 rounded-md p-2 cursor-pointer lg:bg-[#00f7ff]">
                    <IoCartOutline size={20} className="text-blue-900"/>
                    <span className="text-base text-blue-900 font-[mulish] tracking-wide lg:block md:block hidden">Cart</span>
                </Link>
                
                <div className="flex items-center gap-1 rounded-md p-2 cursor-pointer lg:bg-[#00f7ff]" onClick={toggleProfile}>
                    <LuUserRound size={20} className="text-blue-900"/>
                    <span className="text-base text-blue-900 font-[mulish] tracking-wide lg:block md:block hidden">Profile</span>
                </div>
            </div>
        </header>
    </>);
}