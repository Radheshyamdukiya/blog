const user=require('../models/user');
const mongoose=require("mongoose");
module.exports.reguser=async({email,password,username,mobilenum})=>{
     const newuser=await user.create({
        email,
        password,
        username,
        mobilenum
     })
     .then(()=>{
        console.log("data is saved");
     })
     .catch(()=>{
        console.log("data is not saved");
     })
}