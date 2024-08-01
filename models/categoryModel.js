const mongoose = require('mongoose')



const categorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId:{type:String,required:true},
    title:{type:String,required:true},
    imageUrl:{type:String,required:true}
})




module.exports = mongoose.model('Category',categorySchema);
