const express = require("express");
const Blog = require('../models/blog');   
const User=require('../models/user');
const { route } = require("./show_blog.routes");
const routes = express.Router();
routes.get('/show-all-blog', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('show_all', { blogs }); 
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching blogs");
    }
});
routes.get('/show-my-blog/:id',async(req,res)=>{
 const {id} = req.params;
const user = await User.findById(id);
const blogs = await Blog.find({ username: user.username });
res.render("my_blog",{blogs});

});
routes.post('/delete-blog/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id); 
    res.json({success:true});
  } catch (err) {
    console.error(err);
   res.json({success:false});
  }
});
routes.post('/edit-blog/:id', async (req, res) => {
    const { id } = req.params;
    const { title, describe } = req.body;

    try {
        const blog = await Blog.findByIdAndUpdate(
            id,
            { title, describe }, // sirf ye 2 fields update hongi
            { new: true }         // updated document return karega
        );

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        res.json({ success: true, blog });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});


module.exports = routes;
