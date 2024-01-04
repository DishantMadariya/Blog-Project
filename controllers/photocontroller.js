const Photo = require('../models/Photo');
const path = require('path');
const fs = require('fs');
module.exports.AddPhoto = (req,res)=>{
    return res.render('add_photo');
}
module.exports.insertPhotoData = async(req,res)=>{
    try {
        photoImagePath = '';
        if(req.file){
            photoImagePath = Photo.imgModel+'/'+req.file.filename;
            if(photoImagePath){
                req.body.photoImage = photoImagePath;
            }
            else{
                console.log('Path Not Found');
                return res.redirect('back');
            }
        }
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Photo.create(req.body);
        return res.redirect('back');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.viewPhoto = async (req, res) => {
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
        let PhotoData = await Photo.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page);
        let totalPhotodata = await Photo.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('viewPhoto', {
            photodata: PhotoData,
            searchValue : search,
            totaldocument : Math.ceil(totalPhotodata/perPage),
            currentPage : page
        });
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Photo.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Photo.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.deletPhotoData = async (req, res) => {
    try {
        let oldData = await Photo.findById(req.params.id);
        if (oldData) {
            var oldImage = oldData.photoImage;
            if (oldImage) {
                let fullPath = path.join(__dirname, '..', oldData.photoImage);
                await fs.unlinkSync(fullPath);
                let deletData = await Photo.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Record & Image Delet Succesfully");
                    return res.redirect('back');
                }
                else {
                    console.log("Record Delet Succesfully");
                    return res.redirect('back');
                }
            }
            else {
                let deletData = await Photo.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Photo Data Delet");
                    return res.redirect('back');
                }
                else {
                    console.log("Photo Record Delet");
                    return res.redirect('back');
                }
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
module.exports.updatePhotoData = async (req, res) => {
    try {
        let photoRecord = await Photo.findById(req.params.id);
        if (photoRecord) {
            return res.render('updatePhoto', {
                PhotoData: photoRecord,
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
module.exports.editPhotoData = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await Photo.findById(req.body.EditId);
            if (oldData) {
                if (oldData.photoImage) {
                    let fullPath = path.join(__dirname, '..', oldData.photoImage);
                    await fs.unlinkSync(fullPath);
                }
                var PhotoImagePath = Photo.imgModel + '/' + req.file.filename;
                req.body.photoImage = PhotoImagePath;
                let ad = await Photo.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/photo/view_photo');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/photo/view_photo');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/photo/view_photo');
            }
        }
        else {
            let oldData = await Photo.findById(req.body.EditId);
            if (oldData) {
                req.body.photoImage = oldData.photoImage;
                let ad = await Photo.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/photo/view_photo');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/photo/view_photo');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/photo/view_photo');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/photo/view_photo');
    }
}
module.exports.deletAll = async(req,res)=>{
    await Photo.deleteMany({_id:{$in:req.body.deletAll}});
     return res.redirect('back');
}