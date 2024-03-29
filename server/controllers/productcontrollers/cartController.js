const cart = require("../../db/models/cartschema")

// get cart =================================================================
exports.getcart = async (req, res) => {
     let email =  req.body.user.email
    
       try {
          let usercart = await cart.find({email})
              res.json(usercart)
            } catch (error) {
              res.json({message:'something went wrong try again',toaststatus: "error"});
       }
 };


 // add to cart =================================================================
 exports.addtocart = async (req, res) => {
    
    try {
        let email = req.body.user.email;
        let productid = req.body.productId;
        
        if (!email || !productid) {
            return res.status(401).json({ message: 'No valid data provided' });
        }

        let cartItem = await cart.findOne({ email, productid });

        if (cartItem) {
            cartItem.quantity = parseInt(cartItem.quantity) + 1;
            await cartItem.save();
            res.json({ message: 'quantity updated', toaststatus: "success" });
        } else {
            await cart.create({ email, productid});
            res.json({ message: 'Item added to cart successfully', toaststatus: "success" });
        }
        
        
    } catch (error) {
        res.json({ error: 'Internal server error.', toaststatus: "error" });
    }
};



 // remove from cart || decrease cart quantity =================================================================
 exports.modifycart = async (req, res) => {
    try {
          let email =  req.body.user.email
             let productid = req.body.productid
                 let type  = req.body.action;
                     let cartItem = await cart.findOne({ email, productid });
        
        if (type == 'put') {
                  if (cartItem.quantity <= 0) {
                        await cart.deleteOne({ email, productid });
                            res.status(200).json({ message: 'Product removed from the cart',toaststatus: "success"});
                  } else {
                        cartItem.quantity = parseInt(cartItem.quantity) - 1;
                              await cartItem.save();
                                 res.status(200).json({ message: 'successfull' });
                  }

        } else if (type == 'delete') {
                         await cart.deleteOne({ email, productid });
                                res.status(200).json({ message: 'Product removed from the cart.',toaststatus: "success"});
        } else {
            res.json({ error: 'Invalid request type.' });
        }
    } catch (error) {
        res.json({ error: 'Internal server error.' });
    }
};

 

