import acctBgImage from "../../assets/image-sign.jpg";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import {userAuth} from "../../firebase/db.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; 
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginContent(){
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [togglepassword, setTogglePassword] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const Navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        const REQUIRED_FIELDS_TOAST_ID = "fieldsRequired";
        const REQUIRED_SUCCESS_TOAST_ID = "successMessage";
        const REQUIRED_ERROR_TOAST_ID = "errorMessage";

        if(!emailInput.trim() || !passwordInput.trim()){
            toast.error("All field are required", { toastId: REQUIRED_FIELDS_TOAST_ID, position: "top-right", autoClose: 5000, })
            return;
        }

        setIsLoading(true);

        try{
            await signInWithEmailAndPassword(userAuth, emailInput, passwordInput);            
            toast.success("Login Successfully",  { toastId: REQUIRED_SUCCESS_TOAST_ID, position: "top-right", autoClose: 5000, });

            setEmailInput("")
            setPasswordInput("");

            setTimeout(()=>{
                Navigate("/shop")
            },5000)

        }catch (error){
            console.log("Error when trying to login", error.message);
            toast.error(`Error Occured: ${error.message}`, {toastId: REQUIRED_ERROR_TOAST_ID, position: "top-right", autoClose: 5000, });
        }
        finally{
            setIsLoading(false);
        }
    }

    async function handleForgotPassword() {
        const REQUIRED_FIELDS_TOAST_ID = "fieldsRequired";
        const REQUIRED_SUCCESS_TOAST_ID = "successMessage";
        const REQUIRED_ERROR_TOAST_ID = "errorMessage";

        if (!emailInput.trim()) {
            toast.error("Please enter your email to reset password", {
                toastId: REQUIRED_FIELDS_TOAST_ID,
                position: "top-right",
                autoClose: 5000,
            });
            return;
        }
        setIsResetting(true);
        try {
            await sendPasswordResetEmail(userAuth, emailInput);
            toast.success("Password reset email sent! Check your inbox.", {
                toastId: REQUIRED_SUCCESS_TOAST_ID,
                position: "top-right",
                autoClose: 5000,
            });
        } catch (error) {
            console.error("Error sending reset email:", error.message);
            toast.error(`Error: ${error.message}`, {
                toastId: REQUIRED_ERROR_TOAST_ID,
                position: "top-right",
                autoClose: 5000,
            });
        }finally{
            setIsResetting(false);
        }
    }

    return (
        <>
            <section className="w-full h-screen overflow-hidden relative">
                <div className="flex items-start justify-between w-full h-full">
                    <div className="lg:relative fixed inset-0 z-50 max-w-[700px] w-full h-full flex flex-col items-center justify-center ">
                        <div className="bg-white max-w-[500px] w-full shadow-xl p-2 rounded-md">
                            <h2 className="text-3xl font-bold font-[Montserrat] tracking-wide text-blue-700 px-2 uppercase">log in</h2>
                            <p className="font-normal text-sm px-2 text-gray-600 font-[Montserrat] tracking-wide">Welcome back, Fill in your Login details!</p>

                            <div className=" mt-3 w-full">
                                <form onSubmit={handleLogin}>
                                    <div className="w-full h-auto mt-4">
                                        <label className="font-[lato] text-md text-gray-700 tracking-wide" htmlFor="email">Email</label><br />
                                        <input value={emailInput} onChange={(e)=> setEmailInput(e.target.value)} className="border border-gray-400 outline-hidden rounded-md px-2 font-[lato] tracking-wide text-md text-gray-600 w-full h-[40px] mt-1 focus:border-2 focus:border-blue-600" type="email" id="email" placeholder="@gmail.com" />
                                    </div>
                                    
                                    <div className="w-full h-auto mt-4">
                                        <label className="font-[lato] text-md text-gray-700 tracking-wide" htmlFor="password">Password</label><br />
                                        <div className="w-full h-full flex items-center border border-gray-400 rounded-md">
                                            <input value={passwordInput} onChange={(e)=> setPasswordInput(e.target.value)} className="border-none outline-hidden  px-2 font-[lato] tracking-wide text-md text-gray-600 w-full h-[40px] mt-1" type={togglepassword ? "text" : "password"} id="password" placeholder="Enter your password" />
                                            <div className="mr-2 cursor-pointer" onClick={()=> setTogglePassword(!togglepassword)}>
                                                {togglepassword ? (<IoMdEye size={20} color="blue"/>) : (<IoIosEyeOff size={20} color="blue"/>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        {isResetting ? (
                                            <span className="text-sm text-blue-600 font-[mulish] font-normal tracking-wide flex items-center gap-1">
                                                Sending...
                                                <div className="flex flex-row gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
                                                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-.5s]"></div>
                                                </div>
                                            </span>
                                        ) : (
                                            <span className="text-sm text-blue-600 font-[mulish] font-normal tracking-wide cursor-pointer" onClick={handleForgotPassword}>
                                                Forgot password?
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-5 w-full h-auto flex items-center justify-center rounded-md cursor-pointer">
                                        {isloading ? (<button className="font-[lato] font-normal text-lg text-white w-full h-[40px] bg-blue-900 rounded-md" type="submit" disabled={isloading}>
                                            <div className="flex flex-row justify-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.7s]"></div>
                                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.9s]"></div>
                                        </div>
                                        </button>): (<button className="font-[lato] font-normal text-lg text-white w-full h-[40px] cursor-pointer  bg-blue-600 rounded-md">Login</button>)}
                                    </div>
                                </form>
                                <p className="mt-4 text-center font-[mulish] text-sm text-[#0d0262cb]">Do not have an account <Link to="/signup" className="text-gray-500">Signup</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:relaive w-full h-screen">
                        <img src={acctBgImage} alt="background image" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </section>
        </>
    );
}

