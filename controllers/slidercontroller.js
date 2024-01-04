const Slider = require('../models/Slider');
const path = require('path');
const fs = require('fs');
module.exports.AddSlider = (req,res)=>{
    return res.render('add_slider');
}
module.exports.insertSiderData = async(req,res)=>{
   try {
        sliderImagePath = '';
        if(req.file){
            sliderImagePath = Slider.imgModel+'/'+req.file.filename;
            if(sliderImagePath){
                req.body.sliderImage = sliderImagePath;
            }
            else{
                console.log('Path Not Found');
                return res.redirect('back');
            }
        }
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Slider.create(req.body);
        return res.redirect('back');
   }
   catch (error) {
        console.log(error);
        return res.redirect('back');
   }
}
module.exports.viewSlider = async (req, res) => {
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
        let SliderData = await Slider.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
                {"link":{$regex : ".*"+search+".*",$options:"i"}},
                {"discription":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page);
        let totalSliderdata = await Slider.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
                {"link":{$regex : ".*"+search+".*",$options:"i"}},
                {"discription":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('view_slider', {
            sliderdata: SliderData,
            searchValue : search,
            totaldocument : Math.ceil(totalSliderdata/perPage),
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
            let active = await Slider.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Slider.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.deletSliderData = async (req, res) => {
    try {
        let oldData = await Slider.findById(req.params.id);
        if (oldData) {
            var oldImage = oldData.sliderImage;
            if (oldImage) {
                let fullPath = path.join(__dirname, '..', oldData.sliderImage);
                await fs.unlinkSync(fullPath);
                let deletData = await Slider.findByIdAndDelete(req.params.id);
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
                let deletData = await Slider.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Slider Data Delet");
                    return res.redirect('back');
                }
                else {
                    console.log("Slider Record Delet");
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
module.exports.updateSliderData = async (req, res) => {
    try {
        let sliderRecord = await Slider.findById(req.params.id);
        if (sliderRecord) {
            return res.render('updateSlider', {
                SliderData: sliderRecord,
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
module.exports.editSliderData = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await Slider.findById(req.body.EditId);
            if (oldData) {
                if (oldData.sliderImage) {
                    let fullPath = path.join(__dirname, '..', oldData.sliderImage);
                    await fs.unlinkSync(fullPath);
                }
                var sliderImagePath = Slider.imgModel + '/' + req.file.filename;
                req.body.sliderImage = sliderImagePath;
                let ad = await Slider.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/slider/view_slider');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/slider/view_slider');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/slider/view_slider');
            }
        }
        else {
            let oldData = await Slider.findById(req.body.EditId);
            if (oldData) {
                req.body.sliderImage = oldData.sliderImage;
                let ad = await Slider.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/slider/view_slider');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/slider/view_slider');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/slider/view_slider');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/slider/view_slider');
    }
}
module.exports.deletAll = async(req,res)=>{
    await Slider.deleteMany({_id:{$in:req.body.deletAll}});
     return res.redirect('back');
}