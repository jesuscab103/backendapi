"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitRouter = exports.UnitController = void 0;
const express_1 = require("express");
const unit_storage_gateway_1 = require("./unit-storage.gateway");
const add_unit_interactor_1 = require("../use-cases/add-unit.interactor");
const get_all_unit_interactor_1 = require("../use-cases/get-all-unit.interactor");
class UnitController {
    static async addUnit(req, res) {
        const { idgps, brand, model, plate, serie, year, color, line, unit_name, group_name, } = req.body;
        const unitdata = {
            idgps: Number(idgps),
            brand,
            model,
            plate,
            serie,
            year,
            color,
            line,
            unit_name,
            group_name,
        };
        const unitRepository = new unit_storage_gateway_1.UnitStorageGateway();
        const unitInteractor = new add_unit_interactor_1.AddUnitInteractor(unitRepository);
        try {
            const response = await unitInteractor.execute(unitdata);
            res.status(200).json({ registered: response });
        }
        catch (error) {
            console.log(error.message);
            const message = error.message;
            res.status(400).json({ message });
        }
    }
    static async getAllUnits(req, res) {
        const { startdate, enddate } = req.params;
        const unitConsult = {
            startdate,
            enddate
        };
        const unitRepository = new unit_storage_gateway_1.UnitStorageGateway();
        const getAllUnit = new get_all_unit_interactor_1.GetAllUnitInteractor(unitRepository);
        try {
            const response = await getAllUnit.execute(unitConsult);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error.message);
            const message = error.message;
            res.status(400).json({ message });
        }
    }
}
exports.UnitController = UnitController;
exports.unitRouter = (0, express_1.Router)();
exports.unitRouter.post('/add-unit', UnitController.addUnit);
exports.unitRouter.post('/get-all-unit/:startdate/:enddate', UnitController.getAllUnits);
//# sourceMappingURL=unit.controller.js.map