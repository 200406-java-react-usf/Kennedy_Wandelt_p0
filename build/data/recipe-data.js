"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var recipe_1 = require("../models/recipe");
var ingredient_data_1 = __importDefault(require("./ingredient-data"));
exports.default = [
    new recipe_1.Recipe('pb and j', [ingredient_data_1.default[16], ingredient_data_1.default[16], ingredient_data_1.default[17], ingredient_data_1.default[18]]),
    new recipe_1.Recipe('shrimp scampi', [ingredient_data_1.default[27], ingredient_data_1.default[27], ingredient_data_1.default[26], ingredient_data_1.default[25], ingredient_data_1.default[24], ingredient_data_1.default[24], ingredient_data_1.default[24], ingredient_data_1.default[10], ingredient_data_1.default[9], ingredient_data_1.default[9]]),
    new recipe_1.Recipe('pot roast', [ingredient_data_1.default[21], ingredient_data_1.default[22], ingredient_data_1.default[23], ingredient_data_1.default[19], ingredient_data_1.default[19], ingredient_data_1.default[19]]),
    new recipe_1.Recipe('carne asada street taco (3)', [ingredient_data_1.default[19], ingredient_data_1.default[19], ingredient_data_1.default[19], ingredient_data_1.default[20], ingredient_data_1.default[20], ingredient_data_1.default[20], ingredient_data_1.default[4], ingredient_data_1.default[5], ingredient_data_1.default[5]]),
    new recipe_1.Recipe('couscous, fish, and asparagus', [ingredient_data_1.default[6], ingredient_data_1.default[7], ingredient_data_1.default[8], ingredient_data_1.default[9], ingredient_data_1.default[9], ingredient_data_1.default[10], ingredient_data_1.default[11], ingredient_data_1.default[12]]),
    new recipe_1.Recipe('avacado and chicken taco (3)', [ingredient_data_1.default[0], ingredient_data_1.default[0], ingredient_data_1.default[0], ingredient_data_1.default[1], ingredient_data_1.default[1], ingredient_data_1.default[1], ingredient_data_1.default[2], ingredient_data_1.default[3], ingredient_data_1.default[4], ingredient_data_1.default[5]]),
    new recipe_1.Recipe('butter chicken', [ingredient_data_1.default[13], ingredient_data_1.default[14], ingredient_data_1.default[15], ingredient_data_1.default[4], ingredient_data_1.default[2], ingredient_data_1.default[2], ingredient_data_1.default[2], ingredient_data_1.default[5]])
];
