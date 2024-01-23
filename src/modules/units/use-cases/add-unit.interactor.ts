import { UseCase } from 'kernel/contracts';
import { Units } from '../entities/unit';
import { unitRepository } from './ports/unit.repository';
export class AddUnitInteractor implements UseCase<Units, boolean>
{
    constructor(private readonly unitRepository: unitRepository) { }
    execute(payload: Units): Promise<boolean> {
        if (
            payload.idgps === undefined ||
            payload.brand === undefined ||
            payload.model === undefined ||
            payload.plate === undefined ||
            payload.serie === undefined ||
            payload.year === undefined ||
            payload.color === undefined ||
            payload.line === undefined ||
            payload.unit_name === undefined ||
            payload.group_name === undefined
        ) {
            throw Error('Missing fields');
        } else if (Number.isNaN(payload.idgps)) {
            throw Error('Wrong type');
        } else {
            return this.unitRepository.addUnit(payload);
        }
    }
}
