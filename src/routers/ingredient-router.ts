import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
import { ParsedUrlQuery } from 'querystring';

export const IngredientRouter = express.Router();

const ingredientService = AppConfig.ingredientService;

IngredientRouter.get('', async (req, resp) => {

    try {
        let payload = await ingredientService.getAllIngredients();
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

IngredientRouter.get('/:name', async (req, resp) => {
    const name = req.params.name;
    try {
        let payload = await ingredientService.getIngredientByName(name);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send()
});
