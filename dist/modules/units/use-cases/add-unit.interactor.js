"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUnitInteractor = void 0;
class AddUnitInteractor {
    constructor(unitRepository) {
        this.unitRepository = unitRepository;
    }
    execute(payload) {
        if (payload.idgps === undefined ||
            payload.brand === undefined ||
            payload.model === undefined ||
            payload.plate === undefined ||
            payload.serie === undefined ||
            payload.year === undefined ||
            payload.color === undefined ||
            payload.line === undefined ||
            payload.unit_name === undefined ||
            payload.group_name === undefined) {
            throw Error('Missing fields');
        }
        else if (Number.isNaN(payload.idgps)) {
            throw Error('Wrong type');
        }
        else {
            return this.unitRepository.addUnit(payload);
        }
    }
}
exports.AddUnitInteractor = AddUnitInteractor;
//# sourceMappingURL=add-unit.interactor.js.map