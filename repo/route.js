var User = require('./model/db.js');

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const app = express();

// parse application/x-www-form-urlencoded   
app.use(bodyParser.urlencoded({
    extended: true
}));

console.log('in route file');


// get List Of all users
/*
*  get list of Users as per filters
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/getUserListOnLoad', (req, res) => {
    var userData = req.body; 
    User.getAllUser(userData, (err, result) => {
        if (err) throw err;
        console.log(err);
        //res.send({'message':'succeed','data':result});
        res.writeHead(200, { 'content-type': 'text/json' });
        res.write(JSON.stringify({ data: result }));
        res.end('\n');
    });
}); 


// get List Of all users
/*
*  get list of Users as per filters
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/getOrderListOnLoad', (req, res) => {
    var userData = req.body;
    User.getAllOrders(userData, (err, result) => {
       res.send({ 'message': 'succeed', 'data': result });        
    });
}); 

// get List Of all users
/*
*  get list of Users as per filters
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/getReservationListOnLoad', (req, res) => {
    var userData = req.body;
    User.getAllOnlineReservation(userData, (err, result) => {
        if (err) throw err;
        console.log(err);
        res.send({ 'message': 'succeed', 'data': result });
    });
}); 

// get List Of all users
/*
*  get list of Users as per filters
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/getReservationByIdOnLoad/Id/:id', (req, res) => {
    var userData = req.params.id;
    User.getReservationById(userData, (err, result) => {
        if (err) throw err;
        console.log(err);
        res.send({ 'message': 'succeed', 'data': result });
    });
});

// get List Of all users
/*
*  get list of Users as per filters
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/getOrderByIdOnLoad/Id/:id', (req, res) => {
    var userData = req.params.id;
    User.getOnlineOrderById(userData, (err, result) => {
        if (err) throw err;
        console.log(err);
        res.send({ 'message': 'succeed', 'data': result });
    });
}); 

// get List Of all users
/*
*  get list of Users as per filters
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/getUserByIdOnLoad/Id/:id', (req, res) => {
    var userData = req.params.id;
    User.getUserById(userData, (err, result) => {
        if (err) throw err;
        console.log(err);
        res.send({ 'message': 'succeed', 'data': result });
    });
});

router.post('/saveNewUserData', (req, res) => {
    console.log(req.body);
    var userData = req.body;
    User.SaveUserData(userData, (err, result) => { 
        if (err) throw err;
        console.log(err);
        res.send({ 'message': 'succeed', 'data': result });
    });
});


router.post('/saveChangedStatus', (req, res) => {
    var userData = req.body;
  //  if (userData.order_status == )
    User.saveChangedStatus(userData, (err, result) => {
        if (err) throw err;
        console.log(err);
        res.send({ 'message': 'succeed', 'data': result, 'status' : 200 });
    });
});

/*
*  registration method to check user authentication
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.post('/register', (req, res) => {
    var newData = req.body;

    // bcrypt the password and store hash to table
    newData.password = bcrypt.hashSync(newData.password);

    User.SaveUserData(newData, (err, result) => {
        if (err) throw err;
        res.send({ 'message': 'Added Successfylly!','data':result });
    });
});

/*
*  login method to check user authentication
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(401).json(err);
        }
        if (user) {
            return res.status(200).json({
                "status": 200,
                "message": 'Login Successfull.',
                "data": user,
            });
        } else {
            res.send({'status':401,'data':info}); //status(401).json(info);
        }
    })(req, res, next)
});


//login user  passport authentication
passport.use(new LocalStrategy({
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
}, function (email, password, done) {
    console.log('passposte');
    User.getUserPasswordbyUsername({ email: email }, function (err, user) {
        //if (err) { return done(err); }  
        if (!user) {
            //return done(null, false, { message: 'Incorrect username.' });
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (err) { return done(err, user); }
        User.getPassword(user[0].password, password, function (err, isMatch,res) {            
            if (isMatch != null) {
                return done(null, user);
            } else {
                if (err) throw err;
                console.log('in ismatch false4' + isMatch);
                return res.send({ message: 'Incorrect password.' });
            }
        });

    });
}
));

passport.serializeUser(function (user, done) {
    console.log('in serialize user');
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('in deserialize user');
    done(null, user);
});

/*
* Logout  method
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/logout', (req, res) => {
    req.logout();
    res.send({'status':200,'message':'you are logged out.'});
});



router.get('/test', (req, res) => { res.send('helllooo in route page'); });

module.exports = router;