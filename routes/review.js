const express = require('express');
const routs = express.Router();
const passport = require('passport');
const reviewcontroller = require('../controllers/reviewcontroller')
routs.get('/add_review',passport.checkAthuntication,reviewcontroller.AddReview);
routs.post('/insertreviewData',passport.checkAthuntication,reviewcontroller.insertReview);
routs.get('/view_review',passport.checkAthuntication,reviewcontroller.viewReview);
routs.get('/isactive/:id',passport.checkAthuntication,reviewcontroller.isactive);
routs.get('/deactive/:id',passport.checkAthuntication,reviewcontroller.deactive);
routs.get('/updateData/:id',passport.checkAthuntication,reviewcontroller.updateReviewData);
routs.post('/editReviewData',passport.checkAthuntication,reviewcontroller.editReviewData);
routs.get('/deletData/:id',passport.checkAthuntication,reviewcontroller.deletReviewData);
routs.post('/deletAll',passport.checkAthuntication,reviewcontroller.deletAll);
module.exports = routs;