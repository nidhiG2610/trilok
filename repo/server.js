const http = require('http');
const fs = require('fs');
const express = require('express');
//Init app
const app = express();
const session = require('express-session');
const expressValidator = require('express-validator');
const path = require('path');
const port = 3000;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./conection.js');
const allRoute = require('./route.js');
const bcrypt = require('bcrypt-nodejs');
const flash = require('flash');
const cookieParser = require('cookie-parser');
const { use } = require('./route.js');
var sess;

//bodyParser Middleware 
// parse application/x-www-form-urlencoded   
app.use(bodyParser.urlencoded({
    extended: false
}));
// Express
app.use(session({
    key: 'user_id',
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
//passport init
app.use(passport.initialize());
app.use(passport.session());

// This will set express to render our views folder, then to render the files as normal html
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './views')));

//app.get('/getUserListOnLoad', (req, res) => { res.send('hey'); });

app.get('/', function (req, res) {
    sess = req.session;
    if (sess.email) {
        return res.redirect('/index.html');
    }
    res.sendFile(path.join(__dirname + '/login.html'));
});

/*
*  login method to check user authentication
*  @params req Http request
*  @ params res
*  return res.json  
*/
app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(401).json(err);
        }
        if (user) {
            sess = req.session;
            sess.email = user[0].email; 
            return res.status(200).json({
                "status": 200,
                "message": 'Login Successfull.',
                "data": user,
            });
        } else {
            res.send({ 'status': 401, 'data': info }); //status(401).json(info);
        }
    })(req, res, next)
});

app.use('/',  allRoute);
//connect flash
app.use(flash());

app.use('/', function () {
    console.log('hello in route')
});

/*app.get("/getOrderListOnLoad", (req, res) => {
    var userData = req.body;
    console.log('hi');
    const data = User.getAllUser(userData, (err, result) => {
        if (err) throw err;
        console.log('routefile');
        res.send({ 'message': 'succeed', 'data': result });
    });
});*/

app.listen(port,'localhost', () => console.log('Server is running...'));
