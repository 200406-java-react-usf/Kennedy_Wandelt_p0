export class Ingredient {

    id: number;
    name: string;
    unit: string;
    calories: number;
    carbs: number;
    protien: number;
    fats: number;

    // units: 'cup', 'tbs', 'tsp', 'unit', etc. 
    // calories: measured in calories
    // carbs: measured in grams
    // protien: measured in grams
    // fats: measured in grams 

    constructor (id: number, name: string, unit: string, calories: number, carbs: number, protien: number, fats: number) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.calories = calories;
        this.carbs = carbs;
        this.protien = protien;
        this.fats = fats;

    }
}