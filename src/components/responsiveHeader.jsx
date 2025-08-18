import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ResponsiveHeader({ onScrollTo, activeSection}){
        const navLinkClass = (section) => `relative font-[mulish] tracking-wide text-md text-white after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 cursor-pointer ${
        activeSection === section ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;

    const [open, setOpen] = useState(false);

    const handleResNav = () =>{
        setOpen(prev => (!prev));
    }

    return (<>
        <header className="w-full bg-linear-to-r from-cyan-500 to-blue-500 py-2 sticky top-0 z-90 mx-auto mb-0 lg:hidden items-center justify-between">
            <div className="flex items-center justify-between px-3">
                 <div>
                    <p className="font-[Montserrat] font-bold text-3xl uppercase text-white">Logo</p>
                </div>
                <div onClick={() => setOpen(true)}>
                    <RxHamburgerMenu size={24} color="white"/>
                </div>
            </div>


            <div className={`flex items-start flex-col gap-6 bg-blue-900/90 fixed top-0 w-full h-screen z-40 p-4 transition-all duration-300 ease-in-out ${open ? "left-0" : "left-[-1200px]"}`}>
                <div className="flex items-start justify-between w-full">
                    <p className="font-[Montserrat] font-bold text-3xl uppercase text-white">Logo</p>
                    <IoClose size={24} color="white" onClick={()=>setOpen(false)}/>
                </div>
                
                <nav className="">
                    <ul className="flex items-start justify-center flex-col gap-5">
                        <li>
                            <Link onClick={()=> {handleResNav(), onScrollTo.home()}} to="/">
                                <button className={navLinkClass("home")}>Home</button>
                            </Link>
                        </li>
                        <li>
                            <button onClick={() => {onScrollTo.about(), handleResNav()}} className={navLinkClass("about")}>About</button>
                        </li>
                        <li>
                            <button onClick={() => {handleResNav(), onScrollTo.testimonial()}} className={navLinkClass("testimonial")}>Testimonial</button>
                        </li>
                        <li>
                            <button onClick={()=> {handleResNav(), onScrollTo.contact()}} className={navLinkClass("contact")}>Contact</button>
                        </li>
                        <li>
                            <Link onClick={()=> {handleResNav(), onScrollTo.shop()}} to="shop">
                                <button className={navLinkClass("shop")}>Shops</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="mr-10 flex items-center gap-4">
                    <Link to="login" className="font-[mulish] text-white text-md tracking-wide font-semibold border border-cyan-500  px-3 py-2 rounded-md cursor-pointer">Login</Link>
                    <Link to="signup" className="font-[mulish] text-white text-md tracking-wide font-semibold bg-[#130645] px-3 py-2 rounded-md cursor-pointer">Get Started</Link>
                </div>
            </div>
        </header>
    </>);
}