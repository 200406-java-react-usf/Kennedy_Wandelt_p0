import { Recipe } from '../models/recipe';
import { RecipeRepo } from '../repos/recipe-repo';
import {
    BadRequestError,
    DataSaveError,
    DataNotFoundError
} from '../errors/errors';
import {
    isEmptyObject,
    isValidObject
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

        let recipe =  await this.recipeRepo.getByName(name);

        if(!recipe || isEmptyObject(recipe)){
            throw new DataNotFoundError();
        }

        return(recipe);
    }
    async addIngredientToRecipe(recipeName: string, ingName: string, ratio: number): Promise<Recipe> {
        console.log(recipeName, ingName, ratio)
        let newRecipe = await this.recipeRepo.addIngredient(recipeName, ingName, ratio);
        
        //NEEDS VALIDATION
        return(newRecipe);
    }

    async addNewRecipe(recipe: Recipe): Promise<Recipe> {
        
        let newRecipe = await this.recipeRepo.save(recipe);
        

        //needs validation
        return(newRecipe);
    }

    async deleteRecipeByName(recipeName: string): Promise<boolean> {

        let isDeleted = await this.recipeRepo.deleteByName(recipeName);

        //validation
        return(isDeleted);
    }

    async updateRecipe(recipeToUpdate: Recipe): Promise<Recipe> {

        let updatedRecipe = await this.recipeRepo.update(recipeToUpdate);

        //validation
        return(updatedRecipe);
    }
}