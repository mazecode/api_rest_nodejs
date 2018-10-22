require('dotenv').config();//instatiate environment variables

let CONFIG = {}  //Make this global to use all over the application

CONFIG.env  = process.env.NODE_ENV   || 'development';
CONFIG.port = process.env.PORT  || '3002';

CONFIG.db_dialect  = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_host     = process.env.DB_HOST       || 'localhost';
CONFIG.db_port     = process.env.DB_PORT       || '3306';
CONFIG.db_name     = process.env.DB_NAME       || 'api_rest';
CONFIG.db_user     = process.env.DB_USER       || 'dev1';
CONFIG.db_password = process.env.DB_PASSWORD   || 'dev1test';

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;
