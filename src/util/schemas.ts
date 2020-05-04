export interface IngredientSchema {
    id: number,
    ingredient_name: string,
    unit: string,
    calories_per_unit: number,
    carb_grams_per_unit: number,
    protien_grams_per_unit: number,
    fat_grams_per_unit: number,
}

export interface RecipeSchema {
    id: number,
    recipe_name: string,
    servings: number,
    total_cals_per_serving: number,
    total_carbs_per_serving: number,
    total_protien_per_serving: number,
    total_fats_per_serving: number
}

export interface MealPlanSchema {
    id: number,
    mealplan_name: string,
    length: number
}