const mongoose=require("mongoose");
const db=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("connected");
        })
        .catch((err)=>{
            console.log("not connected");
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }
}
module.exports =db;