import { useState } from 'react';
import'../Styles/Login.css';
import { Link , useNavigate} from 'react-router-dom';
import { Base_URL } from '../Config/BaseURL';
import axios from 'axios';
import { toast } from 'react-toastify';
function Register(){
      const Navigate=useNavigate()
     const[values,setValues]=useState({
        name:"",
        mobile:"",
        email:"",
        password:"",
        address:"",
        gender:"Male"
     })
     function handleInputs (e){
        setValues({...values,[e.target.name]:e.target.value})
     }

     function handleSubmit(){
        console.log(values)
         var reg_mobile =   /^(\+\d{1,3}[- ]?)?\d{10}$/ 
         var ref_email=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(values.name.trim()==""|| values.name.trim().length==1)
        {
           toast.error('Please enter your name')

        }
        else if(!reg_mobile.test(values.mobile))
        {
          toast.error('please enter valid mobile number')
        }
        else if(!ref_email.test(values.email))
        {
         toast.error('Please enter a valid Email')
        }
        else if(values.address.trim()==""|| values.address.trim().length==1)
        {
            toast.error('Please enter a valid address')
        }
        else if(!values.gender)
        {
            toast.error('Please Select gender')
        }
        else
        {
          axios.post(Base_URL +'/add-user',values).then((res)=>{
           console.log(res) 

           toast.success(res.data.message)
           Navigate('./login')
          }).catch((err)=>{
            
            console.log(err)
            toast.error(err.response.data.message)
          })
        }
     }
     function handleGenderSelect(e){
     setValues({...values,['gender']:e.target.value})
     }
     
    return(

        <>
        
        <div className="container">
       {/* <form> */}
  <div className="form-group">
    <label for="exampleInputName1">Name</label>
    <input type="text" name="name"onChange={handleInputs} className="form-control" id="exampleInputname1" aria-describedby="NameHelp" placeholder="Enter your name"/>
    <small id="NameHelp" className="form-text text-muted">We'll never share your name with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" name="email"onChange={handleInputs}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Mobile</label>
    <input type="number" name='mobile' onChange={handleInputs} className="form-control" id="exampleInputMobile1" aria-describedby="emailMobile" placeholder="Enter your mobile number"/>
    <small id="MobileHelp" className="form-text text-muted">We'll never share your mobile with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputAddress">Enter your address</label>
    <input type="text" name="address"onChange={handleInputs} className="form-control" id="exampleInputAddress1" aria-describedby="AddressHelp" placeholder="Enter your address"/>
   
  </div>
  <div className="form-group">
    <label for="exampleInputAddress">Select Your Gender</label>
    <select  onChange={handleGenderSelect} className="form-control">
    <option value={'Male'}>Male</option>
    <option value={'Female'}>Female</option>
    <option value={'Other'}>Others</option>
    </select>   
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password"onChange={handleInputs} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-group ">
    <h5> Already Have An Account <Link to='/login'> Login Here</Link></h5>
  </div>
  <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
  

{/* </form> */}
</div>

        </>
    );
}


export default Register;