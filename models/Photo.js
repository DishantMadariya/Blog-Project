const mongoose = require('mongoose');
const multer = require('multer');
const imgPath = "/uploads/photoImages"
const path = require('path');
const PhotoSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    content :{
        type : String,
        required : true
    },
    photoImage :{
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
PhotoSchema.statics.uploadImage = multer({storage : imgStorage}).single('photoImage');
PhotoSchema.statics.imgModel = imgPath;
const Photo = mongoose.model('Photo',PhotoSchema);
module.exports=Photo;