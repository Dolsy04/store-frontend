import CheckoutContent from "../components/shop/checkoutContent.jsx";
import ProfileContent from "../components/account/profileContent.jsx";
import Footer from "../components/footer.jsx";
import { useState } from "react";

export default function Checkout(){
    const [profileOpen, setProfileOpen] = useState(false);
    
    const toggleProfile = () => {
        setProfileOpen((prev) => !prev);
    };
    return (<>
        <CheckoutContent toggleProfile={toggleProfile}/>
        <ProfileContent isOpen={profileOpen} closeProfile={() => setProfileOpen(false)}/>
        <Footer />
    </>)
}