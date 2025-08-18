import { FaStar, FaRegStar} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonial(){

    const TestimonialCard = [
        {id: 1, text: "Great quality clothes and fast delivery—I'm impressed!", star: "6", occupation: "business analyst", name: "Sarah A.", image: "/susan.jpg"},
        {id: 2, text: "The shoes fit perfectly and look amazing!", star: "6", occupation: "Fashion Blogger", name: "benita O.", image: "/benita.jpg"},
        {id: 3, text: "Love the scent of the perfume, and it lasts all day!", star: "6", occupation: "Makeup Artist", name: "clara B.", image: "/clara.jpg"},
        {id: 4, text: "Affordable prices and top-notch products", star: "5", occupation: " University Student", name: "Favor B.", image: "/favor.jpg"},
        {id: 5, text: "Everything I ordered was exactly as described. Will shop again!", star: "5", occupation: "Office Manager", name: "jenet J.", image: "/jenet.jpg"},
        {id: 6, text: "Stylish clothes, comfortable shoes, and lovely perfumes!", star: "4", occupation: "Fitness Coach", name: "Opeyemi L.", image: "/opeyemi.jpg"},
        {id: 7, text: "My new favorite store for fashion and fragrance.", star: "4", occupation: "Content Creator", name: "Oyindamola A.", image: "/oyinda.jpg"},
    ]
    const renderStar =(rating)=>{
        const stars = [];
        for(let i = 1; i <= 6; i++){
            stars.push(i <= rating ? <FaStar key={i} color="green"/> : <FaRegStar key={i} color="red"/>);
        }
        return stars;
    }

    const NextArrow = ({ onClick }) => (
        <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 cursor-pointer z-10" onClick={onClick}>
        <IoIosArrowForward size={20}  className="bg-purple-500 text-white w-[40px] rounded-full h-[40px] hover:bg-purple-900 transition-colors active:bg-purple-900 focus:bg-purple-900" />
        </div>
    );
    const PrevArrow = ({ onClick }) => (
        <div className="absolute top-1/2 -left-5 transform -translate-y-1/2 cursor-pointer z-10" onClick={onClick}>
        <IoIosArrowBack size={20}  className="bg-purple-500 text-white w-[40px] rounded-full h-[40px] hover:bg-purple-900 transition-colors active:bg-purple-900 focus:bg-purple-900"/>
        </div>
    );

    const settings = {
        dots: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        centerMode: true,
        centerPadding: "20px",
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                centerMode: false,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                centerMode: false,
            },
        },
    ],
  };

  

    return(<>
        <section className="bg-white w-full py-15 my-10">
            <div>
                <h3 className="text-center capitalize font-bold font-[Montserrat] text-xl lg:text-2xl tracking-wide text-[#260262]">What people say about us</h3>
            </div>
            <div className="px-8 py-10 relative rounded-md lg:w-5/6 w-full lg:mt-10 mx-auto">
                <Slider {...settings}>
                    
                    {TestimonialCard.map((card)=>(
                        <div key={card.id} className="px-2">
                            <div className="p-6 bg-white hover:shadow-md hover:transition-shadow duration-300 rounded-md h-full">
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-20 rounded-full overflow-hidden">
                                        <img src={card.image} alt={card.name} className="w-full h-full rounded-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="mt-2 font-[mulish] font-semibold text- text-[#260262] capitalize tracking-wide">{card.name}</h4>
                                        <p className="text-gray-600 font-[mulish] text-sm capitalize">{card.occupation}</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-2">{renderStar(Number(card.star))}</div>
                                <p className="mt-4 text-sm font-[mulish] text-gray-700">"{card.text}"</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    </>);
}