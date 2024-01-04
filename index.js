const express = require('express');
const port = 8005;
var app = express();
const path = require('path');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passportStrategy');
const cookieParser = require('cookie-parser');
const Admin = require('./models/Admin');
app.use(cookieParser());
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'assests')));
app.use(express.static(path.join(__dirname,'userAssests')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(session({
    name : "Dishant",
    secret : "Dishant",
    resave : false,
    saveUninitialized : false,
    cookie :{
        maxAge : 100*60*100
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes/user'));
app.use('/admin',require('./routes/admin'));
app.listen(port, (err)=>{
    if(err){
        console.log("Something Went Wrong");
        return false
    }
    console.log(`Server running on port ${port}`);
});