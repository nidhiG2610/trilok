
/*****************************js to create list of TA***************************************/

 /*
  *  This function call an API form database
  *  to fetch all the details of all the TAs 
  *  on load of page
  */

var userRole = [];
userRole[1] = 'Owner';
userRole[2] = 'Admin';
userRole[3] = 'DeliveryMan';
userRole[4] = 'Other';

var orderStatus = [];
orderStatus[0] = 'Confirmed';
orderStatus[1] = 'Pending';
orderStatus[2] = 'Cancel';

var Gender = [];
Gender['F'] = 'Female';
Gender['M'] = 'Male';



function getUserListOnLoad() {    
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getUserListOnLoad', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {       
        response.json().then(data => {
            var dataArray = data.data;
/*            console.log(dataArray);
*/            if ((dataArray.length)) {
                var html = '';
                dataArray.forEach(element => {
/*                    console.log(element);
*/                    html = html + "<tr><td>" + element.first_name + " " + element.last_name + "</td><td>" + element.email + "</td> <td>+1" + element.mobile + "</td><td>" + userRole[element.user_type] + "</td><td><a href='view-detail.html?User?id=" + element.id +"'> <i class='fa fa-eye'></i></a></td> </tr>";
                });
               // console.log(html);
                $("#dataList").html(html);
            }
            });
    });    
};

function getOrderListOnLoad() {
    //alert('hey');
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getOrderListOnLoad', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
        console.log(response);
        response.json().then(data => {
            var dataArray = data.data; console.log(dataArray);
            if ((dataArray.length)) {
                var html = '';
                dataArray.forEach(element => {
                    html = html + "<tr><td>" + "#" + element.id + "</td><td>" + element.first_name + " " + element.last_name + "</td><td>" + element.order_date + "</td><td>" + element.promo_code + "</td> <td>" + element.order_total + "</td><td>+1" + element.mobile + "</td><td>" + orderStatus[element.order_status] + "</td><td><a href='view-detail.html?Order?id=" + element.id +"'> <i class='fa fa-eye'></i></a></td> </tr>";
                });
                $("#dataList").html(html);
            }
        });
    });
};

function getReservationListOnLoad() {
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getReservationListOnLoad', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
        response.json().then(data => {
            var dataArray = data.data;
            //console.log(dataArray);
            if ((dataArray.length)) {
                var html = '';
                dataArray.forEach(element => {
                   // console.log(element);
                    html = html + "<tr><td>" + "#" + element.id + "</td><td>" + element.first_name + " " + element.last_name + "</td><td>" + element.date + "</td><td>" + element.time + "</td><td>" + element.number_of_people + "</td> <td>" + element.advance_payement + "</td><td>+1" + element.contact_number + "</td><td>" + orderStatus[element.order_status] + "</td><td><a href='view-detail.html?Reservation?id="+element.id+"'> <i class='fa fa-eye'></i></a></td> </tr>";
                });
               // console.log(html);
                $("#dataList").html(html);
            }
        });
    });
};

function getReservationByIdOnLoad(id) {
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getReservationByIdOnLoad/Id/'+id, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
        response.json().then(data => {
            var dataArray = data.data;
            console.log(dataArray);
            if ((dataArray.length)) {
                var html = '';
                dataArray.forEach(element => {
                    console.log(element);
                    html = html + ' <div class="row"><div class="col-md-6" >   <label class="col-sm-6 col-form-label font-weight-bold" for="id">Fullname:</label>' + element.first_name + " " + element.last_name + '<input name="id" form-control type="hidden" value="' + element.id + '"></div > '
                        + '<div class="col-md-6" >     <label class="col-sm-6 font-weight-bold">Ordered Date:</label>' + element.date + ' </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 font-weight-bold">Reservation Time:</label>       ' + element.time + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 font-weight-bold">Order status</label>       ' + orderStatus[element.order_status] + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 font-weight-bold">Number of people:</label>       ' + element.number_of_people + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 font-weight-bold">Paid Amount:</label>       ' + element.advance_payement + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 font-weight-bold">Email:</label>       ' + element.email + '                 </div >   ';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 font-weight-bold">Contact Number:</label>+1' + element.contact_number + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold" for="order_status">Change Reservation status:</label>';
                    html = html + '<select class="col-sm-3 form-control"  name="order_status" > <option value="' + 0 + '" ' + (element.order_status == 0 ? 'selected' : '') + ' > Confirmed</option> <option value="' + 1 + '" '+ (element.order_status == 1 ? 'selected' : '') + ' > Pending</option> <option value="' + 2 + '" ' + (element.order_status == 2 ? 'selected' : '') +'> Cancel</option></select> </div>   </div> ';
                 
                });
                $("#myDataDetails").html(html);
            }
        });
    });
};

function getOrderByIdOnLoad(id) {
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getOrderByIdOnLoad/Id/' + id, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
        response.json().then(data => {
            var dataArray = data.data;
            console.log(dataArray);
            if ((dataArray.length)) {
                var html = '';
                dataArray.forEach(element => {
                    console.log(element);
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Fullname:</label>' + element.first_name + " " + element.last_name + '</div > '
                        + '<div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Ordered Date:</label>' + element.order_date + ' </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Total:</label>       ' + element.order_total + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Order status</label>       ' + orderStatus[element.order_status] + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Promo code:</label>       ' + element.promo_code + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Email:</label>       ' + element.email + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Contact Number:</label> +1' +element.mobile + '                 </div >   ';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Address:</label>       ' + element.address + '                 </div > </div > ';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">City:</label>       ' + element.city_id + '  </div >  <div class="col-md-6"> </div >';
                });
                $("#myDataDetails").html(html);
            }
        });
    });
};

function getUserByIdOnLoad(id) {
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getUserByIdOnLoad/Id/' + id, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
        response.json().then(data => {
            var dataArray = data.data;
            console.log(dataArray);
            if ((dataArray.length)) {
                var html = '';
                dataArray.forEach(element => {
                    console.log(element);
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Fullname:</label>' + element.first_name + " " + element.last_name + '</div > '
                        + '<div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Email:</label>' + element.email + ' </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Contact Number:</label> +1' + element.mobile + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Role</label>       ' + userRole[element.user_type] + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Birth Date:</label>       ' + element.birthdate + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Gender:</label>       ' + Gender[element.Gender] + '                 </div >   </div >';
                   
                });
                $("#myDataDetails").html(html);
            }
        });
    });
};

function addNewUser(formData) {
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/register', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        body: (formData)
    }).then((response) => {
        response.json().then(data => {
            if (response.status == 200) {
                return true;
            }
        });
    });
};

function changeStatus(formData) {
    console.log(formData);
    
    var newData = fetch('http://localhost:3000/saveChangedStatus', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        body: (formData)
    }).then((response) => {
        return response.json();
    });
    return newData;
}

function getAllOrderOnLoad() {
    //alert('hey');
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getOrderListOnLoad', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
        console.log(response);
        response.json().then(data => {
            var dataArray = data.data;
            console.log(dataArray);
            if ((dataArray.length)) {
                var html = '';                 
                dataArray.forEach(element => {
                    date2 = new Date();
                    date1 = new Date(element.created_at);
                    var diff = diff_minutes(date1, date2);  // data="'+element.id+'"
                    console.log(diff);
                    html = html + '<div class="d-flex mt-3 py-2 border-bottom" id="OnclickOrderDetails" data-order="'+element.id+'"> <div class="wrapper ml-2" ><p class="mb - n1 font - weight - semibold"> #' + element.id + '</p>';
                    html = html + '</div > <small class="text-muted ml-auto">' + diff +' ago</small></div >';
                });
                $("#orderList").html(html);
            }
        });
    });
};

function login(formData) {
    //alert('hey');
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/login', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        body: (formData)
    }).then((response) => {
        response.json().then(data => {
            console.log(response);
            if (response.status == 200) {
                var location = window.location.href;
                var ns = location.substring(0, location.lastIndexOf('/'));
                window.location.replace(ns + '/index.html');
                console.log(ns);
                return response;
            } else {
                alert('Please try again!');
                return response;
            }
        });

       // redirect 
    });
};


function diff_minutes(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    var seconds = new Date(diff);
    var totalDiff = seconds.getDay()+ 'Days ' + seconds.getHours() + ' hrs ' + seconds.getMinutes() + ' mins ' + seconds.getSeconds() + ' s';
    return totalDiff;
}

$(document).ready(function () {
    $("#OnclickOrderDetails").click(function (e) {
        var id = $(this).data('order');
        getDetailsofOrder(id);
       
    });


    function getDetailsofOrder(id) {
        // code supposed to run once DOM is loaded 
        fetch('http://localhost:3000/getDetailsofDeliveryById', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        }).then((response) => {
            console.log(response);
            response.json().then(data => {
                var dataArray = data.data;
                console.log(dataArray);
                if ((dataArray.length)) {
                    var html = '';
                    dataArray.forEach(element => {
                        date2 = new Date();
                        date1 = new Date(element.created_at);
                        var diff = diff_minutes(date1, date2);  // data="'+element.id+'"
                        console.log(diff);
                        html = html + '<div class="d-flex mt-3 py-2 border-bottom" id="OnclickOrderDetails" data-order="' + element.id + '"> <div class="wrapper ml-2" ><p class="mb - n1 font - weight - semibold"> #' + element.id + '</p>';
                        html = html + '</div > <small class="text-muted ml-auto">' + diff + ' ago</small></div >';
                    });
                    $("#orderList").html(html);
                }
            });
        });
    }

    $("#Signout").click(function () {
        fetch('http://localhost:3000/logout', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        }).then((response) => {
            var location = window.location.href;
            var ns = location.substring(0, location.lastIndexOf('/'));
            window.location.replace(ns + '/login.html');
            });
        });
    });





