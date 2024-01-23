
import { Units } from "modules/units/entities/unit";
import { UnitConsult } from "../dtos/unit-consult-dto";
import { Consult } from "kernel/types";

export interface unitRepository{
   //Establecer Funciones
    addUnit(unit: Units): Promise<boolean>;
    getAllUnit(unitdata: UnitConsult):Promise<Consult<Units>>;
    
}