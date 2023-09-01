import { useEffect, useState } from "react";
import axios from "axios";
import { Base_URL } from "../Config/BaseURL";
import'../Styles/Home.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';




function Home({color}){

   const  navigate=useNavigate()

     var [data,setData]=useState([])

    
    
     function getProductsData(){
        axios.get(Base_URL+'/get-products').then((res_of_products)=>{
      
          let u_id=localStorage.getItem('auth-id')
          axios.get(Base_URL+'/get-cart-count',{params:{u_id:u_id}}).then((res_of_cart)=>{
          
         let prod_arr=res_of_products.data.data;
         let cart_arr=res_of_cart.data.data;
         for(let i=0;i<prod_arr.length;i++)
         {
           for(let j=0;j<cart_arr.length;j++)
           {
            if(prod_arr[i].id==cart_arr[j].p_id)
            {
              prod_arr[i]['disable']=true
            }
           }

         }
         console.log(prod_arr)
         setData(prod_arr)


           }).catch((err)=>{
                  setData([])
                })



        }).catch((err)=>{
            setData([])
        })
     }
   


    useEffect(()=>{
        getProductsData()
    },[])

const addToCart=(item)=>{
  console.log(item)
  var u_id=localStorage.getItem('auth-id')
  let data={
    u_id:u_id,
    p_id:item._id,
    quantity:1
  }
  axios.post(Base_URL+'/add-to-cart',data).then((res)=>{
    toast.success(res.data.message)
    window.location.reload()
    
 }).catch((err)=>{
  toast.error(err.response.data.message)
 })
}




   const handleViewMore=(item)=>{

console.log(item)

navigate(`/products/${item._id}`, {state:item}  )

   }


    return(
     <>
     {Array.isArray(data)&& data.length>0 ?
    <>
    {data.map((el,i)=>(
        
<div className="card" key={i} style={{width: "18rem"}}>
  <img className="card-img-top" src={el.image} alt="Card image cap"/>
  <div className='card-body'>
    <h5 className="card-title">{el.p_name}</h5>
    <p className="card-text"><span style={{color:'red',fontWeight:'bold',fontSize:'20px'}}>{`-${el.discount}` }</span><span style={{marginLeft:20,fontSize:20}}> &#8377;</span>{(el.price-(el.price*el.discount/100))}</p>
    <p className="card-text"> M.R.P.<span>  &#8377; </span><del>{el.price}</del></p>
    <a onClick={ ()=>{handleViewMore(el)}} className="btn btn-primary" style={{marginRight:10}}>View More</a>
    <button disabled={el.disable==true?  true:false} onClick={ ()=>{addToCart(el)}}  className="btn btn-success">{  el.disable==true ? "Already added":"Add To Cart"} style={{marginRight:10}}Add To Cart</button>
  </div>
</div>


    ))}
   </> :null}
    </>
    )
}

export default Home;