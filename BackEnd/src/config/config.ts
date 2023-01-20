import dotenv from 'dotenv';

dotenv.config();

const MYSQL_HOST = process.env.MY_SQL_DB_HOST;
const MYSQL_DATABASE = process.env.MY_SQL_DB_DATABASE;
const MYSQL_USER = process.env.MY_SQL_DB_USER;
const MYSQL_PASSWORD = process.env.MY_SQL_DB_PASSWORD;
// const MYSQL_PORT = process.env.MY_SQL_DB_PORT;

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    // port: MYSQL_PORT
}


const SERVER_HOSTNAME = process.env.MY_SQL_DB_HOST;
const SERVER_PORT = process.env.MY_SQL_DB_PORT;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    mysql: MYSQL,
    server: SERVER
}

export = config;