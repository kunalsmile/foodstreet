const userController = require("../controllers/userController");

function userRoutes(app) {
  app.route('/user')
  .get((req, res,next) => {
    next();
  }, userController.getUser);

  app.route('/userByMobile')
  .get((req, res,next) => {
    next();
  }, userController.getUserByMobile);
}


module.exports = {
  userRoutes
};