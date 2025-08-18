import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuUserRound } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { TbHome2, TbCurrencyNaira } from "react-icons/tb";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { userDb, userAuth } from "../../firebase/db.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

export default function OrderHistoryContent({ toggleProfile }) {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);


  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(userAuth, (user) => {
      if (!user) {
        setOrderHistory([]);
        setLoading(false);
        setCurrentUser(null);
        return;
      }

      setCurrentUser(user);
      fetchOrderHistory(user.uid);
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchOrderHistory = (userId) => {
    setLoading(true);
    setError(null);

    const ordersRef = collection(userDb, "checkoutDb");
    const q = query(
      ordersRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));

        const validOrders = orders.filter(order => order.userId === userId);
        
        if (validOrders.length !== orders.length) {
          console.warn("Filtered out unauthorized orders");
        }

        setOrderHistory(validOrders);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load order history");
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  };


  const formatDate = (date) => {
    return date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }) || "Date not available";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-white animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-100"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-200"></div>
          <div className="w-3 h-3 rounded-full bg-white animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-white">
        <p className="text-red-500 mb-4">Error loading order history: {error}</p>
        <button
          onClick={() => fetchOrderHistory(currentUser?.uid)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const handleViewDetails = async (order) => {
    setItemsLoading(true);
    setSelectedOrder(order);
    try {
      const itemsRef = collection(userDb, "checkoutDb", order.id, "items");
      const itemsSnapshot = await getDocs(itemsRef);
      const items = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrderItems(items);
      setDetailModal(true);
    } catch (error) {
      console.error("Error fetching order items:", error);
      toast.error("Failed to load order items");
    } finally {
      setItemsLoading(false);
    }
  };

  return (
    <>
      <section className="w-full h-[300px] bg-white">
        <div className="flex items-center justify-between gap-1 w-[90%] h-[50px] mx-auto py-10">
          <div className="flex items-center gap-1 w-[70%] h-[50px]">
            <Link
              to="/"
              className="flex items-center gap-1 font-[mulish] tracking-wide text-base text-blue-600 font-normal"
            >
              <TbHome2 />
              Home
            </Link>

            <span className="text-gray-500">
              <MdKeyboardDoubleArrowRight />
            </span>
            <Link
              to="/shop"
              className="capitalize font-[mulish] tracking-wide text-base text-blue-600 font-normal"
            >
              Shop
            </Link>

            <span className="text-gray-500">
              <MdKeyboardDoubleArrowRight />
            </span>
            <span className="capitalize font-[mulish] tracking-wide lg:text-base text-sm text-gray-400 font-normal">
              History
            </span>
          </div>
          <div
            className="w-[10%] h-[50px] flex items-center justify-center cursor-pointer"
            onClick={toggleProfile}
          >
            <LuUserRound size={20} className="text-blue-600" />
          </div>
        </div>
        <div className="w-full h-[200px] flex items-center justify-center">
          <h3 className="w-full text-center text-4xl font-[Montserrat] font-bold tracking-wider text-blue-600">
            Order History
          </h3>
        </div>
        <hr className="w-[90%] mx-auto border border-gray-300" />
      </section>

      <section className="container mx-auto px-4 py-8 max-w-6xl">
        {orderHistory.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Link
              to="/shop"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-semibold text-lg mb-4 font-[mulish]">
                Showing orders for: {currentUser?.email}
              </h4>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-[mulish]">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-[mulish]">
                        Date
                      </th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-[mulish]">
                        Status
                      </th> */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-[mulish]">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-[mulish]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <TbCurrencyNaira className="mr-1" />
                            {order.totalAmount?.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 font-[mulish] text-sm cursor-pointer" onClick={() => {setDetailModal(true); handleViewDetails(order)}}>View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      {detailModal && selectedOrder && (
        <div className="fixed inset-0 bg-[#000000d0] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto ">
            <div className="bg-white shadow-md w-full rounded-t-2xl py-4 px-6 flex items-center justify-between sticky top-0">
              <h3 className="text-base font-extrabold font-[mulish] text-blue-800">
                Order ID: {selectedOrder.orderNumber}
              </h3>
               <div className="shadow-md w-[40px] h-[40px] flex items-center justify-center cursor-pointer bg-white rounded-md" onClick={() => setDetailModal(false)}>
                <IoCloseSharp color="red" size={24}/>
              </div>
            </div>
            
            <div className="lg:p-6">
              {itemsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between lg:flex-row flex-col">
                    {/* Order Items */}
                    <div className="p-4 lg:w-[50%] w-full">
                      <h4 className="font-semibold text-lg mb-4 font-[mulish]">Order Items</h4>
                      {orderItems.length > 0 ? (
                        <ul className="space-y-4">
                          {orderItems.map(item => (
                            <li key={item.id} className="flex gap-4 items-center bg-white p-2 rounded-md ring-2 ring-[#eae2e2]">
                              <div className="w-[140px] h-[140px]">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div className="ml-3">
                                <p className="font-extrabold text-gray-700 font-[mulish] text-base uppercase tracking-wide">{item.name}</p>
                                <p className="font-[mulish] text-sm font-semibold text-gray-700"> Color: black | Quantity: {item.qty}</p>
                                <p className="font-[mulish] text-sm font-semibold text-gray-700">Size: {item.size || "No size"}</p>
                                <p className="flex items-center mt-3 font-[mulish] text-base font-semibold text-gray-900">
                                  <TbCurrencyNaira size={25} className="" />
                                  {item.price?.toLocaleString()}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No items found</p>
                      )}
                    </div>

                    
                    <div className="p-4 lg:w-[50%] w-full">
                      {/* Billing/Shipping Info */}
                      <div className="bg-white p-2 rounded-md ring-2 ring-[#eae2e2]">
                        <div>
                          <h5 className="font-semibold font-[mulish] text-lg mb-3">Billing Information</h5>
                          <p className="font-[mulish] text-gray-600 text-base font-semibold mb-2">Name: <span className="font-extrabold text-gray-800">{selectedOrder.billingFirstName} {selectedOrder.billingLastName}</span></p>
                          <p className="font-[mulish] text-gray-600 text-base font-semibold mb-2">Address: <span className="font-extrabold text-gray-800">{selectedOrder.billingAddress}</span></p>
                          <p className="font-[mulish] text-gray-600 text-base font-semibold mb-2">Email: <span className="font-extrabold text-gray-800"> {selectedOrder.billingEmail}</span></p>
                          <p className="font-[mulish] text-gray-600 text-base font-semibold mb-2">Phone Number <span className="font-extrabold text-gray-800"> {selectedOrder.billingNumber}</span></p>
                        </div>

                        <div>
                          <h5 className="font-semibold font-[mulish] text-lg my-3 pt-5 border-t-2 border-gray-300">Shipping Information</h5>
                          <p className="text-gray-600 font-[mulish] text-base font-semibold mb-2">Name: <span className="font-extrabold text-gray-800">{selectedOrder.deliveryFirstName} {selectedOrder.deliveryLastName}</span></p>
                          <p className="font-[mulish] text-base font-semibold mb-2 text-gray-600">Address: <span className="font-extrabold text-gray-800">{selectedOrder.deliveryAddress}</span></p>
                          <p className="font-[mulish] text-gray-600 text-base font-semibold mb-2">Email: <span className="font-extrabold text-gray-800">{selectedOrder.deliveryEmail}</span></p>
                          <p className="font-[mulish] text-base text-gray-600 font-semibold mb-2">Phone Number: <span className="font-extrabold text-gray-800"> {selectedOrder.deliveryNumber}</span></p>
                        </div>
                      </div>


                      {/* Order Summary */}
                       <div className="bg-white p-2 rounded-md ring-2 ring-[#eae2e2] mt-8 font-[mulish]">
                        <h4 className="font-semibold text-lg mb-4 font-[mulish]">Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="lg:text-base text-sm text-gray-700 capitalize">Date & time of order:</span>
                            <span className="lg:text-base text-sm font-semibold text-gray-700 capitalize">{formatDate(selectedOrder.createdAt)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="lg:text-base text-sm text-gray-700 capitalize">Total number of order:</span>
                            <span className="lg:text-base text-sm font-semibold text-gray-700">({String(orderItems.length).padStart(2,"0")})</span>
                          </div>
                          <div className="flex justify-between font-bold mt-4">
                            <span className="text-base capitalize">Total Amount:</span>
                            <span className="flex items-center text-xl">
                              <TbCurrencyNaira size={24} />
                              {selectedOrder.totalAmount?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}