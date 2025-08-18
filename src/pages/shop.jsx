import ShopHeader from "../components/shop/shopHeader.jsx";
import ShopHeroSection from "../components/shop/shopHeroSection.jsx";
import ShopProduct from "../components/shop/shopProduct.jsx";
import Footer from "../components/footer.jsx";
import ProfileContent from "../components/account/profileContent.jsx";
import {useState} from "react";


export default function Shop(){
    const [search, setSearch] = useState("")
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen((prev) => !prev);
    };
    
    return (<section className="relative">
        <ShopHeader isOpen={profileOpen} toggleProfile={toggleProfile} />
        <ShopHeroSection search={search} setSearch={setSearch} />
        <ShopProduct search={search}/>
        <ProfileContent isOpen={profileOpen} closeProfile={() => setProfileOpen(false)} />
        <Footer/>
    </section>)
}