import { FaUsers, FaTshirt, FaTruck, FaHeadset } from "react-icons/fa";

export default function TopBanner(){
    const banners = [
        {id: 1, text: "Over 10,000 Happy Customers", icon: <FaUsers size={25} className="group-hover:text-blue-700 transition-colors duration-500 text-white"/>},
        {id: 2, text: "Original & Quality Products", icon: <FaTshirt size={25} className="group-hover:text-blue-700 transition-colors duration-500 text-white"/>},
        {id: 3, text: "Fast Delivery Across Nigeria", icon: <FaTruck size={25} className="group-hover:text-blue-700 transition-colors duration-500 text-white"/>},
        {id: 4, text: "24/7 Friendly Customer Support", icon: <FaHeadset size={25} className="group-hover:text-blue-700 transition-colors duration-500 text-white"/>},
    ]

    return (<>
        <div className="w-full lg:h-[300px] h-auto bg-[#f5f5f5] relative lg:mt-50 mt-20 mb-20">
            <div className="lg:w-[80%] w-[100%] mx-auto bg-white lg:rounded-md flex flex-wrap justify-center lg:justify-center lg:gap-10 gap-5 items-center p-4 relative lg:absolute lg:-top-[10px] lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                {banners.map((banner)=>(
                    <div key={banner.id} className="bg-[#f5f5f5] max-w-[150px] lg:max-w-[200px] h-[150px] lg:h-[200px] p-2 flex justify-center flex-col items-center gap-5 rounded-md group hover:bg-blue-700 transition-colors duration-500 flex-wrap lg:flex-nowrap shadow-sm">
                        <div className="w-[60px] h-[60px] bg-blue-700 rounded-full flex items-center justify-center group-hover:bg-[#f5f5f5]">
                            {banner.icon}
                        </div>
                        <div>
                            <p className="text-center font-[mulish] font-semibold text-blue-900 text-sm lg:text-base tracking-wide group-hover:text-white">{banner.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full lg:h-full h-[200px] flex items-center justify-center pt-4 font-[Montserrat] capitalize font-semibold lg:text-5xl text-2xl text-blue-800">Your Trust, Our Priority.</div>
        </div>
    </>)
}