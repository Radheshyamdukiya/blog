const express=require('express');
const router=express.Router();
const user=require('../controller/register');

router.get('/login',(req,res)=>{
   res.render("login");
})
router.post('/login',user.login);
router.get('/register',(req,res)=>{
res.render("register");
})

router.post('/register',user.reg);
module.exports=router;