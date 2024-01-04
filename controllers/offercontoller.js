const Offer = require('../models/Offer');
module.exports.AddOffer = (req,res)=>{
    return res.render('add_offer');
}
module.exports.insertofferData = async(req,res)=>{
    try {
        if(req.body){
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await Offer.create(req.body);
            return res.redirect('back');
        }
        else{
            console.log("Data Not Found");
            return res.redirect('back')
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back')
    }
}
module.exports.viewOffer = async(req,res)=>{
    try {
        var search = "";
        if(req.query.search){
            search = req.query.search;
        }
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0;
        }
        var perPage = 2;
        let offerData = await Offer.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page);
        let totalOfferdata = await Offer.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        if(offerData){
            return res.render('viewOffer',{
                offer : offerData,
                searchValue : search,
                totaldocument : Math.ceil(totalOfferdata/perPage),
                currentPage : page
            })
        }
        else{
            console.log("Offer data not found");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back')   
    }
}
module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Offer.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Data Deactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Offer.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Data Deactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.updateOfferData = async (req, res) => {
    try {
        let offerRecord = await Offer.findById(req.params.id);
        if (offerRecord) {
            return res.render('updateOffer', {
                OfferData: offerRecord,
            })
        }
        else {
            console.log('Record Not Found');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.editOfferData = async(req,res)=>{
    try {
        let oldData = await Offer.findById(req.body.EditId);
            if (oldData) {
                let ad = await Offer.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record Update Succesfully");
                    return res.redirect('/admin/offer/view_offer');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/offer/view_offer');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/offer/view_offer');
            }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.deletOfferData = async (req, res) => {
    try {
        let oldData = await Offer.findById(req.params.id);
        if (oldData) {
            let deletData = await Offer.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Offer Data Delete");
                    return res.redirect('back');
                }
                else {
                    console.log('Offer Data Not Delete');
                    return res.redirect('back');
                }
        }
        else {
            console.log("Record Not Found");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
    }
}
module.exports.deletAll = async(req,res)=>{
    await Offer.deleteMany({_id:{$in:req.body.deletAll}});
     return res.redirect('/admin/offer/view_offer');
}