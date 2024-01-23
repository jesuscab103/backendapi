"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUnitInteractor = void 0;
class GetAllUnitInteractor {
    constructor(unitRepository) {
        this.unitRepository = unitRepository;
    }
    execute(payload) {
        if ((payload === null || payload === void 0 ? void 0 : payload.enddate) == undefined ||
            payload.startdate == undefined) {
            throw Error("Missing fields");
        }
        else {
            return this.unitRepository.getAllUnit(payload);
        }
    }
}
exports.GetAllUnitInteractor = GetAllUnitInteractor;
//# sourceMappingURL=get-all-unit.interactor.js.map