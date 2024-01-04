const Cate = require('../models/Cate');
const Scate = require('../models/Scate');
const path = require('path');
const fs = require('fs');
module.exports.scatePage = async(req,res)=>{
    cateData = await Cate.find({});
    return res.render('add_scate',{
        catedata : cateData
    });
}
module.exports.addScateData = async(req,res)=>{
    try {
        scateImagePath = '';
        if(req.file){
            scateImagePath = Scate.imgModel+'/'+req.file.filename;
            if(scateImagePath){
                req.body.subcateImage = scateImagePath;
            }
            else{
                console.log('Path Not Found');
                return res.redirect('back');
            }
        }
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Scate.create(req.body);
        return res.redirect('back');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.viewScate = async (req, res) => {
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
        let ScateData = await Scate.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page).populate('category').exec();

        let totalScatedata = await Scate.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('viewScate', {
            scatedata: ScateData,
            searchValue : search,
            totaldocument : Math.ceil(totalScatedata/perPage),
            currentPage : page,
        });
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.updateScateData = async (req, res) => {
    try {
        let scateRecord = await Scate.findById(req.params.id);
        let cateRecord = await Cate.find({});
        if (scateRecord) {
            return res.render('updateScat', {
                ScateData: scateRecord,
                cateData : cateRecord
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
module.exports.editScateData = async(req,res)=>{
    try {
        if (req.file) {
            let oldData = await Scate.findById(req.body.EditId);
            if (oldData) {
                if (oldData.subcateImage) {
                    let fullPath = path.join(__dirname, '..', oldData.subcateImage);
                    await fs.unlinkSync(fullPath);
                }
                var subcateImagePath = Scate.imgModel + '/' + req.file.filename;
                req.body.subcateImage = subcateImagePath;
                let ad = await Scate.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/scategory/view_scate');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/scategory/view_scate');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/scategory/view_scate');
            }
        }
        else {
            let oldData = await Scate.findById(req.body.EditId);
            if (oldData) {
                req.body.subcateImage = oldData.subcateImage;
                let ad = await Scate.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/scategory/view_scate');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/scategory/view_scate');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/scategory/view_scate');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/scategory/view_scate');
    }
}