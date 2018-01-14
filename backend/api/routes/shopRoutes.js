'use strict';
module.exports = function (app) {
  var products = require('../controllers/productsController');
  var users = require('../controllers/usersController');

  // products Routes
  app.route('/products')
    .get(products.listProducts)
    .post(products.createProduct);


  app.route('/products/:productUid')
    .get(products.getProduct)
    .put(products.updateProduct)
    .delete(products.deleteProduct);

  // users Routes
  app.route('/users')
    .get(users.listUsers)
    .post(users.createUser);
};