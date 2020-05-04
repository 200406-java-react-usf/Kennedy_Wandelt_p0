import { Recipe } from './recipe'

export class MealPlan {

    id: number;
    name: string;
    length: number;

    constructor(id: number, name: string, length: number) {
        this.id = id;
        this.name = name;
        this.length = length;
    }
}