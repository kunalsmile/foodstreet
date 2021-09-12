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

module.exports = {
  placeOrder
}