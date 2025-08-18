import { GiCheckMark } from "react-icons/gi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userDb, userAuth } from "../../firebase/db.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function SuccessContent() {
  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(userAuth, (user) => {
      if (!user) {
        setLatestOrder(null);
        setLoading(false);
        return;
      }
      fetchOrderHistory(user.uid);
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchOrderHistory = (userId) => {
    setLoading(true);

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
          createdAt: doc.data().createdAt?.toDate(),
        }));

        // Only take the most recent order
        setLatestOrder(orders.length > 0 ? orders[0] : null);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  return (
    <section className="w-full h-screen bg-white flex items-center justify-center">
      <div className="max-w-[500px] h-auto bg-white rounded-md shadow-2xl flex items-center p-8 justify-center flex-col">
        <div className="py-5">
          <h3 className="font-[Montserrat] font-semibold text-3xl text-blue-600">
            LOGO
          </h3>
        </div>
        <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-green-600">
          <GiCheckMark size={30} color="white" />
        </div>
        <div className="mt-4 text-center px-4">
          <h3 className="text-lg font-semibold font-[mulish] mb-1 tracking-wide">
            Order Successful
          </h3>

          {!loading && latestOrder ? (
            <p className="text-base font-[mulish] tracking-wide mb-3">
              Order ID -{" "}
              <span className="text-base font-semibold font-[mulish] mb-3">
                {latestOrder.orderNumber}
              </span>
            </p>
          ) : (
            <p className="text-sm font-[mulish] text-gray-500">Loading order...</p>
          )}

          <p className="text-base font-[mulish] tracking-wide">
            Check your profile to view transaction history
          </p>
          <p className="text-base font-[mulish] tracking-wide">
            Click here to{" "}
            <Link className="text-blue-600" to="/shop">
              Back
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
