import { IoMdSearch } from "react-icons/io";

export default function ShopHeroSection({search, setSearch}){
    return(<>
        <section className="w-full h-[350px] flex items-center justify-center flex-col">
            <div>
                <h3 className="text-center uppercase lg:text-6xl text-3xl text-white font-[Montserrat] font-bold tracking-wide my-2">Shop with us today</h3>
                <div>
                    <p className="text-center text-xl px-3 lg:px-0 lg:text-2xl font-[mulish] text-white font-semibold">Discover top-quality products curated just for you.</p>
                    <p className="text-center text-xl px-3 lg:px-0 lg:text-2xl font-[mulish] text-white font-semibold">Find your perfect fit and enjoy a seamless shopping experience.</p>
                </div>
                <div className="lg:w-[60%] w-[90%] mx-auto mt-6 bg-white rounded-full flex items-center h-[45px]">
                    <IoMdSearch size={25} className="w-[10%] text-gray-500"/>
                    <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} className="h-full w-[90%] rounded-full border-none outline-none px-2 font-[mulish] text-gray-600" placeholder="Search for product...."/>
                </div>
            </div>
        </section>
    </>);
}