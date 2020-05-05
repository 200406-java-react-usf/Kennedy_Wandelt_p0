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
            throw new DataNotFoundError();
        }

        return(recipes);
    }
    async getRecipeByName(name: string): Promise<Recipe>{

        if(!isValidString(name)){
            throw new BadRequestError();
        }

        let recipe =  await this.recipeRepo.getByName(name);

        if(isEmptyObject(recipe)){
            throw new DataNotFoundError();
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
            throw new BadRequestError();
        }

        let conflict = await this.getRecipeByName(recipe.name);

        if (conflict) {
            throw new DataSaveError('An ingredient by this name already exists.');
        }

        let newRecipe = await this.recipeRepo.save(recipe);

        //needs validation
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
            throw new BadRequestError('Invalid Ingredient Object');
        }

        let updatedRecipe = await this.recipeRepo.update(recipeToUpdate);

        return(updatedRecipe);
    }
}