const Review = require('../models/Review');
module.exports.AddReview = (req,res)=>{
    return res.render('add_review');
}
module.exports.insertReview = async(req,res)=>{
    try {
        if(req.body){
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            await Review.create(req.body);
            return res.redirect('back');
        }
        else{
            console.log("Data Not Found");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.viewReview = async(req,res)=>{
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
        let reviewdata = await Review.find({
            $or :[
                {"city":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page);
        let totalReviewdata = await Review.find({
            $or :[
                {"city":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        if(reviewdata){
            return res.render('viewReview',{
                review : reviewdata,
                searchValue : search,
                totaldocument : Math.ceil(totalReviewdata/perPage),
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
            let active = await Review.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Review.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.updateReviewData = async (req, res) => {
    try {
        let reviewRecord = await Review.findById(req.params.id);
        if (reviewRecord) {
            return res.render('updateReview', {
                ReviewData: reviewRecord,
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
module.exports.editReviewData = async(req,res)=>{
    try {
        let oldData = await Review.findById(req.body.EditId);
            if (oldData) {
                let ad = await Review.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record Update Succesfully");
                    return res.redirect('/admin/review/view_review');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/review/view_review');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/review/view_review');
            }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.deletReviewData = async (req, res) => {
    try {
        let oldData = await Review.findById(req.params.id);
        if (oldData) {
            let deletData = await Review.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Review Data Delete");
                    return res.redirect('back');
                }
                else {
                    console.log('Review Data Not Delete');
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
    await Review.deleteMany({_id:{$in:req.body.deletAll}});
     return res.redirect('/admin/review/view_review');
}