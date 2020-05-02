import { Ingredient } from './ingredient';

//recipes should be a single servings worth
export class Recipe {

    id: number;
    name: string;
    servings: number;

    constructor(name: string, servings? : number) {
        this.name = name;
        this.servings = servings;
    }
}
