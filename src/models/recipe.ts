import { Ingredient } from './ingredient';

//recipes should be a single servings worth
export class Recipe {

    id: number;
    recipe: string;
    servings: number;

    constructor(id: number, name: string, servings? : number) {
        this.id = id;
        this.recipe = name;
        this.servings = servings;
    }
}
