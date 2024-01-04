const express = require('express');
const routs = express.Router();
const offercontroller = require('../controllers/offercontoller');
const passport = require('passport');
routs.get('/add_offer',passport.checkAthuntication, offercontroller.AddOffer);
routs.post('/insertofferData',passport.checkAthuntication,offercontroller.insertofferData);
routs.get('/view_offer',passport.checkAthuntication,offercontroller.viewOffer);
routs.get('/isactive/:id',passport.checkAthuntication,offercontroller.isactive);
routs.get('/deactive/:id',passport.checkAthuntication,offercontroller.deactive);
routs.get('/updateData/:id',passport.checkAthuntication,offercontroller.updateOfferData);
routs.post('/editOfferData',passport.checkAthuntication,offercontroller.editOfferData);
routs.get('/deletData/:id',passport.checkAthuntication,offercontroller.deletOfferData);
routs.post('/deletAll',passport.checkAthuntication,offercontroller.deletAll);
module.exports = routs;