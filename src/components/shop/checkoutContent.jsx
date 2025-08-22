import { Link, useNavigate } from "react-router-dom";
import { TbHome2, TbCurrencyNaira } from "react-icons/tb";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";
import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  collection,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { userDb, userAuth, db } from "../../firebase/db.js";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function CheckoutContent({toggleProfile}) {
  const [Authloading, setAuthLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingNumber, setBillingNumber] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [deliveryFirstName, setDeliveryFirstName] = useState("");
  const [deliveryLastName, setDeliveryLastName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryNumber, setDeliveryNumber] = useState("");
  const [deliveryEmail, setDeliveryEmail] = useState("");
  const Navigate = useNavigate()

  const addCheckoutProduct = async (e) => {
    e.preventDefault();

    if (
      !billingFirstName.trim() ||
      !billingLastName.trim() ||
      !billingAddress.trim() ||
      !billingEmail.trim() ||
      !billingNumber.trim() ||
      !deliveryFirstName.trim() ||
      !deliveryLastName.trim() ||
      !deliveryAddress.trim() ||
      !deliveryNumber.trim() ||
      !deliveryEmail.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsLoading(true);
    const orderId = `${billingFirstName
      .toLowerCase()
      .replace(/\s+/g, "")}_${Date.now()}`;
    
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(100 + Math.random() * 900);
    const orderNumber = `SPSC-${billingFirstName.charAt(0).toUpperCase()}${billingLastName.charAt(0).toUpperCase()}-${timestamp}-${randomNum}`;

    try {
      const frontendBatch = writeBatch(userDb);
      const backendBatch = writeBatch(db); 
    

      const orderData = {
      id: orderId,
      userId: userAuth.currentUser.uid,
      orderNumber,
      billingFirstName,
      billingLastName,
      billingAddress,
      billingNumber,
      billingEmail,
      deliveryFirstName,
      deliveryLastName,
      deliveryAddress,
      deliveryNumber,
      deliveryEmail,
      totalAmount,
      createdAt: serverTimestamp(),
      status: "Pending",
      paymentStatus: "Not Paid",
    };
      
    // -------------save checkout to frontend db
      const frontendOrderRef = doc(userDb, "checkoutDb", orderId);
      frontendBatch.set(frontendOrderRef, orderData);

    // -------------save checkout to backend db
      const backendOrderRef = doc(db, "orders", orderId);
      backendBatch.set(backendOrderRef, orderData);


      // ----------Add order item to both database

      cartItems.forEach((item) => {

        // ---------------Frontend items
        const frontendItemsRef = doc(collection(userDb, "checkoutDb", orderId, "items"),item.id);
        frontendBatch.set(frontendItemsRef, createItemData(item))

        // -----------Backend items FOR ADMIN 
        const backendItemsRef = doc(collection(db, "orders", orderId, "items"),item.id);
        backendBatch.set(backendItemsRef, createItemData(item));
    
      });


      // Clearing user cart in frontend database ------------------
      const userCartRef = collection(userDb, "cartdb", userAuth.currentUser.uid, "items");
      cartItems.forEach((item) => {
        const itemRef = doc(userCartRef, item.id);
        frontendBatch.delete(itemRef);
      });

      await Promise.all([
        frontendBatch.commit(),
        backendBatch.commit()
      ]);

       setTimeout(()=>{
          Navigate("/success")
      },1000)

      toast.success("Order placed successfully!");
      setCartItems([]);
      setBillingFirstName("");
      setBillingLastName("");
      setBillingAddress("");
      setBillingNumber("");
      setBillingEmail("");
      setDeliveryFirstName("");
      setDeliveryLastName("");
      setDeliveryAddress("");
      setDeliveryNumber("");
      setDeliveryEmail("");
    } catch (error) {
      console.error(error);
      toast.error(`Error placing order: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  function createItemData(item) {
  return {
    id: item.id,
    name: item.name,
    size: item.size,
    qty: item.qty,
    price: item.price,
    image: item.image,
    createdAt: serverTimestamp()
  };
}
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(userAuth, (user) => {
      if (!user) {
        setCartItems([]);
        setAuthLoading(false);
        return;
      }

      const itemsRef = collection(userDb, "cartdb", user.uid, "items");

      const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        setAuthLoading(false);
      });

      return () => unsubscribe();
    });

    return () => unsubscribeAuth();
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + Number(item.price) * item.qty;
  }, 0);

  return (
    <>
      <section className="w-full h-[300px] bg-white">
        <div className="flex items-center justify-between gap-1 w-[90%] h-[50px] mx-auto py-10">
          <div className="flex items-center gap-1 w-[70%] h-[50px]">
            <Link
              to="/shop"
              className="flex items-center gap-1 font-[mulish] tracking-wide text-base text-blue-600 font-normal"
            >
              <TbHome2 />
              Shop
            </Link>

            <span className="text-gray-500 ">
              <MdKeyboardDoubleArrowRight />
            </span>
            <Link
              to="/cart"
              className="capitalize font-[mulish] tracking-wide text-base text-blue-600 font-normal"
            >
              Cart
            </Link>

            <span className="text-gray-500 ">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className="capitalize font-[mulish] tracking-wide text-base text-gray-400 font-normal">
              Checkout
            </span>
          </div>
          <div className="w-[10%] h-[50px] flex items-center justify-center cursor-pointer"onClick={toggleProfile}>
              <LuUserRound size={20} className="text-blue-600"/>
          </div>
        </div>
        <div className="w-full h-[200px] flex items-center justify-center">
          <h3 className="w-full text-center text-4xl font-[Montserrat] font-bold tracking-wider text-blue-600">
            Checkout
          </h3>
        </div>
        <hr className="w-[90%] mx-auto border border-gray-300" />
      </section>

      <section className="w-full bg-white p-5">
        <div className="w-full flex items-start gap-6 lg:flex-row flex-col">
          {/* deliveryinfo */}
          <div className="lg:w-[60%] w-full bg-white shadow-md rounded-md">
            <div className="w-full p-4">
              <form>
                <div>
                  <h3 className="text-2xl font-[Montserrat] font-semibold capitalize my-7">
                    Billing information
                  </h3>
                  <div>
                    {/* ------------Billing-information-------- */}
                    {/* names */}
                    <div className="w-full flex items-center justify-between lg:gap-8 gap-4 lg:flex-row flex-col">
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={billingFirstName}
                          onChange={(e) => setBillingFirstName(e.target.value)}
                          placeholder="First Name"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600"
                        />
                      </div>
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={billingLastName}
                          onChange={(e) => setBillingLastName(e.target.value)}
                          placeholder="Last Name"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600"
                        />
                      </div>
                    </div>
                    {/* ends names */}
                    <div className="w-full h-auto flex items-start flex-col gap-2 mt-6">
                      <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                        Address
                      </label>
                      <div className="w-full h-[140px]">
                        <textarea
                          value={billingAddress}
                          onChange={(e) => setBillingAddress(e.target.value)}
                          className="w-full h-full resize-none p-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600 bg-[#f5f5f5]"
                          placeholder="Address"
                        ></textarea>
                      </div>
                    </div>
                    {/* number email */}
                    <div className="w-full flex items-center justify-between mt-6 lg:gap-8 gap-4 lg:flex-row flex-col">
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={billingNumber}
                          onChange={(e) => setBillingNumber(e.target.value)}
                          placeholder="00112345678"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600"
                        />
                      </div>
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          Email
                        </label>
                        <input
                          type="email"
                          value={billingEmail}
                          onChange={(e) => setBillingEmail(e.target.value)}
                          placeholder="Email"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden  focus:border-2 focus:border-blue-600"
                        />
                      </div>
                    </div>
                    {/* end number email */}
                    {/* ------------Billing-information-------- */}
                  </div>
                  <hr className="border-b-1 border-gray-300 mt-7" />
                  {/* ----------------shipping--------------- */}
                  <h3 className="text-2xl font-[Montserrat] font-semibold capitalize my-7">
                    Shipping Information
                  </h3>
                  <div>
                    {/* names */}
                    <div className="w-full flex items-center justify-between lg:gap-8 gap-4 lg:flex-row flex-col">
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={deliveryFirstName}
                          onChange={(e) => setDeliveryFirstName(e.target.value)}
                          placeholder="First Name"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600"
                        />
                      </div>
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={deliveryLastName}
                          onChange={(e) => setDeliveryLastName(e.target.value)}
                          placeholder="Last Name"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600"
                        />
                      </div>
                    </div>
                    {/* ends names */}
                    <div className="w-full h-auto flex items-start flex-col gap-2 mt-6">
                      <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                        Address
                      </label>
                      <div className="w-full h-[140px]">
                        <textarea
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full h-full resize-none p-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600 bg-[#f5f5f5]"
                          placeholder="Address"
                        ></textarea>
                      </div>
                    </div>
                    {/* number email */}
                    <div className="w-full flex items-center justify-between lg:gap-8 gap-4 lg:flex-row flex-col mt-6">
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={deliveryNumber}
                          onChange={(e) => setDeliveryNumber(e.target.value)}
                          placeholder="00112345678"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden capitalize focus:border-2 focus:border-blue-600"
                        />
                      </div>
                      <div className="w-full h-auto flex items-start flex-col gap-2">
                        <label className="font-[mulish] text-sm tracking-wide text-gray-600">
                          Email
                        </label>
                        <input
                          type="email"
                          value={deliveryEmail}
                          onChange={(e) => setDeliveryEmail(e.target.value)}
                          placeholder="Email"
                          className="bg-[#f5f5f5] w-full h-[40px] px-2 text-black font-[mulish] text-base rounded-md outline-hidden focus:border-2 focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-b-1 border-gray-300 mt-7" />
                  <h3 className="text-2xl font-[Montserrat] font-semibold capitalize my-2">
                    Payment Method
                  </h3>
                  <div className="w-[100%] mx-auto ">
                    <p className="bg-amber-200 p-3 rounded font-[mulish] ">
                      Online payment is not avaliable for now, You will be
                      contact to make payment
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* order summary */}
          <div className="lg:w-[40%] w-full bg-white shadow-md rounded-md pb-6">
            <div>
              <h3 className="text-2xl font-[Montserrat] font-semibold text-gray-500 capitalize py-2 px-3">
                Your Order
              </h3>
              <hr className="border-b-1 border-gray-300 mt-4" />

              <div>
                {isloading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="flex flex-row justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.7s]"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.9s]"></div>
                    </div>
                    <p className="text-gray-600 font-[mulish]">
                      Processing your order...
                    </p>
                  </div>
                ) : cartItems.length === 0 ? (
                  <p className="text-center text-red-500 py-3 font-[mulish]">
                    Your cart is empty{" "}
                    <Link className="text-blue-600" to="/shop">
                      Shop Now
                    </Link>
                  </p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id}>
                        <div className="flex items-center justify-between my-2 lg:w-[95%] px-1 lg:px-0 w-full mx-auto">
                          <div className="w-full h-auto flex items-center gap-2 lg:gap-6">
                            <div className="w-[60px] h-[60px] rounded-md">
                              <img
                                src={item.image}
                                alt={`${item.name} image`}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div>
                              <h3 className="font-[mulish] text-sm capitalize text-gray-700 font-semibold">
                                {item.name}
                              </h3>
                              <p className="flex items-center font-[mulish] text-xs md:text-sm lg:text-sm text-gray-600 capitalize">
                                size: {item.size || "00"} - quantity: {item.qty}
                              </p>
                              <p className="font-[mulish]  text-xs md:text-sm lg:text-sm text-gray-600 capitalize">
                                Color: brown, black
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="flex items-center font-[mulish] text-sm text-black">
                              <TbCurrencyNaira size={25} />
                              {Number(item.price * item.qty).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <hr className="border border-gray-300" />
                      </div>
                    ))}

                    <div className="w-[95%] rounded-md h-[44px] mx-auto mt-4 flex items-center justify-between">
                      <p className="text-lg tracking-wide text-gray-700 font-[mulish]">
                        Total:
                      </p>
                      <p className="text-lg tracking-wide text-black flex items-center font-[mulish]">
                        <TbCurrencyNaira size={25} />
                        {Number(totalAmount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div
                      className={`w-[95%] rounded-md h-[44px] mx-auto mt-4 ${
                        isloading ? "bg-gray-400" : "bg-gray-600"
                      }`}
                    >
                      <button
                        onClick={addCheckoutProduct}
                        disabled={isloading}
                        className="w-full h-full text-white font-[mulish] cursor-pointer"
                      >
                        {isloading ? (
                          <div className="flex flex-row justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.7s]"></div>
                            <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:-.9s]"></div>
                          </div>
                        ) : (
                          <span>Place Order</span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


// const batch = writeBatch(userDb);
// batch.set(orderRef, {
      //   id: orderId,
      //   userId: userAuth.currentUser.uid,
      //   orderNumber: orderNumber,
      //   billingFirstName: billingFirstName,
      //   billingLastName: billingLastName,
      //   billingAddress: billingAddress,
      //   billingNumber: billingNumber,
      //   billingEmail: billingEmail,
      //   deliveryFirstName: deliveryFirstName,
      //   deliveryLastName: deliveryLastName,
      //   deliveryAddress: deliveryAddress,
      //   deliveryNumber: deliveryNumber,
      //   deliveryEmail: deliveryEmail,
      //   // status: "Pending",
      //   totalAmount: totalAmount,
      //   createdAt: serverTimestamp(),
      // });

      // const itemsCollectionRef = collection(
      //   userDb,
      //   "checkoutDb",
      //   orderId,
      //   "items"
      // );
      // 