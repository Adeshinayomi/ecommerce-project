import { Header } from "../components/Header"
import './PageNotFound.css'

export function PageNotFound({cart}){
 return(
    <>

      <Header cart={cart}/>

      <div className='page-not-found'>
        <p>Page not found</p>
      </div>
    </>
  )
}