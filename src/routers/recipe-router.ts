import url from 'url';
import express from 'express';
import AppConfig from '../config/app';


export const RecipeRouter = express.Router();

const recipeService = AppConfig.recipeService;

RecipeRouter.get('', async (req, resp) => {

    try {
        let payload = await recipeService.getAllRecipes();

        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();

});

RecipeRouter.get('/:name', async (req, resp) => {
    const name = req.params.name;
    try {
        let payload = await recipeService.getRecipeByName(name);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

RecipeRouter.post('', async (req, resp) => {
    console.log('POST REQUEST RECIEVED AT /recipes');
    console.log(req.body);


    try {
        let newRecipe = await recipeService.addNewRecipe(req.body);
        resp.status(201).json(newRecipe);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

RecipeRouter.post('/:name', async (req, resp) => {
    const name = req.params.name;
    console.log(`POST REQUEST RECIEVED AT /recipes/${name}`);
    console.log(req.body);

    try {
        let addedIngredient = await recipeService.addIngredientToRecipe(name, req.body.ingredient, +req.body.ratio);
        resp.status(201).json(addedIngredient);
    } catch(e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});