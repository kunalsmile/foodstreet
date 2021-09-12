const databaseConfig = require("../config/databaseConfig");

async function getMenuItems(req, res) {
  await databaseConfig.getPool().query(`select * from menu_items;`, (error, results) => {
    if(error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
  });
}

async function getMenuItemByCategoryName(req, res) {
  const categoryName = req.query.categoryName;
  if (categoryName) {
  await databaseConfig.getPool().query(`select * from menu_items m inner join category c 
                on m.category_key = c.category_key 
                where category_name = '${categoryName}'`, (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                  res.status(200).json(results.rows);
                });
  } else {
    console.log("No category found");
    res.status(404).json({});
  }
}

async function getMenuItemByCategory(req, res) {
  const categoryKey = req.query.categoryKey;
  
  if (categoryKey) {
    await databaseConfig.getPool().query(`select * from menu_items  
                where category_key = ${categoryKey}`, (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                  res.status(200).json(results.rows);
                });
  } else {
    console.log("No category found");
    res.status(404).json({});
  }
}

async function getMenuItemByCategories(req, res) {
  const categoryKeys = req.query.categoryKeys;
  
  if (categoryKeys) {
    await databaseConfig.getPool().query(`select * from menu_items  
                where category_key in (${categoryKeys})`, (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                  res.status(200).json(results.rows);
                });
  } else {
    getMenuItems(req, res);
  }
}

module.exports = {
  getMenuItems,
  getMenuItemByCategoryName,
  getMenuItemByCategory,
  getMenuItemByCategories
}