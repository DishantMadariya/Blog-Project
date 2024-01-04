const Cate = require('../models/Cate')
module.exports.catePage = (req,res)=>{
    return res.render('add_cate');
}
module.exports.insertCateData = async(req,res)=>{
    try {
        if(req.body){
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            let CateData = await Cate.create(req.body);
            if(CateData){
                console.log("Data Insert Succefully");
                return res.redirect('back');
            }
            else{
                console.log("Data Not Inserted");
                return res.redirect('back');
            }
        }
        else{
            console.log("Data Not Get");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log("Data Not Found");
        return res.redirect('back');    
    }
}
module.exports.viewCate = async(req,res)=>{
    try {
        var search ="";
        if(req.query.search){
            search = req.query.search;
        }
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0;
        }
        var perPage = 5;
        let CateData = await Cate.find({
            $or :[
                {"category":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page);
        let totalCatedata = await Cate.find({
            $or :[
                {"category":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('viewCate',{
            cate : CateData,
            searchValue : search,
            totaldocument : Math.ceil(totalCatedata/perPage),
            currentPage : page
        })
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Cate.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Cate.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.deletCateData = async (req, res) => {
    try {
            let oldData = await Cate.findById(req.params.id);
            if (oldData) {
                let deletData = await Cate.findByIdAndDelete(req.params.id);
                    if (deletData) {
                        console.log("Cate Data Delete");
                        return res.redirect('back');
                    }
                    else {
                        console.log('Cate Data Not Delete');
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
        return res.redirect('back');''
    }
}
module.exports.updateCateData = async (req, res) => {
    try {
        let cateRecord = await Cate.findById(req.params.id);
        if (cateRecord) {
            return res.render('updateCate', {
                CateData: cateRecord,
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
module.exports.editCateData = async(req,res)=>{
    try {
        let oldData = await Cate.findById(req.body.EditId);
            if (oldData) {
                let ad = await Cate.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record Update Succesfully");
                    return res.redirect('/admin/category/view_cate');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/category/view_cate');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/category/view_cate');
            }
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
module.exports.deletAll = async(req,res)=>{
    await Cate.deleteMany({_id:{$in:req.body.deletAll}});
     return res.redirect('/admin/category/view_cate');
}