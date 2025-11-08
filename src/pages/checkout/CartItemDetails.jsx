import axios from 'axios';
import { useState } from 'react';
import {formatCurrency} from '../../utils/money';
import './CartItemDetails.css'

export function CartItemDetails({cartItem,loadCart}) {

  const [isUpdating,setIsUpdating]=useState(false)
  const [quantity,setQuantity]=useState(cartItem.quantity)

  const deleteItems=async ()=>{
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart()
  }
  const update=async ()=>{
    setIsUpdating(true)
    await axios.put(`/api/cart-items/${cartItem.productId}`,{
      quantity:Number(quantity)
    })
    await loadCart()
    // setIsUpdating(false)
  }
  const change=(event)=>{
    setQuantity(event.target.value)
  }
  const save=(event)=>{
    if(event.key === 'Enter'){
      update()
      setIsUpdating(false)
    }else if(event.key === 'Escape'){
      setIsUpdating(false)
      setQuantity(cartItem.quantity)
    }
  }
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatCurrency(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{quantity}
            <input type="text" className='input' style={{display:isUpdating?'flex':'none'}} value={quantity} onChange={change} onKeyDown={save}/>
            <span className="quantity-label" style={{display:isUpdating?'flex':'none'}} />
          </span>
          <span className="update-quantity-link link-primary" onClick={update}>Update</span>
          <span className="delete-quantity-link link-primary" onClick={deleteItems}>Delete</span>
        </div>
      </div>
    </>
  );
}
