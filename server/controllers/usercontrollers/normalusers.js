let bycrypt = require("bcrypt")
let saltround = 10
const normaluser = require("../../db/models/normaluserschema")
const jwt = require("jsonwebtoken")




let token 
// sign up ===============================================================================
const signup = async (req,res)=>{

    if (req.body == undefined || req.body == null) {
        res.json({toaststatus:"error", message:"provide valid data",isAuthenticated:false})
       return
    } else {
      const {name,email,password} = req.body
          let alluseremail = await normaluser.findOne({email})
             if (alluseremail != undefined || alluseremail != null) {
                  return res.json({toaststatus:"error", message:"email already exists",isAuthenticated:false})
             }else{
                  if (name == undefined || email == undefined || password == undefined ) {          
                      return res.json({toaststatus:"error", message:"details incomplete",isAuthenticated:false})   
                  } else {
                         let hashpass = await bycrypt.hash(password,saltround)
                            const signupdataset =  await normaluser.create({
                                  name,
                                  email,
                                  password:hashpass
                            })
                               let usn = signupdataset.name
                               let usi = signupdataset._id
                               let usr = signupdataset.role
                               let token = jwt.sign({usi,name,email,usr},process.env.jwt_Key)
                                  res.cookie("token",token).status(201).json({toaststatus:"success", message:"signup successfull",isAuthenticated:true,usn,usi,usr,token})
                      }
              
            }
  }

}

// login=====================================================================================
        const login = async (req,res) => {
                           
            if (req.body == undefined || req.body == null) {
               return res.json({toaststatus:"error", message:"provide valid data",isAuthenticated:false ,user:false})
            }else{
              const {email,password} = req.body
                let alluseremail = await normaluser.findOne({email})
                    if(alluseremail == null || alluseremail == undefined){
                     return res.json({toaststatus:"error", message:"user not found",isAuthenticated:false,user:false})
                    }
                    if (alluseremail != null || alluseremail != undefined) {
                      let usp = alluseremail.password
                         let usn = alluseremail.name
                            let usi = alluseremail._id
                               let usr = alluseremail.role
                                 let decryptpass = await bycrypt.compare(password,usp)
                                    if (decryptpass) {
                                       let token = jwt.sign({usi,usn,email,usr},process.env.jwt_Key)
                                          res.cookie("token",token).json({
                                               usn,
                                                 email,
                                                     usi,
                                                        usr,
                                                           token,
                                                               user:true,
                                                                   isAuthenticated:true,
                                                                      toaststatus:"success", message:"login successful"                  
                                          })
                                    }else{
                                     return res.json({toaststatus:"error", message:"login details invalid",isAuthenticated:false,user:false}) 
                                   }
                    }else{
                      return res.json({toaststatus:"error",message:"user not found",isAuthenticated:false}) 
                    }
            }
      }


   // all users for admin
      const allusers = async (req,res)=>{
              try {
               let users = await normaluser.find()
               res.json(users)
              } catch (error) {
               console.log(error);
               res.send('error occured')
              }
      }

// get users based on search

const allusersserch = async (req, res) => {
    let userdata = req.body.user;
       if (userdata.usr == "admin") {
        
         const { serchvalue, serchtext } = req.body;

         if (serchvalue == 'All') {
            const users = await normaluser.find();
            return   res.json(users);
        }
      
         if (!serchvalue && !serchtext) {
               return res.status(400).json({ message:"incomplete request"});
            }
      
            try {
                const users = await normaluser.find({ [serchvalue]: serchtext });
                     res.json(users);
            } catch (error) {
                   console.error("Error occurred during search:", error);
                      res.status(500).json({ error: "An error occurred while processing your request." });
            }
          
      }else{
         res.status(401).json({message:"only admins have access to this route"})
      }
};



// change users role for admin      
      const updateuserrole = async (req, res) => {
           let userdata = req.body.user;
              if (userdata.usr == "admin") {
                 let _id = req.params.id;
                    if (_id) {     
                        try {
                            let result = await normaluser.findOne({_id});
                               if (result) {
                                    result.role = req.body.role;
                                        await result.save();
                                          res.status(200).json({toaststatus:"success",message:"User role updated succesfully"});
                               }else{
                                     res.status(404).json({toaststatus:"error",message:"User not found"});
                               }
                        } 
                          catch (error) {
                               console.log(error);
                                      res.status(500).json({toaststatus:"error",message:"Internal Server Error"}) 
                        }   
                    }            
               }else {
               return res.status(401).json({toaststatus:"error",message:"Access denied"})   
               }       
      }
     

    module.exports = {signup,login,allusers,updateuserrole,allusersserch} 
    

   