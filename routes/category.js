const express = require('express');
const routs = express.Router();
const categorycontroller = require('../controllers/categorycontroller');
const Category = require('../models/Cate');
const passport = require('passport');
routs.get('/add_cate',categorycontroller.catePage);
routs.post('/insertcateData',categorycontroller.insertCateData);
routs.get('/view_cate',categorycontroller.viewCate);
routs.get('/isactive/:id',passport.checkAthuntication,categorycontroller.isactive);
routs.get('/deactive/:id',passport.checkAthuntication,categorycontroller.deactive);
routs.get('/updateData/:id',passport.checkAthuntication,categorycontroller.updateCateData);
routs.get('/deletData/:id',passport.checkAthuntication,categorycontroller.deletCateData);
routs.post('/editCateData',passport.checkAthuntication,categorycontroller.editCateData);
routs.post('/deletAll',passport.checkAthuntication,categorycontroller.deletAll)
module.exports = routs;