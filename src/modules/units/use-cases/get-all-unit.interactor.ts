import { UseCase } from "kernel/contracts";
import { UnitConsult } from "./dtos/unit-consult-dto";
import { Consult } from "kernel/types";
import { Units } from "../entities/unit";
import { unitRepository } from "./ports/unit.repository";
//Generar envio a Repository
export class GetAllUnitInteractor implements UseCase<UnitConsult, Consult<Units>>
{
    constructor(private readonly unitRepository: unitRepository) { }
    execute(payload?: UnitConsult): Promise<Consult<Units>> {
        if (
            payload?.enddate == undefined ||
            payload.startdate == undefined
        ) {
            throw Error("Missing fields");
        } else {
            return this.unitRepository.getAllUnit(payload);
        }
    }

}