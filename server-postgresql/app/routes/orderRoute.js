const orderController = require('../controllers/orderController');

function customerRoutes(app) {
  app.route("/order/saveOrder") 
  .get(( req, res, next) => {
    next();
  }, orderController.placeOrder);
}  

module.exports = {
  customerRoutes
}