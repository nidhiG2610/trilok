const http = require('http');
const fs = require('fs');
const stripe = require('stripe')('sk_test_51HVqWbAzoAgSe0DBLKIt7SQYqyBqfoAMD7xSVpUzU87lM5Knp58hhlKvtpspz0E6AVQr2VFVR82tZIDxDTMMwPJO00UinTo0pR'); // Add your Secret Key Here
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
app.engine('html', require('ejs').renderFile);

//app.use(express.static(path.join(__dirname, './views')));

app.use('/', allRoute);
//app.get('/getUserListOnLoad', (req, res) => { res.send('hey'); });


//connect flash
app.use(flash());

app.post("/charge", (req, res) => {
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
            .then(() => res.render("completed.html"))
            .catch(err => console.log(err));
    } catch (err) {
        res.send(err);
    }
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
