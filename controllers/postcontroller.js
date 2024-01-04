const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
const Cate = require('../models/Cate')
module.exports.AddPost = (req,res)=>{
    return res.render('add_post');
}
module.exports.PostData = async (req, res) => {
    try {
        req.body.name = req.user.name;
        console.log(req.body.name);
        postImagePath = '';
        if (req.file) {
            postImagePath = Post.imgModel + '/' + req.file.filename;
            if (postImagePath) {
                req.body.postImage = postImagePath;
            }
            else {
                console.log("Path Not Found");
            }
        }
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Post.create(req.body);
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.viewPost = async (req, res) => {
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
        var perPage = 2;

        var PostData = await Post.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
                {"category":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).limit(perPage).skip(perPage*page);
        let totalPostdata = await Post.find({
            $or :[
                {"title":{$regex : ".*"+search+".*",$options:"i"}},
                {"category":{$regex : ".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();
        return res.render('viewPost', {
            postdata: PostData,
            searchValue : search,
            totaldocument : Math.ceil(totalPostdata/perPage),
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
            let active = await Post.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Post.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.deletAll = async(req,res)=>{
    try {
        var dataArr=[];
        let arrDel= req.body.deletAll;
        for(let i=0; i<arrDel.length; i++){
            let dd = await Post.findById(arrDel[i]);
            dataArr.push(dd);
        }
        let delet = await Post.deleteMany({_id:{$in:req.body.deletAll}});
        if(delet){
            for(let i=0; i<dataArr.length; i++){
                let fullPath = path.join(__dirname,".."+dataArr[i].postImage);
                await fs.unlinkSync(fullPath);
            }
            return res.redirect('back');
        }
        return res.redirect('back');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.deletPostData = async (req, res) => {
    try {
        let oldData = await Post.findById(req.params.id);
        if (oldData) {
            var oldImage = oldData.postImage;
            if (oldImage) {
                let fullPath = path.join(__dirname, '..', oldData.postImage);
                await fs.unlinkSync(fullPath);
                let deletData = await Post.findByIdAndDelete(req.params.id);
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
                let deletData = await Post.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Post Data Delet");
                    return res.redirect('back');
                }
                else {
                    console.log("Post Record Delet");
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
        return res.redirect('back');
    }
}
module.exports.updatePostData = async (req, res) => {
    try {
        let postRecord = await Post.findById(req.params.id);
        let cateRecord = await Cate.find({});
        if (postRecord) {
            return res.render('updatePost', {
                PostData: postRecord,
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
module.exports.editPostData = async(req,res)=>{
    try {
        if (req.file) {
            let oldData = await Post.findById(req.body.EditId);
            if (oldData) {
                if (oldData.postImage) {
                    let fullPath = path.join(__dirname, '..', oldData.postImage);
                    await fs.unlinkSync(fullPath);
                }
                var postImagePath = Post.imgModel + '/' + req.file.filename;
                req.body.postImage = postImagePath;
                let ad = await Post.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/post/view_post');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/post/view_post');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/post/view_post');
            }
        }
        else {
            let oldData = await Post.findById(req.body.EditId);
            if (oldData) {
                req.body.subcateImage = oldData.subcateImage;
                let ad = await Post.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/post/view_post');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/post/view_post');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/post/view_post');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/post/view_post');
    }
}