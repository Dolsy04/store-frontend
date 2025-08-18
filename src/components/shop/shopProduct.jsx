import {db, userAuth} from "../../firebase/db.js";
import { collection, query, onSnapshot, orderBy} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {useState, useEffect} from "react";
import { MdOutlineError } from "react-icons/md";
import { TbCurrencyNaira } from "react-icons/tb";
// import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { HiHeart } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ShopCart from "./addToCart.jsx";


export default function ShopProduct({search}){

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filterproduct, setFliteredProduct] = useState([]);
    const [user, setUser] = useState([]);
    
    useEffect(()=>{
    const checkAuth = onAuthStateChanged(userAuth, (u) => {
            setUser(u);
    });
        return () => checkAuth();
    },[])
   
    useEffect(()=>{
       setLoading(true);

        const shoeRef = query(collection(db, "shoeproductDB"))
        const pefumeRef = query(collection(db, "perfumeproductDB"))
        const clothRef = query(collection(db, "clothproductDB"))

        let shoeProducts = [];
        let perfumeProducts = [];
        let clothProducts = [];

        const unsubShoes = onSnapshot(shoeRef, (snapShot) => {
            shoeProducts = snapShot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            margeProduct()
        },(error)=>setError(error.message));

        const unsubpefume = onSnapshot(pefumeRef, (snapShot) => {
            perfumeProducts = snapShot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            margeProduct()
        },(error)=>setError(error.message));

        const unsubcloth = onSnapshot(clothRef, (snapShot) => {
            clothProducts = snapShot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            margeProduct()
        },(error)=>setError(error.message));


        const margeProduct = () => {
            const productMarge = [...shoeProducts, ...clothProducts, ...perfumeProducts].sort(() => Math.random() - 0.5); ;
            setProduct(productMarge);
            setFliteredProduct(productMarge);
            setLoading(false);
        }

        return()=>{
            unsubShoes();
            unsubpefume();
            unsubcloth();
        };
    },[]);

    useEffect(()=>{
        if(search.trim()){
            const filterResult = product.filter((product)=> product.productName?.toLowerCase().includes(search.toLowerCase()) || String(product.productPrice).toLowerCase().includes(search.toLowerCase()));

            setFliteredProduct(filterResult);
            setCurrentPage(1);
        }else{
            setFliteredProduct(product)
        }
    },[search, product])

    const paginatedPage = filterproduct.slice((currentPage - 1 ) * 18, currentPage * 18);
    const pageNumber = Math.ceil(filterproduct.length / 18);

    return (<>
        <section className="relative">
            <div>
                {loading ? (
                    <div className="w-full h-auto">
                    <div className="flex items-center justify-center flex-col">
                    <div className="relative">
                    <div className="relative w-20 h-20">
                        <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#fff] border-b-[#000] animate-spin" style={{animationDuration: '3s'}} />
                        <div className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#fff] animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#000]/20 via-transparent to-[#ff0000]/20 animate-pulse rounded-full blur-sm" />
                    </div>
                <p className="text-center mt-2 text-md font-medium fomt[mulish] text-gray-100">Generating shop product....</p>
                </div>
                </div>
                ) : product.length === 0 ? (
                    <div className="bg-amber-100 lg:w-[80%] w-[95%] lg:h-[44px] h-auto mx-auto flex items-center justify-between my-15 rounded">
                    <p className="w-[8px] h-full bg-red-600 p-1"></p>
                    <p className="text-red-500 text-md font-semibold font-[mulish] text-center flex items-center justify-center gap-2 py-3 w-full rounded-md">
                        <MdOutlineError />
                        Sorry! - Shop is unavailable right now! 
                    </p>
                </div>
                ) : search.trim() && filterproduct.length === 0 ? (
                    <div className="bg-amber-100 lg:w-[80%] w-[95%] lg:h-[44px] h-auto mx-auto flex items-center justify-between my-15 rounded">
                    <p className="w-[8px] lg:h-full bg-red-600 p-1"></p>
                    <p className="text-red-500 text-md font-semibold font-[mulish] text-center flex items-center justify-center gap-2 py-3 w-full rounded-md">
                        <MdOutlineError />
                        No result found for your search. try searching for another product!
                    </p>
                </div>
                ) : (
                    <div className="lg:w-[90%] w-[100%] h-auto lg:mx-auto lg:my-10 flex items-center lg:justify-center gap-1 justify-between lg:gap-10 flex-wrap bg-white lg:bg-transparent">
                        {paginatedPage.map((product) => (
                            <div key={`${product.id}-${product.productName.replace(/\s+/g, "-")}`} className="relative lg:w-[30%] w-[155px] h-auto bg-white lg:rounded-2xl">
                                <div className="lg:w-full lg:h-[300px] h-[150px] rounded-2xl">
                                    <img src={product.productImage} alt={`${product.productName} image`} className="w-full h-full object-cover lg:rounded-2xl"/>
                                </div>
                                <div className="pt-4 lg:px-5 px-0">
                                    <p className="capitalize font-bold font-[mulish] lg:text-lg text-sm lg:text-left text-center tracking-wide text-blue-900">{product.productName}</p>
                                </div>

                                <div className="py-4 px-5 flex items-center justify-between lg:flex-row flex-col">
                                    <div className="flex items-center gap-0.5 lg:items-start lg:flex-col">
                                        <p className="capitalize font-semibold font-[mulish] text-gray-400 text-sm">Price</p>
                                        <p className="capitalize font-semibold font-[mulish] flex items-center text-sm lg:text-base"><TbCurrencyNaira className="lg:text-xl text-sm"/>{Number(product.productPrice).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <ShopCart user={user} product={product} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <p>{error}</p>
                        <div className="mt-3 w-full flex items-center justify-between px-3 py-4 bg-white rounded shadow">
                            <div>
                                <p className="font-semibold font-[mulish] text-gray-500 text-sm">Page {currentPage} of {pageNumber}</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className={`rounded p-1 shadow ${currentPage === 1 ? " bg-zinc-100 cursor-auto" : "bg-white cursor-pointer"}`}><IoIosArrowBack size={20} color="gray"/></button>
                                <button disabled={currentPage === pageNumber} onClick={() => setCurrentPage((prev) => prev + 1)} className={`rounded p-1 shadow ${currentPage === pageNumber ? " bg-zinc-100 cursor-auto" : "bg-white cursor-pointer"}`}><IoIosArrowForward size={20} color="gray"/></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        
            
        </section>
    </>)
}