const express = require('express');
const routs = express.Router();
const usercontroller = require('../controllers/usercontroller');
const Comment = require('../models/Comment');
routs.get('/', usercontroller.showPage);
routs.get('/blogSingle/:id',usercontroller.blogSingle);
routs.get('/workThree',usercontroller.workThree);
routs.post('/addComment',Comment.uploadImage,usercontroller.addComment);
routs.get('/contact',usercontroller.contact);
routs.post('/insertContact',usercontroller.insertContact)
module.exports = routs;