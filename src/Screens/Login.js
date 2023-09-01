import { toast } from 'react-toastify';
import '../Styles/Login.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Base_URL } from '../Config/BaseURL';
//import { useNavigate } from 'react-router-dom';


function Login(){

  //const navigate=useNavigate()
       
  const[values,setValues]=useState({
   
    email:"",
    password:"",
    
   
 })
 function handleInputs (e){
    setValues({...values,[e.target.name]:e.target.value})
 }

 function handleSubmit(){
    
     
     var ref_email=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    
    if(!ref_email.test(values.email))
    {
     toast.error('Please enter a valid Email')
    }

    else if(values.password.trim().length<7)
    {
      toast.error('please enter a 6 digit Password')
    }
    
    else
    {
      axios.post(Base_URL +'/login-user',values).then((res)=>{
       console.log(res) 
       toast.success(res.data.message)
      localStorage.setItem('auth-id',res.data.data._id)
      window.location.reload()

      }).catch((err)=>{
        
        console.log(err)
        toast.error(err.response.data.message)
      })
    }
 }

     
    return(

        <>
        <div className="container">
       {/* <form>*/}
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name='email' value={values.email} onChange={handleInputs}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password"  name='password' value={values.password} onChange={handleInputs} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-group ">
    <h5> Don't Have An Account <Link to='/register'> Register Here</Link></h5>
  </div>
  <button onClick={handleSubmit} type="submit"  className="btn btn-primary">Submit</button>
  

{/*</form>*/}
</div>

        </>
    );
}


export default Login