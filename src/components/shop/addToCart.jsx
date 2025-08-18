import { useState } from "react";
import { userDb } from "../../firebase/db.js";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddToCart({ user, product }) {
  const [loading, setLoading] = useState(false);
  const [toCart, setToCart] = useState(false)
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart", {position: "bottom-right", autoClose: 5000});
      navigate("/login");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const cartRef = doc(userDb, "cartdb", user.uid, "items", product.id);
      const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
            // Increase qty--------------
            setToCart(true);
            await updateDoc(cartRef, { qty: increment(1) });
            toast.success(`Already in cart, quantity is +1`, {position: "bottom-right", autoClose: 2000});
            setToCart(false);
        } else {
        setToCart(true);
        await setDoc(cartRef, {
          name: product.productName,
          price: product.productPrice,
          image: product.productImage,
          size: "",
          qty: 1,
        });
      toast.success(`${product.productName} added to cart!`, {position: "bottom-right", autoClose: 2000});
      setToCart(false);
    }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item");
    }finally{
        setLoading(false);
        setToCart(false)
    }
    setLoading(false);
    setToCart(false)
  };

  return (
    <>
      <div onClick={handleAddToCart} className="bg-blue-900 w-[40px] h-[40px] lg:flex items-center justify-center rounded-md cursor-pointer text-white hidden">
          {toCart ? (<div className="w-4 h-4 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>) : (<CiShoppingCart color="white" size={30} />)}
      </div>
      
      <div onClick={handleAddToCart} className="bg-blue-900 lg:w-[40px] h-[40px] lg:px-0 px-2 text-sm flex items-center justify-center rounded-md cursor-pointer text-white lg:hidden">
          {toCart ? (<div className="w-4 h-4 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>) : (<span className="">Add to cart</span>)}
      </div>
    </>
  );
}
