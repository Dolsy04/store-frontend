import { Link } from "react-router-dom";
import { TbHome2, TbCurrencyNaira } from "react-icons/tb";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack, IoMdTrash } from "react-icons/io";
import { TiMinus, TiPlus } from "react-icons/ti";
import { LuUserRound } from "react-icons/lu";
import { useState, useEffect } from "react";
import { userDb } from "../../firebase/db.js";
import { doc, deleteDoc, onSnapshot, updateDoc, increment, collection } from "firebase/firestore";
import { userAuth } from "../../firebase/db.js";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function CartContent({toggleProfile}){
    const [Authloading, setAuthLoading] = useState(true)
    const [cartItems, setCartItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sizeInput, setSizeInput] = useState({})
    
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(userAuth, (user) => {
        if (!user) {
            setCartItems([]);
            setAuthLoading(false);
            return;
        }

        const itemsRef = collection(userDb, "cartdb", user.uid, "items");

        const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
            const items = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setCartItems(items);
            setAuthLoading(false);
        });

    return () => unsubscribe();
    });
    return () => unsubscribeAuth();
    }, []);


    const updateSize = async (item, sizeInput) => {
        try {
            const auth = userAuth;
            const user = auth.currentUser;
            if (!user) {
                toast.error("User not signed in");
                return;
            }

        
            const formattedSize = sizeInput;

            const cartRef = doc(userDb, "cartdb", user.uid, "items", item.id);
            await updateDoc(cartRef, { size: formattedSize });

            // toast.success(`${item.name} size updated to ${formattedSize}`, {
            //     position: "top-right",
            //     autoClose: 2000
            // });
        } catch (error) {
            console.error(error);
            toast.error(`Error updating size: ${error.message}`);
        }
    };
    const addupdateQty = async (item) => {
        try{
            const auth = userAuth;
            const user = auth.currentUser;
            if (!user) {
                throw new Error("User not signed in");
            }

            const cartRef = doc(userDb, "cartdb", user.uid, "items", item.id);
            await updateDoc(cartRef, {qty: increment(1)});
            toast.success(`${item.name} quantity is +1`, {position: "top-right", autoClose: 2000})
        }catch (error){
            console.error(error);
            toast.error(`Error when increasing quatity, ${error.message}, Try again in few miuntes!`)
        }
    }
    const minusupdateQty = async (item) => {
        try{
            const auth = userAuth;
            const user = auth.currentUser;
            if (!user) {
                toast.error("User not signed in");
            }
            if (item.qty <= 1) {
                toast.warning("Quantity cannot be less than 1", {autoClose: 2000, position: "top-right"});
                return;
            }
            const cartRef = doc(userDb, "cartdb", user.uid, "items", item.id);
            await updateDoc(cartRef, {qty: increment(-1)});
            toast.success(`${item.name} quantity is -1`, {position: "top-right", autoClose: 2000})
        }catch (error){
            console.error(error);
            toast.error(`Error when increasing quatity, ${error.message}, Try again in few miuntes!`)
        }
    }
    const deleteUpdateItem = async (item) => {
        try{
            const auth = userAuth;
            const user = auth.currentUser;
            if (!user) {
                toast.error("User not signed in");
            }
           
            const cartRef = doc(userDb, "cartdb", user.uid, "items", item.id);
            await deleteDoc(cartRef, {qty: increment(-1)});
            toast.success(`${item.name} removed from cart`, {position: "top-right", autoClose: 2000})
        }catch (error){
            console.error(error);
            toast.error(`Failed to remove item: ${error.message}, Try again in few miuntes!`)
        }
    }
    const totalAmount = cartItems.reduce((acc, item)=>{
        return acc + ((Number(item.price) * item.qty))
    },0)

    const paginatedPage = cartItems.slice((currentPage - 1) * 5, currentPage * 5)
    const pageNumber = Math.ceil(cartItems.length / 5);


    return(
        <>
            <section className="w-full h-[300px] bg-white">
                <div className="flex items-center justify-between gap-1 w-[90%] h-[50px] mx-auto py-10">
                    <div className="flex items-center gap-1 w-[70%] h-[50px]">
                        <Link to="/" className="flex items-center gap-1 font-[mulish] tracking-wide text-base text-blue-600 font-normal"><TbHome2 /> Home</Link>

                        <span className="text-gray-500 "><MdKeyboardDoubleArrowRight /></span>
                        <Link to="/shop" className="capitalize font-[mulish] tracking-wide text-base text-blue-600 font-normal">shop</Link>

                        <span className="text-gray-500 "><MdKeyboardDoubleArrowRight /></span>
                        <span className="capitalize font-[mulish] tracking-wide text-base text-gray-400 font-normal">Cart</span>
                    </div>
                    <div className="w-[10%] h-[50px] flex items-center justify-center cursor-pointer"onClick={toggleProfile}>
                        <LuUserRound size={20} className="text-blue-600"/>
                    </div>
                </div>
                <div className="w-full h-[200px] flex items-center justify-center">
                    <h3 className="w-full text-center text-4xl font-[Montserrat] font-bold tracking-wider text-blue-600">Cart </h3>
                </div>
                <hr  className="w-[90%] mx-auto border border-gray-300"/>
            </section>

            <section className="w-full bg-white p-5">
                <div className="lg:w-[90%] w-full mx-auto flex items-start gap-4 lg:flex-row flex-col">
                    <div className="lg:w-[70%] w-full bg-white rounded-md shadow-md py-2 lg:px-4 px-1">
                        <div>
                            <h3 className="font-semibold font-[mulish] text-2xl my-2">My Cart ({String(cartItems.length).padStart("2", 0)})</h3>
                            <hr  className="border border-gray-300"/>
                            <div className="w-full">
                                <div>
                                    {Authloading ? (
                                        <div className="w-4 h-4 mt-6 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>
                                    ) : cartItems.length === 0 ? (
                                        <div>
                                            <p className="text-md my-4 capitalize font-semibold font-[Montserrat] text-gray-500">Your cart is empty</p>
                                            <p className="text-sm my-4 capitalize font-semibold font-[Montserrat] text-gray-500">Click to <Link to="/shop" className="text-blue-600 font-bold">Shop Now</Link></p>
                                        </div>
                                    ) : (
                                        <div className="">
                                            {paginatedPage.map((item) => (
                                                <div key={item.id} className="my-6 border-b border-gray-400 flex justify-between items-center lg:flex-row md:flex-row flex-col">
                                                    <div className="flex gap-5 items-start my-4">
                                                        <div className="lg:w-[150px] lg:h-[150px] w-[140px] h-[140px] shadow-xl bg-[#f8f8f8] p-1 rounded-xl">
                                                            <img src={item.image} alt={`${item.name} image`} className="w-full h-full object-cover rounded-xl" />
                                                        </div>
                                                        <div className="flex justify-between flex-col h-full lg:-5 py-2">
                                                            <div>
                                                                <h3 className="font-semibold capitalize font-[mulish] text-base tracking-wide">{item.name}</h3>
                                                                <div className="flex gap-1 items-center md:flex-row lg:flex-row flex-col">
                                                                    <div className="flex gap-1 items-center">
                                                                        <p className="lg:text-base md:text-base text-xs text-gray-500 font-[mulish]">Color:</p>
                                                                        <p className="lg:text-sm md:text-base text-xs  text-black font-[mulish]">black, brown</p>
                                                                    </div>
                                                                    <span className="lg:block md:block hidden text-sm text-gray-500 font-[mulish]">|</span>
                                                                    <div>
                                                                        <div className="flex gap-1 items-center">
                                                                            <p className="lg:text-sm md:text-base text-xs  text-gray-500 font-[mulish]">Quantity:</p>
                                                                            <p className="text-sm text-black font-[mulish]">{item.qty}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-1 items-start lg:items-center mt-2 ">
                                                                    <p className="text-sm text-gray-500 font-[mulish]">Size: </p>
                                                                    <div className="w-[55px] h-[30px]">
                                                                        <input type="text" className="text-sm text-black font-[mulish] w-full h-full border border-gray-400 outline-none focus:border-2 focus:border-blue-600 px-1" placeholder={item.size} value={sizeInput[item.id] || ""} onChange={(e) => setSizeInput((prev) => ({ ...prev, [item.id]: e.target.value}))} onBlur={() => updateSize(item, sizeInput[item.id] || "")}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="flex items-center justify-center lg:justify-start md:justify-start font-[mulish] lg:text-lg text-sm font-semibold"><TbCurrencyNaira  size={25}/>{Number(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <div className="flex gap-2 items-center my-2">
                                                            <button onClick={() => addupdateQty(item)}  className="bg-black text-white font-[mulish] w-[25px] h-[25px] flex items-center justify-center rounded cursor-pointer"><TiPlus size={20} color="white"/></button>

                                                            <p className="text-sm font-[mulish] text-black">{item.qty}</p>

                                                            <button onClick={() => minusupdateQty(item)} className="bg-black text-white font-[mulish] w-[25px] h-[25px] flex items-center justify-center rounded cursor-pointer"> <TiMinus /> </button>
                                                        </div>
                                                        <div className="my-4">
                                                            <button onClick={() => deleteUpdateItem(item)}  className="flex items-center gap-2 bg-[#d9dbdb6b] py-1 px-2 rounded font-[mulish] lowercase tracking-wide cursor-pointer text-sm"><IoMdTrash size={20} color="red"/>Remove</button>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <p className="text-sm text-gray-500 font-[mulish]">Total Price:</p>
                                                            <p className="text-sm text-black font-[mulish] flex items-center "><TbCurrencyNaira />{(Number((item.price) * item.qty).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="mt-3 w-full flex flex-row-reverse items-center justify-between px-3 pb-4">
                                                <div>
                                                    <p className="font-semibold font-[mulish] text-gray-500 text-sm">Page {currentPage} of {pageNumber}</p>
                                                </div>
                                                <div className="flex items-center gap-5">
                                                    <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className={`rounded p-1 shadow ${currentPage === 1 ? "bg-gray-200  cursor-not-allowed" : "bg-blue-600 cursor-pointer"}`}><IoIosArrowBack size={20} color="white" /></button>
                                                    <span className="text-sm text-gray-600 font-[mulish]">{currentPage}</span>
                                                    <button disabled={currentPage === pageNumber} onClick={() => setCurrentPage((prev) => prev + 1)} className={`rounded p-1 shadow ${currentPage === pageNumber ? " bg-gray-200 cursor-not-allowed" : "bg-blue-600 cursor-pointer"}`}><IoIosArrowForward size={20} color="white"/></button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[30%] w-full bg-white rounded-md shadow-md">
                        <div className="bg-white">
                            <h3 className="bg-red-600 py-2 px-4 text-center font-semibold font-[mulish] text-xl text-white rounded-md">Cart Summary</h3><br />
                           
                            <div className="py-3 px-4 flex items-center justify-between">
                                <p className="font-[mulish] font-normal text-base text-gray-700 tracking-wide">Total Item: </p>
                                <p className="font-[mulish] font-normal text-sm text-black tracking-wide">({String(cartItems.length).padStart("2", 0)})</p>
                            </div>
                            <hr  className="border border-gray-300"/>
                            <div className="py-3 px-4 flex items-center justify-between">
                                <p className="font-[mulish] font-normal text-base text-gray-700 tracking-wide">Total Amount: </p>
                                <p className="font-[mulish] font-normal text-sm text-black tracking-wide  flex items-center"> <TbCurrencyNaira size={20}/>{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="bg-gray-700 w-full h-[44px] mt-4">
                                <Link to={cartItems.length > 0 ? "/checkout" : "/shop"} className="border w-full h-full flex items-center justify-center font-[mulish] font-semibold text-white text-base">{cartItems.length > 0 ? "Proceed to checkout" : "Shop Now"}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}