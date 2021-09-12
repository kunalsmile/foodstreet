const shoppingCartController = require("../controllers/shoppingCartController");

function shoppingCartRoute(app) {
  app.route("/cart/saveCart")
  .post((req, res, next) => {
    next();
  }, shoppingCartController.saveShoppingCartItem);

  app.route("/cart/getCart")
  .get((req, res, next) => {
    next();
  }, shoppingCartController.getShoppingCart);
}

module.exports = {
  shoppingCartRoute
}