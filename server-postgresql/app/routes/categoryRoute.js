const categoryController = require("../controllers/categoryController");

function categoryRoutes(app) {
  app.route('/categories')
  .get((req, res, next) => {
    next();
  }, categoryController.getCategories);

  app.route("/categoryByName")
  .get((req, res, next) => {
    next();
  }, categoryController.getCategoryByName);
}

module.exports = {
  categoryRoutes
};