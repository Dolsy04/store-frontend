import { FaStar, FaRegStar } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { CiShoppingCart } from "react-icons/ci";
import{Link}from "react-router-dom";
export default function FeaturedProduct(){
    const FeaturedProduct = [
        {id:1, name:"sneakers", star: 5, image:"/shoe.jpg", price:"20000", description: "A top level sneakers for both male and female"},
        {id:2, name:"T-shirt", star: 5, image:"/cloth.jpg", price:"7000", description: "Male top avaliable in XL and XLL."},
        {id:3, name:"unisex top", star: 4, image:"/cloth.jpg", price:"17000", description: "A unisex round neck top  avalible in blue, green and black. "},
        {id:4, name:"pefume", star: 5, image:"/pefume.jpg", price:"20000", description: "Better scent, stronger confidence. 24Hrs"}
    ]

    const renderStar =(rating)=>{
        const stars = [];
        for(let i = 1; i <= 6; i++){
            stars.push(i <= rating ? <FaStar key={i} color="green"/> : <FaRegStar key={i} color="red"/>);
        }
        return stars;
    }


    return (<>
        <section className="bg-white w-full py-20">
            <div>
                <h3 className="text-center font-bold font-[Montserrat] text-2xl tracking-wide text-[#260262]"  >Featured Product</h3>
            </div>
            <div className="flex items-center lg:flex-nowrap flex-wrap gap-4 justify-center lg:justify-between w-[80%] mx-auto pt-6">
                {FeaturedProduct.map((product)=>(
                    <div key={product.id} className="overflow-hidden bg-[#f6f6f6] max-w-[250px] p-3 rounded-md">
                        <div className="w-full h-[150px]">
                            <img src={product.image} alt="product image" className="w-full h-full object-cover mix-blend-multiply rounded-md"/>
                        </div>
                        <div className="mt-2">
                            <p className="capitalize font-[mulish] text-sm font-semibold text-gray-500">{product.name}</p>
                            <p className="font-normal text-sm font-[mulish] my-2 text-[#353235]">{product.description}</p>
                            <p className="flex items-center gap-1">{renderStar(product.star)}</p>
                            <p className="flex items-center my-2 font-[mulish] font-semibold"><TbCurrencyNaira size={20}/>{Number(product.price).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center  lg:flex-nowrap flex-wrap gap-4 justify-center lg:justify-between w-[80%] mx-auto pt-6">
                {FeaturedProduct.map((product)=>(
                    <div key={product.id} className="overflow-hidden bg-[#f6f6f6] max-w-[250px] p-3 rounded-md">
                        <div className="w-full h-[150px]">
                            <img src={product.image} alt="product image" className="w-full h-full object-cover mix-blend-multiply rounded-md"/>
                        </div>
                        <div className="mt-2">
                            <p className="capitalize font-[mulish] text-sm font-semibold text-gray-500">{product.name}</p>
                            <p className="font-normal text-sm font-[mulish] my-2 text-[#353235]">{product.description}</p>
                            <p className="flex items-center gap-1">{renderStar(product.star)}</p>
                            <p className="flex items-center my-2 font-[mulish] font-semibold"><TbCurrencyNaira size={20}/>{Number(product.price).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 w-full flex items-center justify-center">
                <Link to="shop" className="relative border-2 border-[#130645] py-3 px-6 rounded-full overflow-hidden group active:bg-[#130645] focus:bg-[#130645] active:text-white focus:text-white">
                    <span className="absolute inset-0 bg-[#130645] rounded-full translate-x-[-150%] group-hover:translate-x-0 transition-transform duration-300 group-active:translate-x-0"></span>
                    <span className="flex items-center justify-center font-semibold font-[mulish] tracking-wide gap-1 text-black relative z-10 group-hover:text-white group-active:text-white transition-colors duration-300">Shop Now <CiShoppingCart size={20}/></span>
                </Link>
            </div>
        </section>
    </>);
}