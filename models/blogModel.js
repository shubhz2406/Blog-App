const mongoose = require('mongoose')



const blogSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,required:true},
    title:{type:String,required:true},
    imageUrl:{type:String,required:true},
    content:{type:String,required:true},
    categoryTitle:{type:String,required:true},
    categoryId:{type:String,required:true},
    authorName:{type:String,required:true}

})




module.exports = mongoose.model('Blog',blogSchema);
