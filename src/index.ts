import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { IngredientRouter } from './routers/ingredient-router';
import { RecipeRouter } from '/routers/recipe-router';
import { MealplanRouter} from '/routers/mealplan-router';

const app = express();

app.listen(8080, () => {
    console.log('Application running and listening at: http://localhost:8080');
})