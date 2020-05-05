//rejections due to conflicts, objects that don't exist and other validation errors [REJECTS FOR EACH REPO METHOD]

import { Ingredient } from "../models/ingredient";
import {IngredientRepo} from "../repos/ingredient-repo"
import {
    BadRequestError,
    DataNotFoundError,
    DataSaveError
} from "../errors/errors"
import { 
    isEmptyObject, 
    isValidObject,
    isValidString
} from "../util/validator";

export class IngredientService {
    constructor(private ingredientRepo: IngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async getAllIngredients(): Promise<Ingredient[]> {

    //create array of ingredients and use repo logic to get the ingredients
        let ingredients = await this.ingredientRepo.getAll();

        if (ingredients.length == 0) {
            throw new DataNotFoundError();
        }
        return (ingredients);
    }

    async getIngredientByName(name: string): Promise<Ingredient> {

        if(!isValidString(name)) {
            throw new BadRequestError();
        }

        let ingredient = await this.ingredientRepo.getByName(name);

        if(isEmptyObject(ingredient)) {
            throw new DataNotFoundError();
        }

        return(ingredient);
    }

    async addNewIngredient(newIng: Ingredient): Promise<Ingredient> {

        try{
            console.log(newIng)

            if(!isValidObject(newIng,'id')) {
                throw new BadRequestError('Invalid property values found in provided user.');
            }

            let conflict = await this.getIngredientByName(newIng.name);

            if (conflict) {
                throw new DataSaveError('An ingredient by this name already exists.');
            }

            const persistedIng = await this.ingredientRepo.save(newIng);

            return persistedIng;
        } catch (e) {
            throw(e);
        }
    }

    async deleteIngredientByName(name: string): Promise<boolean> {

        if(name.length === 0) {
            throw new BadRequestError('Invalid name.');
        }

        const isDeleted = await this.ingredientRepo.deleteByName(name);
        return isDeleted;
    }

    async updateIngredient(ingredientToUpdate: Ingredient): Promise<Ingredient> {

        //validation

        const updatedIng = await this.ingredientRepo.updateIngredient(ingredientToUpdate);
        return updatedIng;
    }
}
