"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Recipe = (function () {
    function Recipe(name, ingredients) {
        this.name = name;
        this.ingredients = ingredients;
        var cals = 0;
        var carbs = 0;
        var protiens = 0;
        var fats = 0;
        for (var i = 0; i < ingredients.length; i++) {
            cals = cals + ingredients[i].calories;
            carbs = carbs + ingredients[i].carbs;
            protiens = protiens + ingredients[i].protien;
            fats = fats + ingredients[i].fats;
        }
        this.totalCal = cals;
        this.totalCarbs = carbs;
        this.totalProtien = protiens;
        this.totalFats = fats;
    }
    return Recipe;
}());
exports.Recipe = Recipe;
