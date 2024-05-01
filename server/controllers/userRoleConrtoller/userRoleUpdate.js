

exports.userroleupdaterequest = (req,res) =>{
      const userData = req.body.user;
          if (userData.usr === "admin") {
            res.json("ok")
          }else{
            res.json("you are not an admin")
          }

}