const router = require('express').Router();
const WooCommerce = require('../woocommerce');

router.get('/:id?', async (req, res, next) => {
    try {
        const { id } = req.params;

        const url = 'orders' + (id ? `/${id}` : '');
        const { body } = await WooCommerce.getAsync(url);

        res.send(body);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    var body
    try {
        const data = require('../fixtures/order');
        data.id = Math.random() * 1000;
        body = await WooCommerce.postAsync('orders/bulk', data);
        
        res.send(body);
    } catch (e) {
        next(e);
    }
});

router.post('/statuschanged', async (req, res,  next) => {
    try {
        var status;
        status=req.body.action.substring(25, 35);
      console.log("order id: "+req.body.arg +" change to status "+ status);
      res.send("ok");
    } catch (e) {
      next(e);
    }
  });

  router.post('/created', async (req, res,  next) => {
    try {
  
      console.log(req.body)                               //req.body contain order object with all the data
      res.send("ok");
    } catch (e) {
      next(e);
    }
  });

  router.post('/paymentcomplete', async (req, res,  next) => {
    try {
  
      console.log(req.body)                               //req.body contain the id of the order that get paid
      res.send("ok");
    } catch (e) {
      next(e);
    }
  });
/*
post request to the server that get the user data and upload new product and matched order to WooCommerce store
*/
router.post('/createorder', async (req, res, next) => {
    var id, body;
    var order_data = { url: "", wc_id: -1,};
    try {
       
        productData =  {                        //data of product that reprsent the whole price of goods
            product: {
           title: 'goods',
           type: 'simple',
           regular_price: req.body.price       // price+taxes
           }
           };
           
           //the function post the product in woocommerce store and return the id.
           body = await WooCommerce.postAsync('products', productData);
        
           id=JSON.parse(body.body).product.id;
         

        orderData = {
            order: {
                billing_address: {
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    address_1: req.body.address,
                    city: req.body.city,
                    postcode: req.body.postcode,
                    country: req.body.country,
                    email: req.body.email,
                    phone: req.body.phone
                    },
                    shipping_address: {
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    address_1: req.body.address,
                    city: req.body.city,
                    postcode: req.body.postcode,
                    country: req.body.country
                    },
                    line_items: [
                      {
                    product_id: id,
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
          };
         
            //the function post the order in woocommerce store and send the response to the client
          body = await WooCommerce.postAsync('orders', orderData);
          body=JSON.parse(body.body).order
          order_data.url= 'http://localhost/wordpress/checkout/order-pay/'+body.id+'/?pay_for_order=true&key='+body.order_key
          order_data.wc_id=body.id
          res.send(JSON.stringify(order_data));
        
    } catch (e) {
        next(e);
    }
    
});



router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = await WooCommerce.deleteAsync(`orders/${id}`);
  
      res.send(body);
    } catch(e) {
      next(e);
    }
  });
  
  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = require('../fixtures/ordersUpd');
      const { body } = await WooCommerce.putAsync(`orders/${id}`, data);
  
      res.send(body);
    } catch(e) {
      next(e);
    }
  })

module.exports = router;


