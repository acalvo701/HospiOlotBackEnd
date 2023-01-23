import mysql = require('mysql2');
import config = require('./config');

const params:mysql.ConnectionOptions = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    // port: config.mysql.port,
    database: config.mysql.database,
    dateStrings: true
};

const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connectionn = mysql.createConnection(params);

        connectionn.connect((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connectionn);
        });

    });

const Query = async (connection: mysql.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });

const PreparedQuery = async (connection: mysql.Connection, query: string, values: Array<string>) =>
    new Promise((resolve, reject) => {
        connection.execute(query, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);
        });
    });
export { Connect, Query, PreparedQuery};