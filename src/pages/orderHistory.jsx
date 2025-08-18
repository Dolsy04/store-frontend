import OrderHistoryContent from "../components/account/orderHistoryContent.jsx";
import ProfileContent from "../components/account/profileContent.jsx";
import Footer from "../components/footer.jsx";
import { useState } from "react";
export default function OrderHistory(){
    const [profileOpen, setProfileOpen] = useState(false);
        
    const toggleProfile = () => {
        setProfileOpen((prev) => !prev);
    };
    return (<>
        <OrderHistoryContent toggleProfile={toggleProfile}/>
        <ProfileContent isOpen={profileOpen} closeProfile={() => setProfileOpen(false)}/>
        <Footer />
    </>)
}