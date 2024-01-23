"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitStorageGateway = void 0;
const db_1 = require("../../../config/db");
class UnitStorageGateway {
    async getAllUnit(unitdata) {
        let response = {
            entities: [],
            total: 0,
        };
        const connection = await (0, db_1.connectDB)();
        try {
            const result = await (0, db_1.query)('SELECT * FROM units');
            if (Array.isArray(result)) {
                if (result.length > 0) {
                    const search = await (0, db_1.query)('SELECT * FROM units WHERE year BETWEEN ? AND ?', [unitdata.startdate, unitdata.enddate]);
                    if (Array.isArray(search)) {
                        search.forEach(data => {
                            response.entities.push({
                                idgps: data.idgps,
                                brand: data.brand,
                                model: data.model,
                                plate: data.plate,
                                serie: data.serie,
                                year: data.year,
                                color: data.color,
                                line: data.line,
                                unit_name: data.unit_name,
                                group_name: data.group_name
                            });
                        });
                        response.total = search.length;
                    }
                }
            }
            return response;
        }
        catch (error) {
            console.log("Error en la petición");
        }
        finally {
            await (0, db_1.closeDB)();
        }
        return response;
    }
    async addUnit(units) {
        let response = false;
        const connection = await (0, db_1.connectDB)();
        try {
            const result = await (0, db_1.query)('SELECT units.idgps FROM units WHERE units.idgps = ?', [units.idgps]);
            if (Array.isArray(result)) {
                const [rows] = result;
                if (result.length > 0) {
                    const idgpsValue = result[0].idgps;
                }
                else {
                    const insertResult = await (0, db_1.query)('INSERT INTO units (idgps, brand, model, plate, serie, year, color, line, unit_name, group_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
                    ]);
                    if ('affectedRows' in insertResult && insertResult.affectedRows > 0) {
                        response = true;
                    }
                    else {
                        console.error('Error al insertar datos o no se modificaron filas.');
                    }
                }
            }
            else {
                console.log('Error en la consulta: Tipo de resultado no reconocido');
            }
        }
        catch (error) {
            console.log(error);
        }
        await (0, db_1.closeDB)();
        return response;
    }
}
exports.UnitStorageGateway = UnitStorageGateway;
//# sourceMappingURL=unit-storage.gateway.js.map