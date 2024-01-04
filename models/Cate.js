const mongoose = require('mongoose');
const CateSchema = mongoose.Schema({
    category :{
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
const Cate = mongoose.model('Cate',CateSchema);
module.exports = Cate;