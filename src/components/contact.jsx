import { MdEmail, MdCall } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { userDb } from "../firebase/db.js";
import { addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

export default function Contact(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState()
    const [textMessage, setTextMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        if(!name.trim() || !email.trim() || !phoneNumber.trim() || !textMessage.trim()) {
            toast.error("Fields are required!", {position: "top-left", autoClose: 5000})
            return;
        }
        
        setIsLoading(true);

        try{
            const collectionRef = collection(userDb, "MessageDb");
            await addDoc(collectionRef, {
                name: name.trim(),
                email: email.trim(),
                phoneNumber: phoneNumber.trim(),
                textMessage: textMessage.trim(),
                timestamp: new Date(),
            })
             toast.success("Message sent successfully!", {position: "top-right", autoClose: 5000});
            setName("");
            setEmail("");
            setPhoneNumber("");
            setTextMessage("");
        }catch(err){
            console.error("Error sending message: ", err);
            toast.error("Something went wrong. Please try again.");
        }finally{
            setIsLoading(false);
        }
    }



    return(<>
        <section className="bg-[#ffffffc5] w-full mt-15 py-10">
            <div className="lg:w-[80%] w-full mx-auto bg-white lg:rounded-2xl shadow-md py-5 px-3 lg:px-15 flex justify-between items-center gap-[30px] flex-col lg:flex-row">
                <div className="lg:w-[50%] w-full p-2">
                    <h3 className="capitalize font-bold font-[Montserrat] text-2xl tracking-wide text-[#260262]">Contact Us</h3>
                    <p className="mt-1 uppercase text-xs text-gray-500 font-normal font-[Montserrat]">Let’s Talk Style, We’re Here to Help!</p>
                    <p className="mt-4 font-[mulish] text-xl leading-[30px] font-bold capitalize text-black">Have questions about our products, orders, or delivery?  Need help choosing the perfect fit or fragrance? Our team is always ready to assist you.</p>
                    <p className="mt-6 text-sm text-gray-800 font-normal font-[Montserrat]">Reach out today — let’s make your shopping experience smooth, stylish, and stress-free!</p>

                    <div className="mt-10">
                        <div className="flex flex-col gap-5.5 items-start">
                            <div className="flex items-start gap-3">
                                <MdEmail size={35} color="blue"/>
                                <div className="flex flex-col gap-0">
                                    <p className="text-sm text-gray-600 font-[mulish]">E-mail</p>
                                    <a className="text-base text-blue-600 font-[mulish] tracking-wide" href="mailto:companyinquiery@gmail.com">companyinquiery@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MdCall size={35} color="blue"/>
                                <div className="flex flex-col gap-0">
                                    <p className="text-sm text-gray-600 font-[mulish]">Phone number</p>
                                    <a className="text-base text-blue-600 font-[mulish] tracking-wide" href="tel:08112345678">+234-811-2345-678</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* form contact */}

                <div className="lg:w-[50%] w-full bg-white lg:shadow-xl lg:rounded-2xl rounded-none p-8">
                    <form onSubmit={handleSubmitMessage}>
                        <div className=" w-full h-auto">
                            <label htmlFor="name" className="font-[mulist] text-sm text-gray-600 tracking-wide">Name</label><br />
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full h-[40px] mt-1 rounded-xl bg-[#ede8e8] text-gray-700 border-1 border-gray-200 outline-none px-2 font-[mulish] text-sm capitalize focus:border-blue-600"/>
                        </div>
                        <div className=" w-full h-auto mt-4">
                            <label htmlFor="email" className="font-[mulist] text-sm text-gray-600 tracking-wide">Email</label><br />
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@gmail.com" className="w-full h-[40px] mt-1 rounded-xl bg-[#ede8e8] text-gray-700 border-1 border-gray-200 outline-none px-2 font-[mulish] text-sm focus:border-blue-600"/>
                        </div>
                        <div className=" w-full h-auto mt-4">
                            <label htmlFor="tel" className="font-[mulist] text-sm text-gray-600 tracking-wide">Phone number (Calling or whatsapp)</label><br />
                            <input type="tel" id="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="08112345678" className="w-full h-[40px] mt-1 rounded-xl bg-[#ede8e8] text-gray-700 border-1 border-gray-200 outline-none px-2 font-[mulish] text-sm focus:border-blue-600"/>
                        </div>
                        <div className=" w-full h-auto mt-4">
                            <label htmlFor="message" className="font-[mulist] text-sm text-gray-600 tracking-wide">Message</label><br />
    
                            <div className="w-full h-[120px]">
                                <textarea id="message" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} placeholder="Type your message" className="w-full h-full mt-1 rounded-xl bg-[#ede8e8] text-gray-700 border-1 border-gray-200 outline-none p-2 font-[mulish] text-sm resize-none focus:border-blue-600"></textarea>
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="mt-6 flex items-center gap-2 bg-blue-700  px-4 py-2 rounded-full relative overflow-hidden cursor-pointer group">{isLoading ? (
                            <div className="flex flex-row justify-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.7s]"></div>
                                <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.9s]"></div>
                            </div>
                        ) : (
                            <>
                                <IoIosArrowRoundForward size={25} className="relative z-10 w-[20px] h-[20px] rounded-full bg-white text-blue-700 flex items-center justify-center"/>

                                <div>
                                    <span className="absolute inset-0 bg-blue-950 translate-x-[-100%] group-hover:translate-x-0 rounded-full transition-transform duration-300"></span>
                                    <span className="text-white relative z-10 font-[mulish] tracking-wide text-base">Get Solution</span>
                                </div>
                            </>
                        )}</button>
                    </form>
                </div>
            </div>
        </section>
    </>);
}


// <IoIosArrowRoundForward size={25} className="relative z-10 w-[20px] h-[20px] rounded-full bg-white text-blue-700 flex items-center justify-center"/>
// <div>
//<span className="absolute inset-0 bg-blue-950 translate-x-[-100%] group-hover:translate-x-0 rounded-full transition-transform duration-300"></span>
//<span className="text-white relative z-10 font-[mulish] tracking-wide text-base">Get Solution</span></div>