const express = require('express');
const Slider = require('../models/Slider');
const routs = express.Router();
const passport = require('passport');
const slidercontroller = require('../controllers/slidercontroller');
routs.get('/add_slider',passport.checkAthuntication, slidercontroller.AddSlider);
routs.post('/insertSliderData',passport.checkAthuntication,Slider.uploadImage,slidercontroller.insertSiderData);
routs.get('/view_slider',passport.checkAthuntication,slidercontroller.viewSlider);
routs.get('/isactive/:id',passport.checkAthuntication,slidercontroller.isactive);
routs.get('/deactive/:id',passport.checkAthuntication,slidercontroller.deactive);
routs.get('/updateData/:id',passport.checkAthuntication,slidercontroller.updateSliderData);
routs.get('/deletData/:id',passport.checkAthuntication,slidercontroller.deletSliderData);
routs.post('/editSliderData',Slider.uploadImage,passport.checkAthuntication,slidercontroller.editSliderData);
routs.post('/deletAll',passport.checkAthuntication,slidercontroller.deletAll);
module.exports = routs;