import url from 'url';
import express from 'express';
import AppConfig from '../config/app';


export const MealPlanRouter = express.Router();

const mpService = AppConfig.mealplanService;

MealPlanRouter.get('', async (req, resp) => {

    try {
        let payload = await mpService.getAllPlans();

        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();

});

MealPlanRouter.get('/:name', async (req, resp) => {
    const name = req.params.name;
    try {
        let payload = await mpService.getPlanByName(name);
        resp.status(200).json(payload);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

MealPlanRouter.post('', async (req, resp) => {
    console.log('POST REQUEST RECIEVED AT /mealplans');
    console.log(req.body);


    try {
        let newPlan = await mpService.addNewPlan(req.body);
        resp.status(201).json(newPlan);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

MealPlanRouter.post('/:name', async (req, resp) => {
    const name = req.params.name;
    console.log(`POST REQUEST RECIEVED AT /mealplans/${name}`);
    console.log(req.body);

    try {
        let addedRecipe = await mpService.addRecipeToPlan(name, req.body.recipe_name, +req.body.times);
        resp.status(201).json(addedRecipe);
    } catch(e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

MealPlanRouter.delete('', async (req, resp) => {
    console.log('DELETE REQUEST RECIEVED AT /mealplans');
    console.log(req.body);

    try{
        let planToDelete = await mpService.deletePlanByName(req.body.name);
        resp.status(202).json(planToDelete);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});

MealPlanRouter.put('', async (req, resp) => {
    console.log('UPDATE REQUEST RECIEVED AT /mealplans');
    console.log(req.body);

    try{
        let updatedPlan = await mpService.updatePlan(req.body);
        resp.status(202).json(updatedPlan);
    } catch (e) {
        resp.status(e.statusCode).json(e);
    }
    resp.send();
});