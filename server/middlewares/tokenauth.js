const jwt = require('jsonwebtoken');


const verifytoken = async(req,res,next) =>{
  let authHeader = req.headers['authorization'];
     if (!authHeader) {
         return res.status(401).json({ message:'No authorization header provided',toaststatus:"error"});
        }
        const token = authHeader.split(' ')[1]
            if (!token) {
              return res.status(401).json({ message: 'No token, authorization denied',toaststatus:"error" });
            }
              try {
                  const decoded = await jwt.verify(token,process.env.jwt_Key);
                      req.body.user = decoded
                          next()
                  } catch (error) {
                     console.log(error);
                          res.status(401).json({ message: 'Token is not valid',isAuthenticated:false,toaststatus:"error" });
                          return
               }
}

module.exports = verifytoken;