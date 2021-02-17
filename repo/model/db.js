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
    getAllItems: (username, callback) => {
        return db.query('select * from `order_item`', callback);
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
        return db.query('Insert into `user` (`first_name`,`last_name`,`user_type`,`Gender`,`mobile`,`birthdate`,`email`,`password`)values(?,?,?,?,?,?,?,?)', [userdata.first_name, userdata.last_name, userdata.user_type, userdata.Gender, userdata.mobile, userdata.birthdate, userdata.email, userdata.password], callback);
    },
    //SaveItemData
    SaveItemData: (userdata, callback) => {
        return db.query('Insert into `order_item` (`item_name`,`quantity`,`price`)values(?,?,?)', [userdata.item_name, userdata.quantity, userdata.price], callback);
    },
    saveChangedStatus: (userdata, callback) => {
        return db.query('update `online_reservation` set `order_status`=' + (userdata.order_status) + ' where `id`=' +(userdata.id), callback);
    },
    saveChangedOrderStatus: (userdata, callback) => {
        return db.query('update `online_order` set `order_status`=' + (userdata.order_status) + ' where `id`=' + (userdata.id), callback);
    },
    getUserPasswordbyUsername: (username, callback) => {
        return db.query("select * from `user` where `email` =?", [username.email], callback);
    },
    getPassword: (hash, password, res) => {
        // Load hash from your password DB.
        return bcrypt.compare(password, hash, res);
    },
    getOrderTotal: (id, callback) => {
        return db.query('select sum(`order_total`) as totalSale from `online_order`', callback);
    },
    getTotalAdvanceReservation: (id, callback) => {
        return db.query('select sum(`advance_payement`) as totalAdvance from `online_reservation`', callback);
    },
    getaddressDetailsById: (id, callback) => {
        return db.query('select `online_order` where `id`=?',[id], callback);
    },
    getTotalDoneDelivery: (id, callback) => {
        return db.query('select count(`id`) as CompletedOrders from `online_order` where `order_status`=?', [1], callback);
    },
    SaveOnlineOrder: (userdata, callback) => {
        return db.query(' INSERT INTO `online_order` ( `order_type`, `order_date`, `order_status`, `order_total`, `first_name`, `last_name`, `email`,  `promo_code`, `mobile`, `address`, `shipping_address`, `postal_code`, `city_id`)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [1, userdata.order_date, 2, 25.23, userdata.first_name, userdata.last_name, userdata.email, userdata.promo_code, userdata.mobile, userdata.address, userdata.shipping_address, userdata.postal_code, userdata.city_id],
            callback
            //(err, res) => {
            /* if (err) throw err;
             console.log(res.insertId);
             // address table
             inserted_id = res.insertId;
             return res.insertId;*/
            //   });

        );
    },
    //select DATE_CREATED as  sum(`order_total`) from `online_order` group by `created_at`, 'YYYY-MM' order by 1

    //INSERT INTO `online_reservation` (`id`, `first_name`, `last_name`, `email`, `contact_number`, `date`, `time`, `number_of_people`, `advance_payement`, `order_status`, `created_date`, `updated_date`) VALUES ('2', 'Parth', 'Patel', 'parthm@gmail.com', '8096324789', '2020-11-03', '10:05:00.000000', '5', '20', '2', '2020-11-11 00:00:00', '2020-11-10 00:00:00');
    SaveOnlineReservation: (userdata, callback) => {
        return db.query(' INSERT INTO `online_reservation` ( `first_name`, `last_name`, `email`, `contact_number`, `date`, `time`, `number_of_people`, `advance_payement`, `order_status`)VALUES(?,?,?,?,?,?,?,?,?)', [userdata.first_name, userdata.last_name, userdata.email, userdata.contact_number, userdata.date, userdata.time, userdata.number_of_people, userdata.advance_payement, 1], callback);
    },
    getMonthlyData: (userdata, callback) => {
        return db.query('select  MONTH(`created_at`) as mon, sum(`order_total`) as sale from `online_order` group by extract(month from `created_at`) order by mon', callback);
    },
    getNewOrderCount: (userdata, callback) => {
        return db.query('select  count(`id`) as recentOrder from `online_order` where `created_at` >= DATE_SUB(NOW(),INTERVAL 3 HOUR)', callback);
    },
};

module.exports = User;

