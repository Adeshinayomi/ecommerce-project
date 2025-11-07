import axios  from 'axios'
import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import { ProductGrid } from './ProductGrid';

import "./HomePage.css";

export function HomePage({cart,loadCart}) {
  const [products,setProducts]=useState([])
  
  
  useEffect(()=>{
    const getHomeData= async()=> {
      const response= await axios('/api/products')
      setProducts(response.data)
    }
    getHomeData()
   },[])
  
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <title>Ecommerce</title>

      <Header cart={cart}/>

      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
