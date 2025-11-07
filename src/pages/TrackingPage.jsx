import axios from "axios"
import dayjs from "dayjs"
import { useEffect,useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router"
import { Header } from "../components/Header"
import './TrackingPage.css'

export function TrackingPage({cart}){
  const [order,setOrder]=useState()
  const {orderId,productId}=useParams()
  
  useEffect(()=>{
    const getOrders= async ()=>{
      const response=await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data)
    }
    getOrders()
  },[orderId])

  if(!order){
    return null;
  }
  const product= order.products.find((product)=>{
      return product.productId === productId
  })

  const totalDeliveryTimeMs=product.estimatedDeliveryTimeMs - order.orderTimeMs

  const timePassedMs=dayjs().valueOf() - order.orderTimeMs

  let deliveryPercent=(timePassedMs/totalDeliveryTimeMs) * 100

  let isPreparing=false
  let isShipped=false
  let isDelivered=false

  if(deliveryPercent < 33){
    isPreparing=true
  }else if(deliveryPercent >=33 && deliveryPercent < 100){
    isShipped=true
  }else if(deliveryPercent >= 100){
    deliveryPercent = 100
    isDelivered=true
  }

  return(
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

      <title>Tracking</title>

      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" href="/orders">
            View all orders 
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(product.estimatedDeliveryTimeMs).format('dddd MMMM D')}
          </div>

          <div className="product-info">
           {product.product.name}
          </div>

          <div className="product-info">
            Quantity: {product.quantity}
          </div>

          <img className="product-image" src={product.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width:`${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  )
}