import axios  from 'axios'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from "../../components/Header";
import { ProductGrid } from './ProductGrid';

import "./HomePage.css";

export function HomePage({cart,loadCart}) {
  const [products,setProducts]=useState([])
  const [searchParams]=useSearchParams()
  const search=searchParams.get('search')
  
  useEffect(()=>{
    const getHomeData= async()=> {
      // const response = await axios.get('/api/products')
      // setProducts(response.data)
      let response=''
      if(search){
        response=await axios.get(`/api/products?search=${search}`)
      }else{
        response= await axios.get('/api/products')
      }
      setProducts(response.data)
    }
    getHomeData()
   },[search])
  
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
