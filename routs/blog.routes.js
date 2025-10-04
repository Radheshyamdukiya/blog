const express = require("express");
const blogController = require('../controller/blog'); 
const routes = express.Router();
const User = require('../models/user'); 
const Blog=require('../models/blog');
routes.get('/creat-blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const new_user = await User.findById(id); 

        if (!new_user) {
            return res.status(404).send('User not found');
        }
        res.render('creat_blog', {new_user}); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
routes.post('/creat-blog/:id', blogController);
routes.get('/home',async(req,res)=>{
  res.render('home',{user:User});
})
routes.get('/edit-blog/:id',async(req,res)=>{
    const {id}=req.params;
    const blog= await Blog.findById(id);
    res.render("edit",{blog});
})
routes.post('/edit-blog/:id',async(req,res)=>{
    const {id}=req.params;
    const {title,describe}=req.body;
    console.log(title);
   const blog = await Blog.findByIdAndUpdate(
  id, 
  {title: title, describe:describe }, 
  { new: true } 
)
.then(()=>{
    res.json({ success: true, message: 'Blog updated successfully' });
    console.log("changed");

})
.catch(()=>{
    consolr.log(err);
        res.json({ success: false, message: 'Failed to update blog' });
})
})

module.exports = routes;
