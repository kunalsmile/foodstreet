const R = require('ramda');
const databaseConfig = require("../config/databaseConfig");

async function getCustomers(req, res) {
  await databaseConfig.getPool().query(`select * from customer;`, (error, results) => {
    if(error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
  });
}

async function getCustomerByEmail(req, res) {
  const emailAddress = req.query.emailAddress;
  if (emailAddress) {
  await databaseConfig.getPool().query(`select * from customer where email_address = '${emailAddress}'`, (error, results) => {
    if(error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
  });
  }
}

async function getCustomerByMobile(req, res) {
  const mobileNumber = req.query.mobileNumber;
  if (mobileNumber) {
  await databaseConfig.getPool().query(`select * from customer where mobile_number = '${mobileNumber}'`, (error, results) => {
    if(error) {
      console.log(error);
    }
    res.status(200).json(results.rows);
  });
  }
}

async function signUp(req, res) {
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;
  const mobile = req.body.Mobile;
  const password = req.body.Password;
  const userName = req.body.UserName;

  if(firstName && lastName && mobile && password && userName) {
    count = await checkUserExists(userName);
    console.log(count);
    if (count > 0) {
      res.status(200).json({"Status": "UserExists"});
    } else {
      await databaseConfig.getPool().query(`select * from 
      signup_user('${firstName}', '${lastName}', '${mobile}', '${password}', '${userName}')`, (error, results) => {
        if(error) {
          console.log(error);
        }
        res.status(200).json({"Status": "UserSignedUp"});
      });
    }
  }
}

async function checkUserExists(userName) {
  let count = 0;
  await databaseConfig.getPool().query(`select 1 from user_information where user_name = '${userName}'`)
  .then(res => {
    count = R.head(R.values(R.head(res.rows)));
  }).finally(() => databaseConfig.getPool().end());

  return count;
}

module.exports = {
  getCustomers,
  getCustomerByEmail,
  getCustomerByMobile,
  signUp
}