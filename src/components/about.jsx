import { FaShoePrints, FaSprayCan, FaTshirt, FaStar } from "react-icons/fa";

export default function About() {
  return (
    <section className="w-full bg-white py-20 mb-10">
      <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-row lg:flex-row items-center justify-between gap-10 px-6">
        
        <div className="md:w-1/2 lg:w-1/2 w-[95%] mx-auto ">
            <h5 className="text-blue-900 text-xl font-semibold mb-2 font-[Montserrat]">Who We Are?</h5>
            <h2 className="text-[#260258] text-2xl font-bold mb-4 font-[Mulish]">At [Company Name]</h2>
            <p className="text-gray-700 text-base leading-relaxed font-[Mulish] mb-6">
                We blend fashion and fragrance into a single destination. Our curated collection of premium shoes, luxurious perfumes, and stylish clothing is designed to elevate your everyday experience with confidence and class.
            </p>
            <button className="mt-3 relative overflow-hidden rounded-full group bg-white py-3 px-6 cursor-pointer border-2 border-[#130645] transition-all">
                <span className="absolute inset-0 transition-transform translate-y-[100%] bg-[#130645] group-hover:-translate-y-0 duration-400"></span>
                <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors dutation-400 font-[mulish] tracking-wide font-semibold text-shadow text-md">Contact Us</span>
            </button>
        </div>

        <div className="md:w-1/2 lg:w-1/2 w-[95%] mx-auto grid grid-cols-2 gap-3 md:gap-6 lg:gap-6">
          <div className="p-5 text-center lg:text-left">
            <div className="text-3xl text-[#260258] mb-2 lg:block flex items-center justify-center"><FaShoePrints /></div>
            <h4 className="font-semibold text-md mb-1">Premium Shoes</h4>
            <p className="text-sm text-gray-600">Top-quality footwear for every step.</p>
          </div>

          <div className="p-5 text-center lg:text-left">
            <div className="text-3xl text-[#260258] mb-2 lg:block flex items-center justify-center"><FaSprayCan /></div>
            <h4 className="font-semibold text-md mb-1">Captivating Perfumes</h4>
            <p className="text-sm text-gray-600">Signature scents that linger beautifully.</p>
          </div>

          <div className="p-5 text-center lg:text-left">
            <div className="text-3xl text-[#260258] mb-2 lg:block flex items-center justify-center"><FaTshirt /></div>
            <h4 className="font-semibold text-md mb-1">Stylish Clothing</h4>
            <p className="text-sm text-gray-600">Outfits that define your personality.</p>
          </div>

          <div className="p-5 text-center lg:text-left">
            <div className="text-3xl text-[#260258] mb-2 lg:block flex items-center justify-center"><FaStar /></div>
            <h4 className="font-semibold text-md mb-1">Quality & Elegance</h4>
            <p className="text-sm text-gray-600">Unmatched class and premium quality.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
