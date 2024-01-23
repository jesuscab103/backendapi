"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unit_controller_1 = require("../modules/units/adapters/unit.controller");
require('dotenv').config();
const app = (0, express_1.default)();
const cors = require('cors');
app.set('port', process.env.PORT || 3000);
app.use(cors({
    origin: '*',
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.get('/', (req, res) => {
    res.send('<h1>Backend</h1>');
});
app.use('/units', unit_controller_1.unitRouter);
exports.default = app;
//# sourceMappingURL=express.js.map