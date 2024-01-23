"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./config/express"));
async function main() {
    try {
        express_1.default.listen(express_1.default.get('port'));
        console.log(`Servidor escuchando en puerto ${express_1.default.get('port')}`);
        console.log('Connection stablished');
    }
    catch (error) {
        console.log(error);
    }
}
main();
//# sourceMappingURL=index.js.map