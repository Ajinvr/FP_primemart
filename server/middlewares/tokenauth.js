const jwt = require('jsonwebtoken');


const verifytoken = async(req,res,next) =>{
  let authHeader = req.headers['authorization'];
     if (!authHeader) {
         return res.json({ message:'No authorization header provided'});
        }
        const token = authHeader.split(' ')[1]
            if (!token) {
              return res.json({ message: 'No token, authorization denied' });
            }
              try {
                  const decoded = await jwt.verify(token,process.env.jwt_Key);
                      req.body.user = decoded
                          next()
                  } catch (error) {
                    console.log(error);
                          res.json({ message: 'Token is not valid' });
               }
}

module.exports = verifytoken;