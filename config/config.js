// {
//   "development": {
//     "username": "bba0695d39e2da",
//     "password": "f3a25c85",
//     "database": "heroku_20a6fbbffc1ca5d",
//     "host": "us-cdbr-iron-east-05.cleardb.net",
//     "dialect": "mysql"  
//   },
//   "test": {
//     "username": "bcc1a8ecc0f2f8",
//     "password": "04a03342",
//     "database": "heroku_ed152b41490a5f5",
//     "host": "us-cdbr-iron-east-02.cleardb.net",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "bba0695d39e2da",
//     "password": "f3a25c85",
//     "database": "heroku_20a6fbbffc1ca5d",
//     "host": "us-cdbr-iron-east-05.cleardb.net",
//     "dialect": "mysql"    
//   }
  
// }

const fs = require('fs');
const sequelize	= require('sequelize');
const Op = sequelize.Op;

// "development": {
//   "username": process.env.DB_DEV_USER,
//   "password": process.env.DB_DEV_PWD,
//   "database": process.env.DB_DEV_NAME,
//   "host": process.env.DB_DEV_HOSTNAME,
//   "dialect": process.env.DB_DEV_DIALECT,
//   "logging": false 
  
// }
let operadores ={
  
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  };

module.exports =
{
  "development": {
    "username": "bba0695d39e2da",
    "password": "f3a25c85",
    "database": "heroku_20a6fbbffc1ca5d",
    "host": "us-cdbr-iron-east-05.cleardb.net",
    "dialect": "mysql",
    "operatorsAliases":operadores,
    "logging": false, 
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
    
  },
  "production": {
    "username": "bba0695d39e2da",
    "password": "f3a25c85",
    "database": "heroku_20a6fbbffc1ca5d",
    "host": "us-cdbr-iron-east-05.cleardb.net",
    "operatorsAliases":operadores,
    "dialect": "mysql",
    "logging": false 
  }
}

