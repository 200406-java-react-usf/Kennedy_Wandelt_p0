import { Recipe } from '../models/recipe';
import { RecipeRepo } from '../repos/recipe-repo';
import {
    BadRequestError,
    DataSaveError,
    DataNotFoundError
} from '../errors/errors';
import {
    isEmptyObject,
    isValidObject,
    isValidString
} from '../util/validator';
import { Ingredient } from '../models/ingredient';

export class RecipeService {
    constructor(private recipeRepo: RecipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async getAllRecipes(): Promise<Recipe[]>{

        let recipes = await this.recipeRepo.getAll();

        if(recipes.length === 0) {
            throw new DataNotFoundError('No recipe data found at this time.');
        }

        return(recipes);
    }
    async getRecipeByName(name: string): Promise<Recipe>{

        if(!isValidString(name)){
            throw new BadRequestError('Invalid string given, unable to finish request');
        }

        let recipe =  await this.recipeRepo.getByName(name);

        console.log(recipe)

        if(isEmptyObject(recipe)){
            throw new DataNotFoundError('A recipe by this name was not found, please try another name');
        }

        return(recipe);
    }
    // async addIngredientToRecipe(recipeName: string, ingName: string, ratio: number): Promise<Recipe> {
    //     console.log(recipeName, ingName, ratio)
    //     let newRecipe = await this.recipeRepo.addIngredient(recipeName, ingName, ratio);
        
    //     //NEEDS VALIDATION
    //     return(newRecipe);
    // }

    async addNewRecipe(recipe: Recipe): Promise<Recipe> {
        
    
        if(!isValidObject(recipe,'id', 'servings', 'totalCals', 'totalCarbs', 'totalProtien', 'totalFats')) {
            throw new BadRequestError('Invalid recipe object given (is name field empty?');
        }

        let conflict = await this.getRecipeByName(recipe.name);

        if (conflict) {
            throw new DataSaveError('A recipe by this name already exists.');
        }

        let newRecipe = await this.recipeRepo.save(recipe);

        return(newRecipe);
    }

    async deleteRecipeByName(name: string): Promise<boolean> {


        if(!isValidString(name)) {
            throw new BadRequestError('Invalid name.');
        }

        let isDeleted = await this.recipeRepo.deleteByName(name);

        return(isDeleted);
    }

    async updateRecipe(recipeToUpdate: Recipe): Promise<Recipe> {

        if(!isValidObject(recipeToUpdate)) {
            throw new BadRequestError('Invalid Recipe Object');
        }

        let updatedRecipe = await this.recipeRepo.update(recipeToUpdate);

        return(updatedRecipe);
    }
}