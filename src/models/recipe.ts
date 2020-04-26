import { Ingredient } from './ingredient';


export class Recipe {

    name: string;
    totalCal: number;
    totalCarbs: number;
    totalProtien: number;
    totalFats: number;
    ingredients: Ingredient[]; 

    constructor(name: string, ingredients: Ingredient[]) {
        this.name = name;
        this.ingredients = ingredients;

        let cals = 0;
        let carbs = 0;
        let protiens = 0;
        let fats = 0;

        for (let i = 0; i < ingredients.length; i++) {
            cals  = cals + ingredients[i].calories;
            carbs  = carbs + ingredients[i].carbs;
            protiens  = protiens + ingredients[i].protien;
            fats = fats + ingredients[i].fats;
        }
        
        this.totalCal = cals;
        this.totalCarbs = carbs;
        this.totalProtien = protiens;
        this.totalFats = fats;
    }
}
