"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ingredient_repo_1 = require("../repos/ingredient-repo");
var ingredient_service_1 = require("../services/ingredient-service");
var ingredientRepo = new ingredient_repo_1.IngredientRepo();
var ingredientService = new ingredient_service_1.IngredientService(ingredientRepo);
exports.default = {
    ingredientService: ingredientService
};
