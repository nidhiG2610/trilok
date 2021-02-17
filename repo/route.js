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

//addNewItem
router.post('/addNewItem', (req, res) => {
    console.log(req.body);
    var userData = req.body;
    User.SaveItemData(userData, (err, result) => {
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
//changeOrderStatus

router.post('/saveChangedOrderStatus', (req, res) => {
    var userData = req.body;
    console.log(userData);
    //  if (userData.order_status == )
    User.saveChangedOrderStatus(userData, (err, result) => {
        if (err) throw err;
        console.log(err);
        res.send({ 'message': 'succeed', 'data': result, 'status': 200 });
    });
});

router.get('/getDataforDashboradLabels', (req, res) => {
    var userData = req.body;
    var totalAdvance;
    var totalSale;
    let CompletedOrders;
    //  if (userData.order_status == )
    User.getOrderTotal(userData, (err, result) => {
        if (err) throw err;
        res.send({ 'message': 'succeed', 'data': result, 'status': 200 });
    }); 
});

router.get('/getTotalAdvanceReservation', (req, res) => {
    var userData = req.body;

    User.getTotalAdvanceReservation(userData, (err, result) => {
        if (err) throw err;
        res.send({ 'message': 'succeed', 'data': result, 'status': 200 });
    });
});

router.get('/getTotalDoneDelivery', (req, res) => {
    var userData = req.body;

    // total delivery
    User.getTotalDoneDelivery(userData, (err, result) => {
        if (err) throw err;
         res.send({ 'message': 'succeed', 'data': result, 'status': 200 });
    });
});


router.get('/getaddressDetailsById/Id/:id', (req, res) => {
    var userData = req.params.id;
    User.getOnlineOrderById(userData, (err, result) => {
        console.log(result);
    res.send({ 'message': 'succeed', 'data': result, 'status': 200 });
    });
});


router.get('/getMonthlyData', (req, res) => {
    var userData = req;
    User.getMonthlyData(userData, (err, result) => {
        console.log(result);
        res.send({ 'message': 'succeed', 'data': result, 'status': 200 });
    });
});

router.get('/getNewOrderCount', (req, res) => {
    var userData = req.params;
    User.getNewOrderCount(userData, (err, result) => {
        console.log(result);
        res.send({ 'message': 'succeed', 'data': result, 'status': 200 });
    });
});

//getItemListOnLoad
router.get('/getItemListOnLoad', (req, res) => {
    var userData = req.body;
    User.getAllItems(userData, (err, result) => {
        res.send({ 'message': 'succeed', 'data': result });
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
   // console.loh(newData);
    // bcrypt the password and store hash to table
    newData.password = bcrypt.hashSync(newData.password);

    User.SaveUserData(newData, (err, result) => {
        if (err) throw err;
       // console.log(err);
        res.send({ 'message': 'Added Successfylly!', 'data': result, 'status': 200 });
    });
});



/*
*  registration method to check user authentication
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.post('/createOnlineOrder', (req, res) => {
    var newData = req.body;
    User.SaveOnlineOrder(newData, (err, result) => {
        if (err) throw err;
        res.send({ 'message': 'Added Successfylly!', 'data': result, 'status': 200  });
    });
    
});

/*
*  registration method to check user authentication
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.post('/createOnlineReservation', (req, res) => {
    console.log('hello in method');
    var newData = req.body;
    User.SaveOnlineReservation(newData, (err, result) => {
        if (err) throw err;
        res.send({ 'message': 'Added Successfylly!', 'data': result, 'status': 200  });
    });

});

router.post("/charge", (req, res) => {
    try {
        stripe.customers
            .create({
                name: req.body.name,
                email: req.body.email,
                source: req.body.stripeToken
            })
            .then(customer =>
                stripe.charges.create({
                    amount: req.body.amount * 100,
                    currency: "usd",
                    customer: customer.id
                })
            )
            .then(() => res.send())
            .catch(err => console.log(err));
    } catch (err) {
        res.send(err);
    }
})

/*
*  login method to check user authentication
*  @params req Http request
*  @ params res
*  return res.json  
*
router.post('/login', (req, res, next) => {
    let sess = req.session;
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(401).json(err);
        }
        if (user) {
            sess.id = user.id;
            return res.status(200).json({
                "status": 200,
                "message": 'Login Successfull.',
                "data": user,
            });
        } else {
            res.send({'status':401,'data':info}); //status(401).json(info);
        }
    })(req, res, next)
}); */


//login user  passport authentication
passport.use(new LocalStrategy({
    usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
}, function (email, password, done) {
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
                return res.send({ message: err });
            }
        });

    });
}
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {

    User.getUserById(id, function (err, user) {
        done(err, user);
    });
   
});

/*
* Logout  method
*  @params req Http request
*  @ params res
*  return res.json  
*/
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
    });
    res.send({ 'status': 200, 'message': 'you are logged out.' });
});



router.get('/test', (req, res) => { res.send('helllooo in route page'); });

module.exports = router;