
import express, { Request, Response, Router } from 'express';
import { unitRepository } from "../use-cases/ports/unit.repository";
import { UnitStorageGateway } from "./unit-storage.gateway";
import { AddUnitInteractor } from "../use-cases/add-unit.interactor";
import { Units } from "../entities/unit";
import { debug } from 'console';
import { UnitConsult } from '../use-cases/dtos/unit-consult-dto';
import { GetAllUnitInteractor } from '../use-cases/get-all-unit.interactor';

export class UnitController {

    static async addUnit(req: Request, res: Response) {
        //Obtener Valores
        const { idgps, brand, model, plate, serie, year, color, line, unit_name, group_name, } = req.body;
        //Asignar Valores obtenidos 
        const unitdata: Units = {
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
        //Instacia de Storage e Interactor
        const unitRepository: unitRepository = new UnitStorageGateway();
        const unitInteractor: AddUnitInteractor = new AddUnitInteractor(unitRepository);
        try{
            const response = await unitInteractor.execute(unitdata);
            //Respuesta de Ejecución
            res.status(200).json({registered: response})
        }catch(error){
            //Mensajes de Error
            console.log((<Error>error).message);
            const message = (<Error>error).message;
            res.status(400).json({ message });
        }
    }

    //Consulta de Unidades
    static async getAllUnits(req:Request, res:Response){
        const {startdate,enddate } = req.params;

        //Asignar datos obtenidos
        const unitConsult:UnitConsult = {
            startdate,
            enddate
        }
        //Instacia de Storage e Interactor
        const unitRepository : unitRepository = new UnitStorageGateway();
        const getAllUnit: GetAllUnitInteractor = new GetAllUnitInteractor(unitRepository);
        try{
            const response = await getAllUnit.execute(unitConsult);
            res.status(200).json(response);
        }catch(error){
            console.log((<Error>error).message);
            const message = (<Error>error).message;
            res.status(400).json({ message });
        }
    }
}
export const unitRouter = Router();

//Definir Rutas de Petición
unitRouter.post(
    '/add-unit',
    UnitController.addUnit
  );

  unitRouter.post(
    '/get-all-unit/:startdate/:enddate',
    UnitController.getAllUnits
  );