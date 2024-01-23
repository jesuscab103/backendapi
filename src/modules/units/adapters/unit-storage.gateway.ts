
import { Units } from "../entities/unit";
import { unitRepository } from "../use-cases/ports/unit.repository";
import { connectDB, closeDB, query } from '../../../config/db';
import { db } from '../../../config/db';
import { count } from "console";
import { Consult } from "kernel/types";
import { UnitConsult } from "../use-cases/dtos/unit-consult-dto";

export class UnitStorageGateway implements unitRepository {

    //Consulta Unidadees
    async getAllUnit(unitdata: UnitConsult): Promise<Consult<Units>> {
        //Estructura de Response
        let response: Consult<Units> = {
            entities: [],
            total: 0,
        };
        const connection = await connectDB();

        try{
            //Ejecutar Query Especifica
            const result = await query('SELECT * FROM units');
            if (Array.isArray(result)){
                if (result.length > 0){
                    //Busqueda por YEAR
                    const search = await query(
                        'SELECT * FROM units WHERE year BETWEEN ? AND ?',
                        [unitdata.startdate, unitdata.enddate]
                    );
                    if(Array.isArray(search)){
                        search.forEach(data => {
                            response.entities.push({
                                idgps:data.idgps,
                                brand:data.brand,
                                model:data.model,
                                plate:data.plate,
                                serie:data.serie,
                                year:data.year,
                                color:data.color,
                                line:data.line,
                                unit_name:data.unit_name,
                                group_name:data.group_name
                            });
                        });
                        response.total = search.length;
                    }
                }
            }
            return response;
        }catch (error) {
            console.log("Error en la petición")
        }
        finally {
            await closeDB();
        }
        return response;
    }

    async addUnit(units: Units): Promise<boolean> {
        let response: boolean = false;

        const connection = await connectDB();

        try {
            const result = await query('SELECT units.idgps FROM units WHERE units.idgps = ?', [units.idgps]);
            //console.log(result);
            if (Array.isArray(result)) {
                const [rows] = result;
                if (result.length > 0) {
                    // Puedes acceder a los resultados específicos según tus necesidades
                    const idgpsValue = result[0].idgps;
                } else {
                    const insertResult = await query(
                        'INSERT INTO units (idgps, brand, model, plate, serie, year, color, line, unit_name, group_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [
                            units.idgps,
                            units.brand,
                            units.model,
                            units.plate,
                            units.serie,
                            units.year,
                            units.color,
                            units.line,
                            units.unit_name,
                            units.group_name,
                        ]
                    );

                    // Verificar si la inserción se realizó correctamente
                    if ('affectedRows' in insertResult && insertResult.affectedRows > 0) {
                        response = true;
                    } else {
                        console.error('Error al insertar datos o no se modificaron filas.');
                    }
                }
            } else {
                console.log('Error en la consulta: Tipo de resultado no reconocido');
            }
        } catch (error) {
            console.log(error)
        }
        await closeDB();
        return response;
    }
}