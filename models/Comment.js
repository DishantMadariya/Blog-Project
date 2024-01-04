const mongoose = require("mongoose");

const multer = require("multer");

const path = require("path");

const imgPath = "/uploads/commentImages";

const CommentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    commentImage: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    currentDate: {
        type: String,
        required: true,
    },
    updateDate: {
        type: String,
        required: true,
    },
});

const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imgPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

CommentSchema.statics.uploadImage = multer({ storage: imgStorage}).single("commentImage");

CommentSchema.statics.imgModel = imgPath;

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;