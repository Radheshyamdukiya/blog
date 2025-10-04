const mongoose=require('mongoose');
const blog_schema= mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    describe:{
       required:true,
       type:String
    },
    username:{
       required:true,
       type:String
    }
})
const blog= mongoose.model('blog',blog_schema);
module.exports=blog;