const addproduct = require("../../db/models/productschema")


// all products ===========================================================================================
exports.allProducts = async (req, res) => {
    try {
        let allProducts = await addproduct.find();
        res.json(allProducts);
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error fetching products. Please try refreshing.', toaststatus: "error" });
    }
};

// add products to listing =================================================================================
exports.addProducts = async (req, res) => {
    let userdata = global.userdata;
    if (userdata.usr == "seller" || userdata.usr == "admin") {
          if (!req.file.newFilename && !req.file.mimetype && !req.file.size && !req.file.path) {
             return res.json({message: 'Provide a valid file', toaststatus: "error" });
           }else{
                try{
                    const savedproduct = await addproduct.create({
                          userid: userdata.usi,
                          title:req.body.title,
                          price:req.body.price,
                          catogory:req.body.catogory,
                          quantity:req.body.quantity,
                          description:req.body.description,
                          filename:`http://localhost:5000/photos/${req.file.filename}`
            });

                  let productid = savedproduct._id
                  res.json({ message: 'product added successfully!',toaststatus:"success",productid});
                }catch (error) {
                   res.json({message:'Error adding product',toaststatus: "error" });
                   console.log(error);
                }
         }
    
   } else {
       return res.json({message:'Normal users does not have access to this page',toaststatus: "error" });
   }
};





