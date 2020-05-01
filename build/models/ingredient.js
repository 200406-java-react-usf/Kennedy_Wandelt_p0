"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ingredient = (function () {
    function Ingredient(name, unit, calories, carbs, protien, fats) {
        this.name = name;
        this.unit = unit;
        this.calories = calories;
        this.carbs = carbs;
        this.protien = protien;
        this.fats = fats;
    }
    return Ingredient;
}());
exports.Ingredient = Ingredient;
