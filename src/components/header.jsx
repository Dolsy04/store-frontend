import { Link } from "react-router-dom";
export default function Header({ onScrollTo, activeSection}){
        const navLinkClass = (section) => `relative font-[mulish] tracking-wide text-md text-white after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-800 after:transition-all after:duration-300 cursor-pointer ${
        activeSection === section ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;


    return (<>
        <header className="w-full bg-linear-to-r from-cyan-500 to-blue-500 py-2 sticky top-0 z-90 mx-auto mb-0 lg:flex md:hidden items-center justify-between hidden">
            <div className="ml-5 flex items-center gap-15">
                <div>
                    <p className="font-[Montserrat] font-bold text-3xl uppercase text-white">Logo</p>
                </div>
                
                <nav className="">
                    <ul className="flex items-center justify-center gap-8">
                        <li>
                            <Link onClick={onScrollTo.home} to="/">
                                <button className={navLinkClass("home")}>Home</button>
                            </Link>
                        </li>
                        <li>
                            <button onClick={onScrollTo.about} className={navLinkClass("about")}>About</button>
                        </li>
                        <li>
                            <button onClick={onScrollTo.testimonial} className={navLinkClass("testimonial")}>Testimonial</button>
                        </li>
                        <li>
                            <button onClick={onScrollTo.contact} className={navLinkClass("contact")}>Contact</button>
                        </li>
                        <li>
                            <Link onClick={onScrollTo.shop} to="shop">
                                <button className={navLinkClass("shop")}>Shops</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mr-10 flex items-center gap-4">
                <Link to="login" className="font-[mulish] text-white text-md tracking-wide font-semibold border border-cyan-500  px-3 py-2 rounded-md cursor-pointer">Login</Link>
                <Link to="signup" className="font-[mulish] text-white text-md tracking-wide font-semibold bg-[#130645] px-3 py-2 rounded-md cursor-pointer">Get Started</Link>
            </div>
        </header>
    </>);
}