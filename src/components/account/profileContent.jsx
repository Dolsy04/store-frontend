import { IoClose } from "react-icons/io5";
import { userDb, userAuth } from "../../firebase/db";
import { onSnapshot, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; 
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function ProfileContent({ isOpen, closeProfile }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");



    useEffect(() => {
        setLoading(true);

        const unsubscribe = onAuthStateChanged(userAuth, async (user) => {
        if (!user) {
            setProfile(null);
            setResponse("No user logged in");
            setLoading(false);
            return;
        }

        try {
           const docRef = doc(userDb, "usersDb", user.uid);

            const unsubscribeProfile = onSnapshot(
                docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setProfile(docSnap.data());
                        setResponse("");
                    } else {
                        setResponse("Profile not found");
                        setProfile(null);
                    }
                    setLoading(false);
                },(error) => {
                    console.error("Error listening to profile:", error);
                    setResponse(`Error fetching profile: ${error.message}`);
                    setLoading(false);
                }
            );
             return () => unsubscribeProfile();
        }catch (error) {
            console.error("Error  setting up listener:", error);
            setResponse(`Error setting up listener: ${error.message}`);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    });

        return () => unsubscribe();
    }, []);

    
  return (
    <section className={`lg:w-[35%] w-[90%] mx-auto bg-[#f1e9e9] shadow-md rounded-md p-4 overflow-hidden fixed top-4 z-99 transition-all duration-300 ${isOpen ? "right-2" : "-right-[200%]"}`}>
      <div className="w-full h-full relative">
        <button className="sticky z-60 bg-white p-2 shadow-lg cursor-pointer rounded-md top-2 left-2" onClick={closeProfile}><IoClose size={25} color="red" /></button>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="flex flex-row justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.5s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.7s]"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.9s]"></div>
          </div>
        ) : profile ? (
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full bg-blue-700 border flex items-center justify-center text-white text-xl font-bold">
              {profile.userfirstName?.charAt(0)}
              {profile.userlastName?.charAt(0)}
            </div>
            <h3 className="mt-2 font-semibold tracking-wide font-[mulish]">
              {profile.userfirstName} {profile.userlastName}
            </h3>
            <p className="mb-1 font-[mulish] tracking-wider">{profile.userEmail}</p>
            <p className="text-sm capitalize text-gray-600 font-[mulish] tracking-wide font-normal">{profile.userGender} - {profile.dob}</p>
            <Link to="/orderhistory" className="text-blue-600 flex items-center justify-center font-[mulish] text-sm tracking-wide mt-2">View order history</Link>
          </div>
        ) : (<>
            <p className="text-center">{response || "No profile data"}</p>
          </>
        )}
        
      </div>
    </section>
  );
}
