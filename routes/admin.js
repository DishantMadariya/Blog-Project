const express = require('express');
const routs = express.Router();
const admincontroller = require('../controllers/admincontroller');
const Admin = require('../models/Admin');
const passport = require('passport');
routs.get('/',(req,res)=>{
        return res.render('login');
});
routs.get('/dashboard',passport.checkAthuntication,admincontroller.add);
routs.get('/add_admin',passport.checkAthuntication,admincontroller.showForm);
routs.get('/view_admin',passport.checkAthuntication,admincontroller.viewAdmin);
routs.get('/isactive/:id',passport.checkAthuntication,admincontroller.isactive);
routs.get('/deactive/:id',passport.checkAthuntication,admincontroller.deactive);
routs.get('/updateData/:id',passport.checkAthuntication,admincontroller.updateAdminData);
routs.get('/deletData/:id',passport.checkAthuntication,admincontroller.deletAdminData);
routs.post('/insertAdminData',Admin.uploadImage,passport.checkAthuntication,admincontroller.AdminData);
routs.post('/editAdminData',Admin.uploadImage,passport.checkAthuntication,admincontroller.editAdminData);
routs.post('/loginCheck',passport.authenticate('local',{failureRedirect : '/admin/'}),passport.checkAthuntication,admincontroller.loginCheck);
routs.get('/logout',(req,res)=>{
        if(req.user == undefined){
                return res.redirect('/admin/');
        }
        res.clearCookie('adminData');
        return res.redirect('/admin/')
})
routs.get('/changePassword',admincontroller.changePassword);
routs.post('/modifyPassword',admincontroller.modifyPassword);
routs.get('/profile',(req,res)=>{
        if(req.user == undefined){
                return res.redirect('/admin/');
        }
        return res.render('profile');
});
routs.get('/editProfile',admincontroller.editProfile);
routs.post('/updateProfile',Admin.uploadImage,admincontroller.updateProfile);
routs.get('/checkMail', async(req,res)=>{
        return res.render('forgotPassword/checkMail');
});
routs.post('/sendMail',admincontroller.sendMail);
routs.get('/verifyOtp', (req,res)=>{
        return res.render('forgotPassword/verifyOtp');
})
routs.post('/setNewPass',admincontroller.verifyOtp);
routs.post('/verifyPass',admincontroller.verifyPass);
routs.post('/deletAll',admincontroller.deletAll);
routs.use('/slider', require('./slider'));
routs.use('/offer',require('./offer'));
routs.use('/photo',require('./photo'));
routs.use('/review',require('./review'));
routs.use('/post',require('./post'));
routs.use('/category',require('./category'));
routs.use('/scategory',require('./scategory'));
module.exports = routs;