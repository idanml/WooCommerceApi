/*
excelreader.js
Author: Idan Malul
DESCRIPTION: Read database of orders ftom excel file and create match orders in woocommerce store
*/
const readXlsxFile = require("read-excel-file/node");
var fs = require("fs");
const WooCommerce = require('../woocommerce');
var i,fullName; 
var orderFile='';
orderFile='order.js'
fs.writeFileSync(orderFile,'const data =  {\n orders:[\n');
var productData, id,temp;





function  excelreader(){
readXlsxFile('ordersData.xlsx').then(async(rows) => { //import xlsx file
  for(i=1;i<rows.length; i++){                   
    productData =  {                                    //data of product that reprsent the whole price of goods
      product: {
     title: 'goods',
     type: 'simple',
     regular_price: rows[i][9]+rows[i][11]       // price+taxes
     }
     };
     
     /*
     the function post the product in woocommerce store and return the id.
     */
   temp=await WooCommerce.postAsync('products', productData)
   id= JSON.parse(temp.body).product.id;
  /* 
  create file that represent all the orders that will post in woocommerce next
  */   
  if(i>1)                                 
  fs.appendFileSync(orderFile,',\n\n\n');
  fs.appendFileSync(orderFile,'{\nbilling_address: {\n');
  fullName= rows[i][1].split(" ");
  fs.appendFileSync(orderFile,'first_name: \''+ fullName[0]+ '\',\n');
  fs.appendFileSync(orderFile,'last_name: \''+ fullName[1]);
  if(fullName.length>2)
  fs.appendFileSync(orderFile," "+fullName[2]+'\',\n');
  else
  fs.appendFileSync(orderFile,'\',\n');
  fs.appendFileSync(orderFile,'address_1: \''+ rows[i][20]+'\',\n');
  fs.appendFileSync(orderFile,'city: \''+ rows[i][21]+'\',\n');
  fs.appendFileSync(orderFile,'postcode: \''+ rows[i][23]+'\',\n');
  fs.appendFileSync(orderFile,'country: \''+ rows[i][22]+'\',\n');
  fs.appendFileSync(orderFile,'email: \''+ rows[i][2]+'\',\n');
  fs.appendFileSync(orderFile,'phone: \''+ rows[i][24]+'\'\n},\n');

  fs.appendFileSync(orderFile,'shipping_address: {\n');
  fs.appendFileSync(orderFile,'first_name: \''+ fullName[0]+ '\',\n');
  fs.appendFileSync(orderFile,'last_name: \''+ fullName[1]);
  if(fullName.length>2)
  fs.appendFileSync(orderFile,fullName[2]+'\',\n');
  else
  fs.appendFileSync(orderFile,'\',\n');
  fs.appendFileSync(orderFile,'address_1: \''+ rows[i][20]+'\',\n');
  fs.appendFileSync(orderFile,'city: \''+ rows[i][21]+'\',\n');
  fs.appendFileSync(orderFile,'postcode: \''+ rows[i][23]+'\',\n');
  fs.appendFileSync(orderFile,'country: \''+ rows[i][22]+'\'\n},\n');

  fs.appendFileSync(orderFile,'line_items: [\n  {\n');
  fs.appendFileSync(orderFile,'product_id: '+ id+',\n');
  fs.appendFileSync(orderFile,'quantity: 1\n    }\n ],\n');

  fs.appendFileSync(orderFile,'shipping_lines: [\n{\n');
  fs.appendFileSync(orderFile,'method_id: \'flat_rate\',    \n');
  fs.appendFileSync(orderFile,'method_title: \'Flat_Rate\',    \n');
  fs.appendFileSync(orderFile,'total: '+ rows[i][10]+'\n');
  fs.appendFileSync(orderFile,'}\n]\n}');

  };
  fs.appendFileSync(orderFile,'\n]\n};\n');
  fs.appendFileSync(orderFile,'module.exports = data;');
  //import the file with the data of all order and post it into the woocommerce site
  ordersData1= require('./order');
  await WooCommerce.postAsync('orders/bulk', ordersData1);
    
  });
}
module.exports={
  excelreader: excelreader,
};