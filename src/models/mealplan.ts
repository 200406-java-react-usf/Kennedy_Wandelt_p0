import { Recipe } from './recipe'

export class MealPlan {

    meals: Recipe[]; 

    constructor(meals: Recipe[]) {
        this.meals = meals;
    }
}