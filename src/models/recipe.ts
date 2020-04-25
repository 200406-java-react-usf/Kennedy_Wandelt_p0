import { Ingredient } from './ingredient'

export class Recipe {

    name: string;
    ingredients: Ingredient; 

    constructor(name: string, {...ingredients}: Ingredient) {
        this.name = name;
        this.ingredients = ingredients;
    }
}