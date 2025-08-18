import { FaInstagram, FaFacebookF, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

export default function Footer(){
    return (<>
        <footer className="bg-blue-600 w-full flex lg:gap-0 gap-3 lg:justify-between justify-center flex-col-reverse lg:flex-row py-4 px-10">
            <div>
                <p className="text-white font-[mulish] text-sm tracking-wide lg:text-left text-center">Company Name - &copy; {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex items-center gap-2 justify-center">
                <span className="text-white font-[mulish] text-sm tracking-wide">Follow us on:</span>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" ><FaInstagram className="text-white" size={20} /></a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" ><FaFacebookF  className="text-white" size={20}/></a>
                <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer" ><FaXTwitter  className="text-white" size={20}/></a>
                <a href="https://web.whatsapp.com" target="_blank" rel="noopener noreferrer" ><FaWhatsapp  className="text-white" size={20}/></a>
                
            </div>
        </footer>
    </>);
}