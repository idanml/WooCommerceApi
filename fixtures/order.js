const data =  {
 orders:[
{
billing_address: {
first_name: 'Yuval',
last_name: 'Zilberbrand',
address_1: 'Shraga Rafaeli Street 16',
city: 'Petah Tiqwa',
postcode: '4906420',
country: 'Israel',
email: 'kingyuv@gmail.com',
phone: '545817158'
},
shipping_address: {
first_name: 'Yuval',
last_name: 'Zilberbrand',
address_1: 'Shraga Rafaeli Street 16',
city: 'Petah Tiqwa',
postcode: '4906420',
country: 'Israel'
},
line_items: [
  {
product_id: 643,
quantity: 1
    }
 ],
shipping_lines: [
{
method_id: 'flat_rate',    
method_title: 'Flat_Rate',    
total: 10
}
]
}
]
};
module.exports = data;