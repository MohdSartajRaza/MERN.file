const UserSchema=require('../Schemas/UserSchema')
const ProductSchema = require('../Schemas/ProductsSchema')
const bcrypt = require('bcrypt')
const CartSchema=require('../Schemas/CartSchema')

exports.getApi = (req,res)=>{
   
    console.log(req.query.number)

    if (Number(req.query.number)  % 2==0){

        res.send(`hi ||${req.query.number} is even number`)
    }
    else
    {
        res.send(`hi || ${req.query.number} is  odd number`)
    }
    
}
exports.loginUser=(req,res)=>{
    const{email,password}=req.body;

    UserSchema.find({email:email}).then((result)=>{
        console.log(result)
      if(result.length>0) {
       
        bcrypt.compare(password,result[0].password,function(err,status){
         if(err){
            res.status(500).send({status:500,message:"something went wrong "})
         } 
         else{
            if(status==true){
                res.status(200).send({status:200,message:"Login Successfully",data:result[0]})

            }
            else
            {
                res.status(400).send({status:400,message:"Incorrect Password !!please insert correct data"})
            }
         }  
        })
      } 
      else{
        res.status(400).send({status:400,message:"You Are not Registered !! Please Register first"})
      }
    }).catch((err)=>{
        res.status(500).send({status:500,message:"something went wrong "})
    })
}

exports.registerUser=(req,res)=>{
   
    const {name,email,mobile,address,password,gender} = req.body;
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            res.status(400).send({status:400,message:"something went wrong!! please try again "}) 
        }
        else{
            bcrypt.hash(password,salt,function(err,hash){
            if(err)
            {
                res.status(400).send({status:400,message:"something went wrong!! please try again "}) 

            }
            else
            {
                UserSchema.insertMany({name:name,address:address,mobile:mobile,email:email,password:hash,gender:gender}).then((result)=>{
        

                    if(result.length>0)
                    {
                     res.status(200).send({status:200,message:"User register successfully"})
                    }
                    else{
                        res.status(400).send({status:400,message:"something went wrong!! please try again "}) 
                    }
                
                }).catch((err)=>{
                if(err.name=='validationError'){
                    res.status(400).send({status:400,message:`${err.message.split('Path')[1]}`})
                }
                else if(err.name=='MongoBulkWriteError'&&err.code==11000)
                {
                    res.status(400).send({status:400,message:` User Already Exists with these details =>${err.message.split('{')[1].replace('}', '')}`})
                }
                else
                {
                 res.status(500).send({status:500,message:"something went wrong!! please try again "}) 
                }
                })
           
            }

            })
          }
    })
   
   }

exports.updateCartQuantity=(req,res)=>{
    var{c_id}=req.body;

   CartSchema.find({_id:c_id}).then((data1)=>{

    if(data.length>0){
        
        CartSchema.updateOne({_id:c_id},{$set:{quantity:data1[0].quantity+1}}).then((data2)=>{

         console.log(data2) 
         res.send("hello")

        }).catch((err)=>{
          
            res.status(400).send({status:400,message:"Somehing Went Wrong !! Please Try Again"})


        })

    }
    else{
        res.status(400).send({status:400,message:"Somehing Went Wrong !! Please Try Again"})
    }

   }).catch((err)=>{
    res.status(500).send({status:500,message:"Somehing Went Wrong !! Please Try Again"})
   })
}  


exports.addToCart=(req,res)=>{

    const{u_id,p_id,quantity}=req.body;
    CartSchema.insertMany({u_id:u_id,p_id:p_id,quantity:quantity}).then((result)=>{
        if(result.length>0)
        {
         res.status(200).send({status:200,message:"Product Added into Cart"})
        }
        else
        {
            res.status(400).send({status:400,message:"Product Not Added into Cart!! Please Try Again"})
        }
    }).catch((err)=>{
        res.status(500).send({status:500,message:"Somehing Went Wrong !! Please Try Again"})
    })

} 
function getProductFromID(id){
    var pd= ProductSchema.find({_id:id});
    console.log("PD",pd)

    return pd[0]
}


exports.getCartProducts= (req,res)=>{
    const {u_id}=req.query;
    CartSchema.find({u_id:u_id}).then((c_result)=>{
        var cart_arr=c_result;
       if(cart_arr.length>0)
       {

        ProductSchema.find({}).then((pr_res)=>{


            var new_data = []
            if(pr_res.length>0){
                for(let i=0;i<c_result.length;i++)
                {
                    for(let j=0;j<pr_res.length;j++)
                    {
                    if(c_result[i].p_id==pr_res[j]._id)
                    {
                      new_data.push({...c_result[i]._doc,pro_data:pr_res[j]})  
                    }
                    }
                }
                
        
        res.status(200).send({status:200,data:new_data, count:cart_arr.length,message:"item  added into cart" })


            }
        }).catch((err)=>{
            
            res.status(500).send({status:500,message:"Somehing Went Wrong !! Please Try Again"})

        })





        }
        else
        {   
            res.status(200).send({status:200,data:[], count:0,message:"item   not added into cart" })
        }
    }).catch((err)=>{
        res.status(500).send({status:500,message:"Somehing Went Wrong !! Please Try Again"})
 
    })
}

exports.getCartCountByUserID =(req,res)=>{
    console.log(req.query)
    const {u_id}=req.query

    CartSchema.find({u_id:u_id}).then((result)=>{
       console.log(result)
        if(result.length>0)
        {
         res.status(200).send({status:200,data:result, count:result.length,message:"item  added into cart" })
        }
        else
        {
            res.status(400).send({status:400,message:"Product Not Added!! Please Try Again"})
        }
    }).catch((err)=>{
        res.status(500).send({status:500,message:"Somehing Went Wrong !! Please Try Again"})
    })
}


exports.addProduct =(req,res)=>{
    const{p_name,price,image,category,discount}=req.body;
    ProductSchema.insertMany({p_name:p_name,price:price,category:category,image:image,discount:discount}).then((result)=>{
        if(result.length>0)
        {
         res.status(200).send({status:200,message:"Product Added Successfully"})
        }
        else
        {
            res.status(400).send({status:400,message:"Product Not Added!! Please Try Again"})
        }
    }).catch((err)=>{
        res.status(500).send({status:500,message:"Somehing Went Wrong !! Please Try Again"})
    })


}


exports.getAllProducts =(req,res)=>{

ProductSchema.find({}).then((result)=>{
    res.status(200).send({status:200,data:result})
}).catch((err)=>{
    res.status(400).send({status:400,data:[]})
})

}