'use strict';
module.exports = function (app) {
  const products = require('../controllers/productsController'),
    users = require('../controllers/usersController'),
    session = require('../controllers/sessionController');

  const sessionChecker = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
      res.status(401).send("Please log in before performing this action.");
    } else next();
  };

  // products Routes
  app.route('/products')
    .get(products.listProducts)
    .post(sessionChecker, products.createProduct);

  app.route('/products/:productUid')
    .get(products.getProduct)
    .put(sessionChecker, products.updateProduct)
    .delete(sessionChecker, products.deleteProduct);

  app.route('/user/:userUid/products')
    .get(products.listUserProducts);

  app.route('/user/products/')
    .get(sessionChecker, products.listCurrentUserProducts);

  // users Routes
  app.route('/users')
    .get(users.listUsers)
    .post(users.createUser);

  // session routes
  app.route('/login')
    .post(session.logIn);

  app.route('/logout')
    .post(session.logOut);

  app.route('/profile')
    .get(sessionChecker, session.profile);
};