import { useState } from 'react';
import { NavLink,useNavigate,useSearchParams } from 'react-router';
import Logo from '../assets/images/logo-white.png'
import MobileLogo from '../assets/images/mobile-logo.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import './Header.css'


export function Header({cart}) {
  const [search,setSearch]=useState('')
  const navigate=useNavigate()
  const [searchParams]=useSearchParams()
  const searchS=searchParams.get('search')

  let totalQuantity=0

  cart.forEach((cartItem)=>{
    totalQuantity +=cartItem.quantity
  })

  const change= (event)=>{
    setSearch(event.target.value)
  }
  const searchValue= ()=>{
    navigate(`/?search=${search}`)
    if (searchS){
      setSearch(searchS)
    }
  }
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={Logo}/>
          <img className="mobile-logo" src={MobileLogo} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={search} onChange={change}/>

        <button className="search-button" onClick={searchValue} >
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
