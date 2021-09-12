const customerController = require("../controllers/customerController");

function customerRoutes(app) {
  app.route("/getCustomers") 
  .get(( req, res, next) => {
    next();
  }, customerController.getCustomers);

  app.route("/getCustomerByEmail") 
  .get(( req, res, next) => {
    next();
  }, customerController.getCustomerByEmail);

  app.route("/getCustomerByMobile") 
  .get(( req, res, next) => {
    next();
  }, customerController.getCustomerByMobile);

  app.route("/user/signUp") 
  .post(( req, res, next) => {
    next();
  }, customerController.signUp);
}  

module.exports = {
  customerRoutes
}