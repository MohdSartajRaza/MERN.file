import { useState,useEffect } from "react"
import axios from "axios"
import { Base_URL } from "../Config/BaseURL"
//import { toast } from "react-toastify"

function Cart()
{
    const [data,setCartData]=useState([])
    function getCartCount(){
        let u_id=localStorage.getItem('auth-id')
        axios.get(Base_URL+'/get-cart-with-products',{params:{u_id:u_id}}).then((res)=>{
            console.log(res.data.data)
            setCartData(res.data.data)
        
        }).catch((err)=>{
          setCartData([])
        })
      }
      useEffect(()=>{
      getCartCount()
      },[])


const incre=()=>{
    
}

const decre=()=>{

}





    return(

        <>
         {Array.isArray(data)&& data.length>0 ?
    <>
    {data.map((el,i)=>(
        
<div className="card" key={i} style={{width: "18rem"}}>
  <img className="card-img-top" src={el.pro_data.image} alt="Card image cap"/>
  <div className='card-body'>
    <h5 className="card-title">{el.pro_data.p_name}</h5>
    <p className="card-text"><span style={{color:'red',fontWeight:'bold',fontSize:'20px'}}>{`-${el.pro_data.discount}` }</span><span style={{marginLeft:20,fontSize:20}}> &#8377;</span>{(el.pro_data.price-(el.pro_data.price*el.pro_data.discount/100))}</p>
    <p className="card-text"> M.R.P.<span>  &#8377; </span><del>{el.pro_data.price}</del></p>
   <button onClick={()=>{decre()}} className="btn btn-danger"> -</button><input  style={{textAlign:"center",width:"20%",height:"35px",marginRigh:1,marginLeft:1}} disabled={true} value={el.quantity}/><button onClick={()=>{incre()}} className="btn btn-success">+</button>
   {/*} <a onClick={ ()=>{handleViewMore(el)}} className="btn btn-primary" style={{marginRight:10}}>View More</a>
    <button disabled={el.disable==true?  true:false} onClick={ ()=>{addToCart(el)}}  className="btn btn-success">{  el.disable==true ? "Already added":"Add To Cart"} style={{marginRight:10}}Add To Cart</button>
    */}
    </div>
</div>


    ))}
   </> :null}



        
        </>
    )
}

export default Cart