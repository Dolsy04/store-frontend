import { useState } from "react";
import CartContent from "../components/shop/cartContent.jsx";
import ProfileContent from "../components/account/profileContent.jsx";
import Footer from "../components/footer.jsx"

export default function Cart(){
     const [profileOpen, setProfileOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen((prev) => !prev);
    };
    return (<>
        <CartContent toggleProfile={toggleProfile}/>
        <ProfileContent isOpen={profileOpen} closeProfile={() => setProfileOpen(false)}/>
        <Footer />
    </>)
}