"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ingredient_data_1 = __importDefault(require("../data/ingredient-data"));
var errors_1 = require("../errors/errors");
var IngredientRepo = (function () {
    function IngredientRepo() {
    }
    IngredientRepo.prototype.getAll = function () {
        return new Promise(function (resolve, reject) {
            var ingredients = ingredient_data_1.default;
            resolve(ingredients);
        });
    };
    IngredientRepo.prototype.getByName = function (name) {
        return new Promise(function (resolve, reject) {
            var ing = __assign({}, ingredient_data_1.default.filter(function (ing) { return ing.name === name; })[0]);
            if (Object.keys(ing).length === 0) {
                reject(new errors_1.DataNotFoundError());
                return;
            }
            resolve(ing);
        });
    };
    IngredientRepo.prototype.save = function (newIng) {
        return new Promise(function (resolve, reject) {
            var conflict = ingredient_data_1.default.filter(function (ing) { return ing.name == newIng.name; }).pop();
            if (conflict) {
                reject(new errors_1.DataSaveError('This ingredient already exists.'));
                return;
            }
            ingredient_data_1.default.push(newIng);
            resolve(newIng);
        });
    };
    IngredientRepo.prototype.deleteByName = function (name) {
        return new Promise(function (resolve, reject) {
        });
    };
    return IngredientRepo;
}());
exports.IngredientRepo = IngredientRepo;
