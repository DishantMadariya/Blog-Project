const mongoose = require('mongoose');
const ReviewSchema = mongoose.Schema({
    city :{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    contry :{
        type : String,
        required : true
    },
    content :{
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
const Review = mongoose.model('Review',ReviewSchema);
module.exports=Review;