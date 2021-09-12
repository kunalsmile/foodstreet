const express = require('express');
const cors = require("cors");


const userRoute = require("./app/routes/userRoute");
const categoryRoutes = require('./app/routes/categoryRoute');
const menuItemRoutes = require("./app/routes/menuItemRoutes"); 
const customerRoutes = require('./app/routes/customerRoute');
const shoppingCartRoutes = require("./app/routes/shoppingCartRoute");
const orderRoutes = require("./app/routes/orderRoute");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8100"
// }

// app.use(cors(corsOptions));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({message: "Welcome to FoodStreet API"});
});

userRoute.userRoutes(app);
categoryRoutes.categoryRoutes(app);
menuItemRoutes.menuItemRoutes(app);
customerRoutes.customerRoutes(app);
shoppingCartRoutes.shoppingCartRoute(app);
orderRoutes.customerRoutes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> {
  console.log(`Server is running at ${PORT}`);
});