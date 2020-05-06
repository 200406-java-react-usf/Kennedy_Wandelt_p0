# Kennedy_Wandelt_p0
Kennedy Wandelt project 0

A weekly meal plan maker -- LETTUCE PLAN

-Ingredients
-Recipes
-Mealplans

My project 0 has 3 entities. ingredients recipes and mealplans. Ingredients have calorie and macro ingromation about a specific ingredient to be used in recipe. Recipes are an aggregate of ingredients which contains calculated nutritional data based on the ingredients added to the recipe itself. Meal plans are an aggregate of recipes which only contains the name and length of the mealplan. Both ingredient-recipe and recipe-mealplan have many-many relationships so you cna put a sinlge ingredient into many different recipes and similarly with the recips into meal plans. CRUD methods are available for each entity.

![ERD](https://github.com/200406-java-react-usf/Kennedy_Wandelt_p0/blob/master/img/ERD.png)

