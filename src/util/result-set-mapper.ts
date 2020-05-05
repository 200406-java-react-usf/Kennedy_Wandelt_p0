import { IngredientSchema } from './schemas';
import { RecipeSchema } from './schemas';
import { MealPlanSchema } from './schemas';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { MealPlan } from '../models/mealplan';

export function mapIngredientResultSet(resultSet: IngredientSchema): Ingredient {

    if(!resultSet) {
        return {} as Ingredient;
    }

    return new Ingredient(
        resultSet.id,
        resultSet.ingredient_name,
        resultSet.unit,
        resultSet.calories_per_unit,
        resultSet.carb_grams_per_unit,
        resultSet.protien_grams_per_unit,
        resultSet.fat_grams_per_unit
    )
};
export function mapRecipeResultSet(resultSet: RecipeSchema): Recipe {

    if(!resultSet) {
        return {} as Recipe;
    }

    return new Recipe(
        resultSet.id,
        resultSet.recipe_name,
        resultSet.servings,
        resultSet.total_cals_per_serving,
        resultSet.total_carbs_per_serving,
        resultSet.total_protien_per_serving,
        resultSet.total_fats_per_serving
    )
};
export function mapMealPlanResultSet(resultSet: MealPlanSchema): MealPlan {

    if(!resultSet) {
        return {} as MealPlan;
    }

    return new MealPlan(
        resultSet.id,
        resultSet.mealplan_name,
        resultSet.length

    )
};