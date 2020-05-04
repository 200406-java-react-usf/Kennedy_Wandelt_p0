import dotenv from 'dotenv';
import { Pool } from 'pg';
import express from 'express';
import { IngredientRouter } from './routers/ingredient-router';
import { RecipeRouter } from './routers/recipe-router';
import { MealPlanRouter} from './routers/mealplan-router';

//environment config
dotenv.config();

//database config
export const connectionPool: Pool = new Pool({
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    max: 5
});

//webserver config
const app = express();

app.use('/', express.json());
app.use('/ingredients', IngredientRouter);
app.use('/recipes', RecipeRouter);
app.use('/mealplans', MealPlanRouter);

app.listen(8080, () => {
    console.log('Application running and listening at: http://localhost:8080');
})