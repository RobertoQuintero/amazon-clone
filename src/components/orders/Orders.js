import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db } from "../../firebase";
import { useStateValue } from "../../context/StateProvider";
import Order from "./Order";

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log("snap", snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders?.map((order, i) => (
          <Order order={order} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
