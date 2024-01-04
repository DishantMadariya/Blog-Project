const mongoose = require('mongoose');
const multer = require('multer');
const imgPath = "/uploads/sliderImages"
const path = require('path');
const SliderSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    link :{
        type : String,
        required : true
    },
    discription :{
        type : String,
        required : true
    },
    sliderImage :{
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
SliderSchema.statics.uploadImage = multer({storage : imgStorage}).single('sliderImage');
SliderSchema.statics.imgModel = imgPath;
const Slider = mongoose.model('Slider',SliderSchema);
module.exports=Slider;