import { Recipe } from './recipe'

export class MealPlan {

    meal1: Recipe;
    meal2: Recipe; 
    meal3: Recipe;
    meal4: Recipe;
    meal5: Recipe;
    meal6: Recipe;
    meal7: Recipe;

    constructor(meal1: Recipe, meal2: Recipe, meal3: Recipe, meal4: Recipe, meal5: Recipe, meal6: Recipe, meal7: Recipe) {
        this.meal1 = meal1;
        this.meal2 = meal2;
        this.meal3 = meal3;
        this.meal4 = meal4;
        this.meal5 = meal5;
        this.meal6 = meal6;
        this.meal7 = meal7;
    }
}