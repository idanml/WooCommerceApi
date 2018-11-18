const addRoute = (base, path) => routes.push({
  base,
  handlers: require(path),
});

const routes = [];

addRoute('/products', './products');
addRoute('/orders', './orders');
addRoute('/customers', './customers');

module.exports = app => routes.map(({ base, handlers }) => app.use(base, handlers));
