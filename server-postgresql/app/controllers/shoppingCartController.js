const databaseConfig = require("../config/databaseConfig");

async function getShoppingCart(req, res) {
  const customerKey = req.query.customerKey;
  if (customerKey) {
    databaseConfig.getPool().query(`select sc.*, i.item_name, i.price from shopping_cart sc 
      inner join menu_items i on i.item_id = sc.item_key 
      where customer_key = '${customerKey}'`, (error, results) => {
      if(error) {
        console.log(error);
      }
      res.status(200).json(results.rows);
    });
  }
}

async function saveShoppingCartItem(req, res) {
  const customerKey = req.body.CustomerKey;
  const itemKey = req.body.ItemKey;
  const quantity = req.body.Quantity;
  
  if(customerKey && itemKey && quantity) {
    databaseConfig.getPool().query(`select * from shopping_cart 
    where customer_key = ${customerKey} and item_key = ${itemKey}`, (error, results) => {
      if(results.rowCount > 0) {
        databaseConfig.getPool().query(`update shopping_cart set quantity = ${quantity} 
          where customer_key = ${customerKey} and item_key = ${itemKey}`, (error, results) => {
            if(error) {
              console.log(error);
            }
            console.log("Shopping cart updated");
            res.status(200).json({"Status": "CartUpdated"});
          });
      } else {
        databaseConfig.getPool().query(`insert into shopping_cart (customer_key, item_key, quantity) 
        values (${customerKey}, ${itemKey}, ${quantity});`, (error, results) => {
          if(error) {
            console.log(error);
          }
          console.log("Shopping cart inserted");
          res.status(200).json({"Status": "CartInserted"});
        });
      }
    });
  }
}

module.exports = {
  getShoppingCart,
  saveShoppingCartItem
}