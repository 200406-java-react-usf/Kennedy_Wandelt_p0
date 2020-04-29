//creates an instance of each repo and service in order to create a pseudo singleton in which we can 
//just pass this instance to other files/methods

import {IngredientRepo} from '../repos/ingredient-repo';
import {RecipeRepo} from '../repos/recipe-repo';
import {MealplanRepo} from '../repos/mealplan-repo';
import {IngredientService} from '../services/ingredient-service';
import {RecipeService} from '../services/recipe-service';
import {MealplanService} from '../services/mealplan-service';

//creates an instance of repo then uses as an arg in service
const ingredientRepo = new IngredientRepo();
const ingredientService = new IngredientService(ingredientRepo);

const recipeRepo = new RecipeRepo();
const recipeService = new RecipeService(recipeRepo);

const mealplanRepo = new MealplanRepo();
const mealplanService = new MealplanService(mealplanRepo);

//
export default {
    ingredientService,
    recipeService,
    mealplanService
}