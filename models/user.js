const mongoose=require("mongoose");

const User= new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:Number,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    mobilenum:{
     type:String,
     require:true
    }
    
})

const user=mongoose.model('user',User);
module.exports=user;