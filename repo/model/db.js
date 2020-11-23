const db = require('../conection.js');
const bcrypt = require('bcrypt-nodejs');

// db.query('select * from user', (err, res) => { if (err) throw err; else console.log(res); });

console.log('in db file');
var User = {
    getAllUser: (username, callback) => {
        return db.query('select * from `user`', callback);
    },
    getAllOrders: (username, callback) => {
        return db.query('select * from `online_order`', callback );
    },
    getAllOnlineReservation: (username, callback) => {
        return db.query('select * from `online_reservation`', callback );

    },
    getReservationById: (id, callback) => {
        return db.query('select * from `online_reservation` where `id`=' + id, callback );

    },
    getOnlineOrderById: (id, callback) => {
        return db.query('select * from `online_order` where `id`=' + id, callback );
    },
    getUserById: (id, callback) => {
        return db.query('select * from `user` where `id`=' + id, callback );
    },
    SaveUserData: (userdata, callback) => {
        db.query('Insert into `user` (`first_name`,`last_name`,`user_type`,`Gender`,`mobile`,`birthdate`,`email`,`password`)values(?,?,?,?,?,?,?,?)', [userdata.first_name, userdata.last_name, userdata.user_type, userdata.Gender, userdata.mobile, userdata.birthdate, userdata.email, userdata.password],
            (err, res) => {
                if (err) throw err;
                console.log(res.insertId);
                // address table
                inserted_id = res.insertId;
                return res.insertId;
            });
    },
    saveChangedStatus: (userdata, callback) => {
        return db.query('update `online_reservation` set `order_status`=' + (userdata.order_status) + ' where `id`=' +(userdata.id), callback);
    },
    getUserPasswordbyUsername: (username, callback) => {
        return db.query("select * from `user` where `email` =?", [username.email], callback);
    },
    getPassword: (hash, password, res) => {
        // Load hash from your password DB.
        return bcrypt.compare(password, hash, res);
    },
};

module.exports = User;

