const Slider = require('../models/Slider');
const Offer = require('../models/Offer');
const Photo = require('../models/Photo');
const Review = require('../models/Review');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Cate = require('../models/Cate');
const Scate = require('../models/Scate');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
module.exports.showPage = async(req,res)=>{
    const SlData = await Slider.find({});
    const OfferData = await Offer.find({});
    const PhotoData = await Photo.find({});
    const ReviewData = await Review.find({});
    const PostData = await Post.find({});
    return res.render('userPanel/home',{
        sliderData : SlData,
        offerData : OfferData,
        photoData : PhotoData,
        reviewData : ReviewData,
        postData : PostData
    });
}

module.exports.blogSingle = async(req,res)=>{
    try {
        if(req.params.id){
            var allPostId = await Post.find();
            var idArray = [];
            allPostId.map((v)=>{
                idArray.push(v.id);
            })
            var next= '' ;
            for(let i=0; i<idArray.length; i++){
                if(idArray[i] === req.params.id){
                    next =i
                    break;
                }
            }
        }
        let SingleData = await Post.findById(req.params.id);
        let CommentData = await Comment.find({postId : req.params.id});
        let recentPost = await Post.find({}).sort({ id: -1 }).limit(3);
        return res.render('userPanel/blogSingle',{
            singleData : SingleData,
            postId : req.params.id,
            comment : CommentData,
            allId : idArray,
            pos : next,
            recentpost : recentPost
        })
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}
module.exports.workThree = async(req,res)=>{
    let SubData = await Scate.find({});
    let CatData = await Cate.find({})
    return res.render('userPanel/workThree',{
        subdata : SubData,
        catdata : CatData
    });
}
module.exports.addComment =async(req,res)=>{
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = Comment.imgModel + "/" + req.file.filename;
        } else {
            console.log("Image Not Found");
            return res.redirect("back");
        }
        if (req.body) {
            req.body.commentImage = imagePath;
            req.body.isActive = false;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            let data = await Comment.create(req.body);
            return res.redirect("back");
        } else {
            console.log("Data Not Found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }

}
module.exports.contact= (req,res)=>{
    return res.render('userPanel/contact')
}
module.exports.insertContact = async(req,res)=>{
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    let contact = await Contact.create(req.body);
    if(contact){
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: "dishantpatel1446@gmail.com",
              pass: "rmzlnegpncaonqdm",
            },
          });
          const info = await transporter.sendMail({
            from: 'dishantpatel1446@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'YOM', // Subject line
            text: `<h2>${req.body.name}</h2>`, // plain text body
            html: `<p>Hello ! ${req.body.name} Sir/Mam,</p>
            <h3>Im Dishant From YOM </h3>
            <p>if You have any Query or Question Then Contact us on Social media</p>
            <a href='https://www.instagram.com/_dishant.14/'>Click Here </a>
            <p>Thank you for using our services!`,
          });
    }
    return res.redirect('back');
    
}