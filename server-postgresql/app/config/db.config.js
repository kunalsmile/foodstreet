module.exports = {
  HOST: "localhost",
  USER: "spacekonnect",
  PASSWORD: "spacekonnect",
  DB: "spacekonnect",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const createConnectionPool = require("@databases/pg");
