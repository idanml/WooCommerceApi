const router = require('express').Router();
const WooCommerce = require('../woocommerce');

router.get('/:id?', async (req, res, next) => {
    try {
        const { id } = req.params;

        const url = 'customers' + (id ? `/${id}` : '');
        const { body } = await WooCommerce.getAsync(url);

        res.send(body);
    } catch (e) {
        next(e);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const data = require('../fixtures/customers');
        data.id = Math.random() * 1000;
        const {body} = await WooCommerce.postAsync('customers/bulk', data);
        
        res.send(body);
    } catch (e) {
        next(e);
    }
});

module.exports = router;