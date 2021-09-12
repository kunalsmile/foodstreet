const menuItemController = require("../controllers/menuItemController");

function menuItemRoutes(app) {
  app.route('/items')
  .get((req, res,next) => {
    next();
  }, menuItemController.getMenuItems);

  app.route('/itemByCategory')
  .get((req, res,next) => {
    next();
  }, menuItemController.getMenuItemByCategory);

  app.route('/itemByCategories')
  .get((req, res,next) => {
    next();
  }, menuItemController.getMenuItemByCategories);
}

module.exports = {
  menuItemRoutes
};