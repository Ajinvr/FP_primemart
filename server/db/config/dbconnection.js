const mongoose = require("mongoose")



const connectdb =  async ()=>{
try {
     const connect = await mongoose.connect(process.env.DBURL)
          console.log("connection to the database was successful!");    
} catch (error) {
    console.log(error);
}
}

module.exports = connectdb;