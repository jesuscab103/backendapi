// db.ts

import { createPool, Pool,  OkPacket, RowDataPacket } from 'mysql2/promise';
import { ConnectionConfig } from 'mysql2';
type QueryResult = RowDataPacket[] | OkPacket;

let pool: Pool;

//Configuración Conexión BD
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'dbapitec',
  port: parseInt(process.env.DB_PORT || '3306', 10),
};
 

//Establecer Conexión con BD
export const connectDB = async (): Promise<void> => {
  pool = createPool(dbConfig);
  console.log('Connected to MySQL database');
};

//Cerrar Conexión con BD
export const closeDB = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    console.log('Connection to MySQL database closed');
  }
};

export const queryTest = async (): Promise<void> => {
  try {
    const [rows, fields] = await pool.query<RowDataPacket[]>('SELECT * FROM units');
    console.log('Rows:', rows);
  } catch (error) {
    console.error('Error executing query:', error);
  }
};


export const query = async (sql: string, values?: any[]): Promise<QueryResult> => {
    try {
        const [result, _] = await pool.query(sql, values);

        // Verificar el tipo de resultado y devolverlo
        if (Array.isArray(result)) {
            
            return result as RowDataPacket[];
        } else if ('affectedRows' in result && 'insertId' in result) {
            // Es un resultado de inserción
            return result as OkPacket;
        } else {
            throw new Error('Tipo de resultado no reconocido');
        }
    } catch (error) {
        // Manejar errores aquí si es necesario
        throw new Error(`Error en la consulta: ${error}`);
    }
};
export const db = dbConfig;
