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