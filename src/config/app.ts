//creates an instance of each repo and service in order to create a pseudo singleton in which we can 
//just pass this instance to other files/methods

import {IngredientRepo} from '../repos/ingredient-repo';
import {RecipeRepo} from '../repos/recipe-repo';
import {MealPlanRepo} from '../repos/mealplan-repo';
import {IngredientService} from '../services/ingredient-service';
import {RecipeService} from '../services/recipe-service';
import {MealPlanService} from '../services/mealplan-service';

//creates an instance of repo then uses as an arg in service
const ingredientRepo = new IngredientRepo();
const ingredientService = new IngredientService(ingredientRepo);

const recipeRepo = new RecipeRepo();
const recipeService = new RecipeService(recipeRepo);

const mealplanRepo = new MealPlanRepo();
const mealplanService = new MealPlanService(mealplanRepo);

//
export default {
    ingredientService,
    recipeService,
    mealplanService
}