const blog=require('../models/blog')
const blog_data = async ({title, describe, name}) => {
    try {
        const newBlog = await blog.create({ title, describe, username: name });
        return { success: true, blog: newBlog };
    } catch (err) {
        console.error(err);
        return { success: false, message: "Internal server error" };
    }
};

module.exports = { blog_data };
