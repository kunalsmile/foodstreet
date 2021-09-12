const databaseConfig = require("../config/databaseConfig");

async function placeOrder(req, res) {
  const customerKey = req.query.customerKey;
  await databaseConfig.getPool().query(`select * from save_order(${customerKey})`, (results, error) => {
    if(error) {
      console.log(error);
    }
    res.status(200).json({"Status": "OrderStarted"});
  });
}

async function getOrderByStatus(req, res) {
  const statusKey = req.query.statusKey;
  const customerKey = req.query.customerKey;
  await databaseConfig.getPool().query(`select i.order_key, im.item_key, mi.price, im.quantity, mi.item_name from item_order i
  inner join item_order_item_mapping im on i.order_key = im.item_order_key 
  inner join menu_items mi on mi.item_id = im.item_key
  inner join status s on s.status_key = i.status_key
  where
  s.status_name = 'ORDER_PLACED' and i.customer_key = 1`)
  .then((results) => {
    res.status(200).json(results.rows);
  })
  .finally(() => databaseConfig.getPool().end());
}

module.exports = {
  placeOrder,
  getOrderByStatus
}