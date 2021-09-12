
const databaseConfig = require("../config/databaseConfig");

async function getUser(req, res) {
  const userName = req.query.userName;
  const password = req.query.password;
  if(userName && password) {
    await databaseConfig.getPool().query(`select * from user_information
      where user_name = '${req.query.userName}' and password = '${req.query.password}';`, (error, results) => {
        if (error) {
          console.log(error);
        }
        if(results.rowCount > 0){
          res.status(200).json(results.rows);
        } else {
          res.status(200).json({"Status": "UserNotFound"});
        }
      });
  } else {
    res.status(400).json({"Status": "ValidationError"});
  }
}

async function getUserByMobile(req, res) {
  const mobileNumber = req.query.mobileNumber;
  if(mobileNumber) {
  await databaseConfig.getPool().query(`select * from user_information u inner join customer c 
        on u.user_id = c.user_key where c.mobile_number = '9986010491'`, (error, results) => {
          if(error) {
            console.log(error);
          }
          res.status(200).json(results.rows);
        });
  }
}

module.exports = {
  getUser,
  getUserByMobile
};


