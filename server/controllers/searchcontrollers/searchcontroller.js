const product = require("../../db/models/productschema")

exports.searchlistingseller = async (req,res) =>{
    let userdata = req.body.user;
       if (userdata.usr == "admin" || userdata.usr == "seller") {
        
         const { serchvalue, serchtext } = req.body;

         if (serchvalue == 'All') {
            const users = await product.find();
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
}