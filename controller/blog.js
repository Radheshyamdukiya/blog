const blog = require('../services/blog');
const user=require('../models/user');
const blog_page = async (req, res) => {
  const { title, describe } = req.body;
  const {id}=req.params;
    const current_user = await user.findById(id);
      const name=current_user.username;
  if (!title || !describe || !name) {
    return res.status(400).send("Fields are empty");
  }

  try {
    await blog.blog_data({ title, describe,name });
    return res.status(200).json({ 
    success: true, 
    message: "Data saved successfully" 
});
  } catch (err) {
    console.log("Not saved", err);
    return res.status(500).send("Internal server error");
  }
};
module.exports=blog_page;