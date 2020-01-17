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
  // postgres://abvzhicoinlqsv:0ffdbb518b3dc5f72144f7b82976453d928d83f94a8bb77dd05d1a7712437ffa@ec2-174-129-230-117.compute-1.amazonaws.com:5432/daqf6mq5k6b9iv
  //mysql://bba0695d39e2da:f3a25c85@us-cdbr-iron-east-05.cleardb.net/heroku_20a6fbbffc1ca5d?reconnect=true
// mysql://rpezdsz1mb2e9qzy:nvd26qx7wtpwt5c7@nba02whlntki5w2p.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/owk29u9kd20tiuvk
module.exports =
{
  "development": {
    "username": "abvzhicoinlqsv",
    "password": "0ffdbb518b3dc5f72144f7b82976453d928d83f94a8bb77dd05d1a7712437ffa",
    "database": "daqf6mq5k6b9iv",
    "host": "ec2-174-129-230-117.compute-1.amazonaws.com",
    "operatorsAliases":operadores,
    "dialect": "postgres",
    "logging": false,
	  pool: {
	    max: 10,
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
    "username": "abvzhicoinlqsv",
    "password": "0ffdbb518b3dc5f72144f7b82976453d928d83f94a8bb77dd05d1a7712437ffa",
    "database": "daqf6mq5k6b9iv",
    "host": "ec2-174-129-230-117.compute-1.amazonaws.com",
    "operatorsAliases":operadores,
    "dialect": "postgres",
    "logging": false,
	  pool: { 
	    max: 10,
	    min: 0,
	    acquire: 30000,
	    idle: 10000
	  } 
  }
}

