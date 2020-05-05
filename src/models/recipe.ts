import { Ingredient } from './ingredient';

//recipes should be a single servings worth
export class Recipe {

    id: number;
    name: string;
    servings: number;
    totalCals: number;
    totalCarbs: number;
    totalProtien: number;
    totalFats: number;

    constructor(id: number, name: string, servings? : number, totalCals?: number, totalCarbs?: number, totalProtien?:number, totalFats?:number) {
        this.id = id;
        this.name = name;
        this.servings = servings;
        this.totalCals = totalCals;
        this.totalCarbs = totalCarbs;
        this.totalProtien = totalProtien;
        this.totalFats = totalFats;
    }
}
