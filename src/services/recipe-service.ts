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

    /**
     * validates that recipe array from the recipe repo function is not empty
     */
    async getAllRecipes(): Promise<Recipe[]>{

        let recipes = await this.recipeRepo.getAll();

        if(recipes.length === 0) {
            throw new DataNotFoundError('No recipe data found at this time.');
        }

        return(recipes);
    }

    /**
     * validates that input name is a valid string and that recipe recieved from repo is not empty
     * @param name - name of recipe to retrieve
     */
    async getRecipeByName(name: string): Promise<Recipe>{

        if(!isValidString(name)){
            throw new BadRequestError('Invalid string given, unable to finish request');
        }

        let recipe =  await this.recipeRepo.getByName(name);

        if(isEmptyObject(recipe)){
            throw new DataNotFoundError('A recipe by this name was not found, please try another name');
        }

        return(recipe);
    }

    /**
     * validates that ingredient name, recipe name are valid strings
     * @param recipeName - name of recipe to be added to
     * @param ingName - name of ingredient to be added
     * @param ratio - amount of ingredient unit to be added
     */
    async addIngredientToRecipe(recipeName: string, ingName: string, ratio: number): Promise<boolean> {
        
        if(!isValidString(recipeName) || !isValidString(ingName)){
            throw new BadRequestError('Invalid string given, unable to finish request');
        }
        
        let newRecipe = await this.recipeRepo.addIngredient(recipeName, ingName, ratio);
    
        return(newRecipe);
    }

    /**
     * validates an input recipe to be added, validates that this recipe does not already exist
     * @param recipe - recipe object to be added
     */
    async addNewRecipe(recipe: Recipe): Promise<Recipe> {
        
    
        if(!isValidObject(recipe,'id', 'servings', 'totalCals', 'totalCarbs', 'totalProtien', 'totalFats')) {
            throw new BadRequestError('Invalid recipe object given (is name field empty?');
        }

        let conflict = await this.recipeRepo.getByName(recipe.name);

        if (!isEmptyObject(conflict)) {
            throw new DataSaveError('A recipe by this name already exists.');
        }

        let newRecipe = await this.recipeRepo.save(recipe);

        return(newRecipe);
    }

    /**
     * validates input name for objetc to be deleted
     * @param name - name of obejct to be deleted
     */
    async deleteRecipeByName(name: string): Promise<boolean> {


        if(!isValidString(name)) {
            throw new BadRequestError('Invalid name.');
        }

        let isDeleted = await this.recipeRepo.deleteByName(name);

        return(isDeleted);
    }

    /**
     * validates the recipe object givne that will be sent to update (id inclusive)
     * @param recipeToUpdate - Recipe object which will override current recipe of that id
     */
    async updateRecipe(recipeToUpdate: Recipe): Promise<Recipe> {

        if(!isValidObject(recipeToUpdate)) {
            throw new BadRequestError('Invalid Recipe Object');
        }

        let updatedRecipe = await this.recipeRepo.update(recipeToUpdate);

        return(updatedRecipe);
    }
}