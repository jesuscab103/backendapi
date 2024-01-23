"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.query = exports.queryTest = exports.closeDB = exports.connectDB = void 0;
const promise_1 = require("mysql2/promise");
let pool;
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'dbapitec',
    port: parseInt(process.env.DB_PORT || '3306', 10),
};
const connectDB = async () => {
    pool = (0, promise_1.createPool)(dbConfig);
    console.log('Connected to MySQL database');
};
exports.connectDB = connectDB;
const closeDB = async () => {
    if (pool) {
        await pool.end();
        console.log('Connection to MySQL database closed');
    }
};
exports.closeDB = closeDB;
const queryTest = async () => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM units');
        console.log('Rows:', rows);
    }
    catch (error) {
        console.error('Error executing query:', error);
    }
};
exports.queryTest = queryTest;
const query = async (sql, values) => {
    try {
        const [result, _] = await pool.query(sql, values);
        if (Array.isArray(result)) {
            return result;
        }
        else if ('affectedRows' in result && 'insertId' in result) {
            return result;
        }
        else {
            throw new Error('Tipo de resultado no reconocido');
        }
    }
    catch (error) {
        throw new Error(`Error en la consulta: ${error}`);
    }
};
exports.query = query;
exports.db = dbConfig;
//# sourceMappingURL=db.js.map