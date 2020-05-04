import url from 'url';
import express from 'express';
import AppConfig from '../config/app';

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
    resp.send();
});

IngredientRouter.post('', async (req, resp) => {
    console.log('POST REQUEST RECEIVED AT /ingredient');
    console.log(req.body);

    try {
        let newIng = await ingredientService.addNewIngredient(req.body);
        resp.status(201).json(newIng);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

IngredientRouter.delete('', async (req, resp) => {
    console.log('DELETE REQUEST RECEIVED AT /ingredient');
    console.log(req.body);

    try {
        let isDeleted = await ingredientService.deleteIngredientByName(req.body.name);
        resp.status(202).json(isDeleted);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

IngredientRouter.put('', async (req, resp) => {
    console.log('PUT REQUEST RECIEVED AT /ingredients');
    console.log(req.body);

    try{
        let updatedIng = await ingredientService.updateIngredient(req.body);
        resp.status(202).json(updatedIng);

    } catch (e) {
        resp.status(e.statusCode).json(e);    
    }
});


