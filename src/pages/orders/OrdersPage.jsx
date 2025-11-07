import axios from "axios";
import { useState, useEffect} from "react";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";
export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders=async ()=>{
      const response=await axios.get("/api/orders?expand=products")
      setOrders(response.data);
    }
    
    getOrders()
  });

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <OrdersGrid key={order.id} order={order}/>
            );
          })}
        </div>
      </div>
    </>
  );
}
