const mongoose = require('mongoose');
const OfferSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    icon :{
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
const Offer = mongoose.model('Offer',OfferSchema);
module.exports=Offer;