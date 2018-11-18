var express = require('express');
var router = express.Router();


const WooCommerce = require('../woocommerce');


// pass id to get a single item, or do not to get item list
router.get('/:id?', async (req, res,  next) => {
  try {
    const { id } = req.params;
    console.log("check " + id);
    const url = 'products' + (id ? `/${id}` : '');
    const { body } = await WooCommerce.getAsync(url);
    res.send(body);
  } catch (e) {
    next(e);
  }
});



router.post('/', async (req, res,  next) => {
  try {
    const data = require('../fixtures/product');
    const {body} = await WooCommerce.postAsync('products', data);
    console.log(body)
    res.send(JSON.parse(body).product);
  } catch (e) {
    next(e);
  }
});



router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = await WooCommerce.deleteAsync(`products/${id}`);
    console.log("check1");
    res.send(body);
  } catch(e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => { // wrong ID error. research
  try {
    const { id } = req.params;
    const data = require('../fixtures/productUpd');
    const { body } = await WooCommerce.putAsync(`products/${id}`, data);

    res.send(body);
  } catch(e) {
    next(e);
  }
})



module.exports = router;
