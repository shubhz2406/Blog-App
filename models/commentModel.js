const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type:String,required:true},
    commentText:{type:String,required:true},
    blogId:{type:String,required:true}
})

module.exports = mongoose.model('Comment',commentSchema);