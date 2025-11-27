require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'nestjs_user',
    password: process.env.DB_PASSWORD || 'nestjs_password',
    database: process.env.DB_DATABASE || 'nestjs_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME || 'nestjs_user',
    password: process.env.DB_PASSWORD || 'nestjs_password',
    database: process.env.DB_DATABASE || 'nestjs_db_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  },
};
