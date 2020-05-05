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

    async getAllPlans(): Promise<MealPlan[]>{

        let plans = await this.mealplanRepo.getAll();

        if(plans.length === 0) {
            throw new DataNotFoundError('No mealplan data found at this time.');
        }

        return(plans);
    }
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

    async addRecipeToPlan(mpName: string, recipeName: string, times: number): Promise<MealPlan> {

        let newPlan = await this.mealplanRepo.addRecipe(mpName, recipeName, times);
        
        //NEEDS VALIDATION
        return(newPlan);
    }

    async addNewPlan(mp: MealPlan): Promise<MealPlan> {

        if(!isValidObject(mp,'id')) {
            throw new BadRequestError('Invalid MealPlan object recieved (Are name and length fields empty?)');
        }

        let conflict = await this.mealplanRepo.getByName(mp.name);

        if (conflict) {
            throw new DataSaveError('A meal plan by this name already exists.');
        }
        
        let newPlan = await this.mealplanRepo.save(mp);
        
        return(newPlan);
    }

    async deletePlanByName(planName: string): Promise<boolean> {

        if(!isValidString(planName)) {
            throw new BadRequestError('Invalid name.');
        }

        let isDeleted = await this.mealplanRepo.deleteByName(planName);

        return(isDeleted);
    }

    async updatePlan(planToUpdate: MealPlan): Promise<MealPlan> {
        if(!isValidObject(planToUpdate)) {
            throw new BadRequestError('Invalid MealPlan Object');
        }

        let updatedPlan = await this.mealplanRepo.update(planToUpdate);

        return(updatedPlan);
    }
}