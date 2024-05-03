const addproduct = require("../../db/models/productschema")
const cloudinary = require('../../helper/imageUpload');
const fs = require('fs');
const path = require('path');

// all products ===========================================================================================
exports.allProducts = async (req, res) => {
    try {
        let allProducts = await addproduct.find().sort({_id: -1});
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
                    let image = await cloudinary.uploader.upload(req.file.path,{
                        width:500,height:500,
                        crop:'fill'
                      })
                    const savedproduct = await addproduct.create({
                          userid: userdata.usi,
                          title:req.body.title,
                          price:req.body.price,
                          catogory:req.body.category,
                          quantity:req.body.quantity,
                          description:req.body.description,
                          filename:image.url
            });
                  let productid = savedproduct._id
                  const absoluteFilePath = path.resolve(req.file.path);
                  fs.unlink(absoluteFilePath, (err) => {
                    if (err) {
                      console.error('Error deleting file:', err);
                      return;
                    }
                  });
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

// deleting products from listing =================================================================================
exports.deleteproduct = async (req,res) =>{
    let userdata = req.body.user;
       if (userdata.usr == "seller" || userdata.usr == "admin") {
             const productid = req.body.productid
             try {
              let deletedproduct = await addproduct.findByIdAndDelete(productid)
                 let url =  deletedproduct.filename
                     const parts = url.split("/");
                          const filenameWithExtension = parts[parts.length - 1];
                                const filenameParts = filenameWithExtension.split(".");
                                     const filenameWithoutExtension = filenameParts.slice(0, -1).join(".");
                await cloudinary.uploader.destroy(filenameWithoutExtension)

               res.json({ message: 'product deleted successfully!',toaststatus:"success"})
             } catch (error) {
                console.log(error);
                res.json({message:'Error deleting product',toaststatus: "error" });
             }
       }

}

// editing products on listing =================================================================================
 

exports.updateproduct = async (req, res) => {
    let userdata = req.body.user;
       if (userdata.usr == "seller" || userdata.usr == "admin") {
           const changeddata = req.body.changedData;
               const productid = req.params.id;
        try {
             let modifiedProduct = await addproduct.findOne({ _id: productid});
                if (modifiedProduct) {
                    res.json(req.body.changedData)
                    // try {
                    //     let image = await cloudinary.uploader.upload(req.file.path,{
                    //         width:500,height:500,
                    //         crop:'fill'
                    //       }) 
                           
                    //       res.json(req.body)

                    // } catch (error) {
                        
                    // }
                }else {
                     res.send("Product not found");
                }
            } catch (error) {
            console.log("Error updating product:", error);
            res.status(500).send("Internal server error");
        }
    } else {
        res.status(403).send("Unauthorized");
    }
}

// get products by id seller

exports.getlisistingseller = async (req, res) => {

    const user = req.body.user;

    if (user.usr == 'admin' || user.usr == 'seller') {
        try {
            let userid = user.usi
            const listings = await addproduct.find({userid});
    
            if (listings.length === 0) {
                return res.status(200).json({ message: 'No listings found' });
            }
            res.json({ listings });
        } catch (error) {
            console.error('Error fetching listings:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }else{
        res.json({message:'access denied'})
    }
   
};


// get all listingss admin

exports.getlisistingadmin = async (req, res) => {

    const user = req.body.user;

    if (user.usr == 'admin') {
        try {
            const listings = await addproduct.find();
            if (listings.length === 0) {
                return res.status(200).json({ message: 'No listings found' });
            }
            res.json({ listings});
        } catch (error) {
            console.error('Error fetching listings:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }else{
        res.json({message:'access denied'})
    }
   
};