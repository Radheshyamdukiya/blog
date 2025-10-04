const mongoose=require("mongoose");
const otp_s=mongoose.Schema({
    email:{
            type:String,
            required:true
    },
    otp:{
        type:String,
        required:true
    },
    create:{
        type:Date,
        default:Date.now,
        expiress:2000

}
})
const otp=mongoose.model("Otp",otp_s);
module.exports=otp;