const { strict } = require('assert');
const mongoose = require('mongoose');
const multer = require('multer');
const imgPath = "/uploads/subcateImages"
const path = require('path');
const ScateSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    discription :{
        type : String,
        required : true
    },
    category :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cate",
        required : true
    },
    subcateImage :{
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
ScateSchema.statics.uploadImage = multer({storage : imgStorage}).single('subcateImage');
ScateSchema.statics.imgModel = imgPath;
const Scate = mongoose.model('Scate',ScateSchema);
module.exports=Scate;