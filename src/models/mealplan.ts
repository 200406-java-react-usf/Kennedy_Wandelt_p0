import { Recipe } from './recipe'

export class MealPlan {

    id: number;
    name: string;
    length: number;

    constructor(name: string, length: number) {
        this.name = name;
        this.length = length;
    }
}