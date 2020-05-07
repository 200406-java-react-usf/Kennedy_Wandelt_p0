import { MealPlan } from '../models/mealplan';
import { MealPlanRepo } from '../repos/mealplan-repo';
import {
    BadRequestError,
    DataSaveError,
    DataNotFoundError
} from '../errors/errors';
import {
    isEmptyObject,
    isValidObject,
    isValidString
} from '../util/validator';
import { Recipe } from '../models/recipe';

export class MealPlanService {
    constructor(private mealplanRepo: MealPlanRepo) {
        this.mealplanRepo = mealplanRepo;
    }

    /**
     * validates that retrieved MealPlan array contains at leat one recipe
     */
    async getAllPlans(): Promise<MealPlan[]>{

        let plans = await this.mealplanRepo.getAll();

        if(plans.length === 0) {
            throw new DataNotFoundError('No mealplan data found at this time.');
        }

        return(plans);
    }

    /**
     * validates that given name of object to be retrieved is valid and that an object was retrieved
     * @param name - string contianing name of MealPlan to be retrieved
     */
    async getPlanByName(name: string): Promise<MealPlan>{
        if(!isValidString(name)) {
            throw new BadRequestError('Input is not a valid string, unable to process request');
        }
        let mp =  await this.mealplanRepo.getByName(name);

        if(isEmptyObject(mp)){
            throw new DataNotFoundError('No meal plan found with this name, please try again.');
        }

        return(mp);
    }

    /**
     * validates that mpName and recipeName are valid strings
     * @param mpName - name of meal plan to be added to
     * @param recipeName - name of recipe to be added
     * @param times - number of times the recipe is duplicated in the meal plan
     */
    async addRecipeToPlan(mpName: string, recipeName: string, times: number): Promise<Boolean> {

        if(!isValidString(mpName) || !isValidString(recipeName)) {
            throw new BadRequestError('Input is not a valid string, unable to process request');
        }
        let newPlan = await this.mealplanRepo.addRecipe(mpName, recipeName, times);
        
        return(newPlan);
    }

    /**
     * validates that MealPlan object to be added is valid and that there is no current MealPlan by that name
     * @param mp - MealPlan object to be added
     */
    async addNewPlan(mp: MealPlan): Promise<MealPlan> {

        if(!isValidObject(mp,'id')) {
            throw new BadRequestError('Invalid MealPlan object recieved (Are name and length fields empty?)');
        }

        let conflict = await this.mealplanRepo.getByName(mp.name);

        if (!isEmptyObject(conflict)) {
            throw new DataSaveError('A meal plan by this name already exists.');
        }
        
        let newPlan = await this.mealplanRepo.save(mp);
        
        return(newPlan);
    }


    /**
     * Validates that MealPlan name to be deleted is a valid string 
     * @param planName - name of plan to be deleted
     */
    async deletePlanByName(planName: string): Promise<boolean> {

        if(!isValidString(planName)) {
            throw new BadRequestError('Invalid name.');
        }

        let isDeleted = await this.mealplanRepo.deleteByName(planName);

        return(isDeleted);
    }

    /**
     * validates that MealPlan object to be updated is a valid object containing an id
     * @param planToUpdate - valid MealPlan object containing id to be updated
     */
    async updatePlan(planToUpdate: MealPlan): Promise<MealPlan> {
        if(!isValidObject(planToUpdate)) {
            throw new BadRequestError('Invalid MealPlan Object');
        }

        let updatedPlan = await this.mealplanRepo.update(planToUpdate);

        return(updatedPlan);
    }
}