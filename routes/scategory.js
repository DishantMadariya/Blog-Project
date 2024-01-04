const express = require('express');
const routs = express.Router();
const scategorycontroller = require('../controllers/scategorycontroller');
const Scate = require('../models/Scate');
routs.get('/add_scate',scategorycontroller.scatePage);
routs.post('/insertscateData',Scate.uploadImage,scategorycontroller.addScateData);
routs.get('/view_scate',scategorycontroller.viewScate);
routs.get('/updateData/:id',scategorycontroller.updateScateData);
routs.post('/editscateData',Scate.uploadImage,scategorycontroller.editScateData)
module.exports = routs;