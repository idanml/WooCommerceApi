
var WooCommerceAPI = require('woocommerce-api');

const CONSUMER_KEY = 'ck_ca51daa64290b5e9be9f5da26aa1fd281eb5aad1';
const CONSUMER_SECRET = 'cs_5ca991cbba391b65d1772c1d6abf18b5ecabcf90';

var WooCommerce = new WooCommerceAPI({
  url: 'http://localhost/wordpress/',
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  version: 'v3'
});

module.exports = WooCommerce;
