"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ingredient_router_1 = require("./routers/ingredient-router");
var app = express_1.default();
app.use('/', express_1.default.json());
app.use('/ingredients', ingredient_router_1.IngredientRouter);
app.listen(8080, function () {
    console.log('Application running and listening at: http://localhost:8080');
});
