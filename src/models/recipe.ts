import { Ingredient } from './ingredient';

//recipes should be a single servings worth
export class Recipe {

    id: number;
    recipe: string;
    servings: number;

    constructor(name: string, servings? : number) {
        this.recipe = name;
        this.servings = servings;
    }
}
