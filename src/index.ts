import express from 'express';
import { IngredientRouter } from './routers/ingredient-router';
//import { RecipeRouter } from '/routers/recipe-router';
//import { MealplanRouter} from '/routers/mealplan-router';

const app = express();

app.use('/ingredients', IngredientRouter);

app.listen(8080, () => {
    console.log('Application running and listening at: http://localhost:8080');
})