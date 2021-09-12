const databaseConfig = require("../config/databaseConfig");

async function getCategories(req, res) {
  await databaseConfig.getPool().query(`select * from category;`, (error, results) => {
    if(error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
  })
}

async function getCategoryByName(req, res) {
  const categoryName = req.query.categoryName;
  if(categoryName) {
  await databaseConfig.getPool().query(`select * from category where category_name = '${categoryName}';`, (error, results) => {
    if(error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
  });
  } else {
    console.log("No category found");
    res.status(404).json({});
  }
}

module.exports = {
  getCategories,
  getCategoryByName
};