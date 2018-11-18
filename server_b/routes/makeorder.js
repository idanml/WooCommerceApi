var express = require('express');
var router = express.Router();
const http = require('http');

router.get('/', function(req, res, next) {
  var order_data;
  var data = JSON.stringify({
    price:232,
    firstname:'Idan',
    lastname:'malul',
    address:'shvil',
    city:'herzeliya',
    postcode:'25321',
    country:'israel',
    email:'idan@gmail.com',
    phone:'0526533646'
  });

var options = {
  host: 'localhost',
  port: 3000,
  path: '/orders/createorder',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  }
};

var req = http.request(options, function(response) {
  response.setEncoding('utf8');
  response.on('data', function (order_data) {
      res.send(order_data)
  });
});
req.write(data);
req.end();


  
});

module.exports = router;
