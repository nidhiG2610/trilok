
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

let user = [];
user['name'] = '';


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




function getItemListOnLoad() {
    //alert('hey');
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/getItemListOnLoad', {
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
                    html = html + "<tr><td>" + "#" + element.id + "</td><td>" + element.item_name + "</td><td> " + element.quantity + "</td><td>" + element.price + "</td><td>";
                });
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

// online order view pge 
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
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Fullname:</label>' + element.first_name + " " + element.last_name + '<input name="id" form-control type="hidden" value="' + element.id + '"></div > '
                        + '<div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Ordered Date:</label>' + element.order_date + ' </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Total:</label>       ' + element.order_total + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Order status</label>       ' + orderStatus[element.order_status] + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Promo code:</label>       ' + element.promo_code + '                 </div >';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Email:</label>       ' + element.email + '                 </div >   </div >';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Contact Number:</label> +1' +element.mobile + '                 </div >   ';
                    html = html + ' <div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Address:</label>       ' + element.address + '                 </div > </div > ';
                    html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">City:</label>       ' + element.city_id + '  </div >';
                    html = html + '  <div class="col-md-6"><label class="col-sm-6 col-form-label font-weight-bold">Postal Code:</label>       ' + element.postal_code + '            </div ></div >';
                     html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold" for="order_status">Change Order status:</label>';
                    html = html + '<select class="col-sm-3 form-control"  name="order_status" > <option value="' + 0 + '" ' + (element.order_status == 0 ? 'selected' : '') + ' > Confirmed</option> <option value="' + 1 + '" '+ (element.order_status == 1 ? 'selected' : '') + ' > Pending</option> <option value="' + 2 + '" ' + (element.order_status == 2 ? 'selected' : '') +'> Cancel</option></select> </div>   </div> ';
                 
                    //html = html + ' <div class="row"><div class="col-md-6" >     <label class="col-sm-6 col-form-label font-weight-bold">Shipping Address:</label>       ' + ((typeof (element.shipping_address) == null) || (typeof (element.shipping_address) == undefined)) ?  '---'  : (element.shipping_address) + '  </div >';

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



function changeReservationStatus(formData) {
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

function changeOrderStatus(formData) {
    console.log(formData);

    var newData = fetch('http://localhost:3000/saveChangedOrderStatus', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        body: (formData)
    }).then((response) => {
        return response.json();
    });
    return newData;
}

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

// list on delivery page
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
           // console.log(dataArray);
            if ((dataArray.length)) {
                var html = '';                 
                dataArray.forEach(element => {
                    date1 = new Date();
                    date2 = new Date(element.created_at); //console.log(date2);
                    var diff = diff_minutes(date1, date2);  
                    //console.log(diff);
                    html = html + '<a class="d-flex mt-3 py-2 border-bottom OnclickOrderDetails" href="javascript:void(0);" id="OnclickOrderDetails" data-order="' + element.id + '" data-OnclickOrderDetails="' + element.id + '"> <div class="wrapper ml-2" ><p class="mb - n1 font - weight - semibold"> #' + element.id + '</p>';
                    html = html + '</div > <small class="text-muted ml-auto">' + diff +' ago</small></a>';
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
            console.log(data);
            if (response.status == 200) {
                console.log(response);
                var userdata = data.data[0];
                sessionStorage.setItem(user['name'], userdata.first_name + ' ' + userdata.last_name);                 
                sessionStorage.setItem(user['id'], userdata.id);
                sessionStorage.setItem(user['email'], userdata.email);
                sessionStorage.setItem(user['role'], orderStatus[userdata.user_type]);                 
                var location = window.location.href;
                var ns = location.substring(0, location.lastIndexOf('/'));
                window.location.replace(ns + '/index.html');             
                return response;
            } else {
                alert('Please try again!');
                return response;
            }
        });

       // redirect 
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
            console.log(response);
            //alert('done');
              console.log(response);
               if (response.status == 200) {
                   console.log(response);
                   $("#message").text('New User Created!');
                   window.location.replace("/userManagement.html");
               }
        });
    });
};


function addNewItem(formData) {
    // code supposed to run once DOM is loaded 
    fetch('http://localhost:3000/addNewItem', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        body: (formData)
    }).then((response) => {
        response.json().then(data => {
            console.log(response);
          //  alert('done');
            console.log(response);
            if (response.status == 200) {
                console.log(response);
                $("#message").text('New Item Created!');
                window.location.replace("/itemManagement.html");
            }
        });
    });
};

 
function diff_minutes(dt1, dt2) {
 //   var diff = (dt2 - dt1) / 1000;
    var diffTime = Math.abs(dt1 - dt2)/1000;
    var days = Math.floor(diffTime / 86400);
    diffTime -= days * 86400;

    var hours = Math.floor(diffTime / 3600) % 24;
    diffTime -= hours * 3600;

    var minutes = Math.floor(diffTime / 60) % 60;
    diffTime -= minutes * 60;

    var seconds = Math.floor(diffTime % 60);
    var totalDiff = seconds + ' Seconds ' + ((minutes != 0) ? minutes + " Minutes " : '') + ((hours != 0) ? hours + " Hrs " : '') + ((days != 0) ? days + " days " : '') ;
   // var totalDiff = ((days != 0) ? days + " days " : '') + ((hours != 0) ? hours + " Hrs " : '') + ((minutes != 0) ? minutes + " Minutes " : '') + seconds + ' Seconds ' +  +  +  ;
    return totalDiff;
}

function getDataforDashboradLabels() {
    fetch('http://localhost:3000/getDataforDashboradLabels', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
      //  console.log(response);
        response.json().then(data => {
            var dataArray = data.data;
          //  $("#totalSale").text(Math.round(dataArray[0].totalSale..toFixed(2);));           
            $("#totalSale").text((dataArray[0].totalSale.toFixed(2)));           

        });
    });
}

function getTotalAdvanceReservation() {
    fetch('http://localhost:3000/getTotalAdvanceReservation', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
       // console.log(response);
        response.json().then(data => {
            var dataArray = data.data;
            $("#totalAdvance").text(dataArray[0].totalAdvance.toFixed(2));           
        });
    });
}
function getTotalDoneDelivery() {
    fetch('http://localhost:3000/getTotalDoneDelivery', {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
    }).then((response) => {
       // console.log(response);
        response.json().then(data => {
            var dataArray = data.data;
            $("#CompletedOrders").text( dataArray[0].CompletedOrders);
        });
    });
}

$(document).ready(function () {
    $(".profile-name").html('<b>' + sessionStorage.getItem(user['name'])+'</b>');
    $(".designation").html(' Store user ');

    $("#userProfilename").html(sessionStorage.getItem(user['name']));
    $("#userProfileemail").html( ' ');
  //  $(".designation").html(' ' + sessionStorage.getItem(user['role']));
   

    
    

    $("#Signout").click(function (e) {
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

    function getNewOrderCount() {
        fetch('http://localhost:3000/getNewOrderCount', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*', 'Accept': 'application/json' },
        }).then((response) => {
            console.log(response);
            response.json().then(data => {
                var dataArray = data.data;
                console.log(dataArray[0].recentOrder);
                $("#recentOrder").text(dataArray[0].recentOrder);
            });
        });
    };
    getNewOrderCount();
      

  

});






