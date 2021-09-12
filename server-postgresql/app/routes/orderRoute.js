const orderController = require('../controllers/orderController');

function customerRoutes(app) {
  app.route("/order/saveOrder") 
  .get(( req, res, next) => {
    next();
  }, orderController.placeOrder);

  app.route("/order/getOrderByStatus") 
  .get(( req, res, next) => {
    next();
  }, orderController.getOrderByStatus);
}  

module.exports = {
  customerRoutes
}