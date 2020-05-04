import { MealPlan } from '../models/mealplan';
import { MealPlanRepo } from '../repos/mealplan-repo';
import {
    BadRequestError,
    DataSaveError,
    DataNotFoundError
} from '../errors/errors';
import {
    isEmptyObject,
    isValidObject
} from '../util/validator';
import { Recipe } from '../models/recipe';

export class MealPlanService {
    constructor(private mealplanRepo: MealPlanRepo) {
        this.mealplanRepo = mealplanRepo;
    }

    async getAllPlans(): Promise<MealPlan[]>{

        let plans = await this.mealplanRepo.getAll();

        if(plans.length === 0) {
            throw new DataNotFoundError();
        }

        return(plans);
    }
    async getPlanByName(name: string): Promise<MealPlan>{

        let mp =  await this.mealplanRepo.getByName(name);

        if(!mp || isEmptyObject(mp)){
            throw new DataNotFoundError();
        }

        return(mp);
    }
    async addRecipeToPlan(mpName: string, recipeName: string, times: number): Promise<MealPlan> {

        let newPlan = await this.mealplanRepo.addRecipe(mpName, recipeName, times);
        
        //NEEDS VALIDATION
        return(newPlan);
    }

    async addNewPlan(mp: MealPlan): Promise<MealPlan> {
        
        let newPlan = await this.mealplanRepo.save(mp);
        

        //needs validation
        return(newPlan);
    }

    async deletePlanByName(planName: string): Promise<boolean> {

        let isDeleted = await this.mealplanRepo.deleteByName(planName);

        //validation
        return(isDeleted);
    }

    async updatePlan(planToUpdate: MealPlan): Promise<MealPlan> {

        let updatedPlan = await this.mealplanRepo.update(planToUpdate);

        //validation
        return(updatedPlan);
    }
}