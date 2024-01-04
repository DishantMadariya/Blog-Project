const mongoose = require('mongoose');
const multer = require('multer');
const imgPath = "/uploads/postImages"
const path = require('path');
const PostSchema = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    title :{
        type : String,
        required : true
    },
    discription :{
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    postImage :{
        type : String,
        required : true
    },
    isActive :{
        type : Boolean,
        required : true
    },
    currentDate :{
        type : String,
        required : true
    },
    updateDate :{
        type : String,
        required : true
    }
});
const imgStorage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,path.join(__dirname,'..',imgPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});
PostSchema.statics.uploadImage = multer({storage : imgStorage}).single('postImage');
PostSchema.statics.imgModel = imgPath;
const Post = mongoose.model('Post',PostSchema);
module.exports=Post;