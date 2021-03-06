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

    /**
     * validates that at least on Ingredient object was retrieved 
     */
    async getAllIngredients(): Promise<Ingredient[]> {

    //create array of ingredients and use repo logic to get the ingredients
        let ingredients = await this.ingredientRepo.getAll();

        if (ingredients.length == 0) {
            throw new DataNotFoundError();
        }
        return (ingredients);
    }

    /**
     * validates that name of Ingredient to be retrieved is a valid string and that object received was not empty
     * @param name - name of Ingredient to be retrieved
     */
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

    /**
     * validates that the Ingredient to be added is valid and that there is no Ingredient by that name
     * @param newIng - Ingredient to be added
     */
    async addNewIngredient(newIng: Ingredient): Promise<Ingredient> {

        try{

            if(!isValidObject(newIng,'id')) {
                throw new BadRequestError('Invalid property values found in provided user.');
            }

            let conflict = await this.ingredientRepo.getByName(newIng.name);

            if (!isEmptyObject(conflict)) {
                throw new DataSaveError('An ingredient by this name already exists.');
            }

            const persistedIng = await this.ingredientRepo.save(newIng);

            return persistedIng;
        } catch (e) {
            throw(e);
        }
    }

    /**
     * validates that the name provided is a valid string
     * @param name - name of current Ingredient object to be deleted
     */
    async deleteIngredientByName(name: string): Promise<boolean> {

        if(!isValidString(name)) {
            throw new BadRequestError('Invalid name.');
        }

        const isDeleted = await this.ingredientRepo.deleteByName(name);
        return isDeleted;
    }

    /**
     * validates that the provided ingredient object is valid (including an id)
     * @param ingToUpdate - Ingredient object to override Ingredient object at provided id
     */
    async updateIngredient(ingToUpdate: Ingredient): Promise<Ingredient> {

        if(!isValidObject(ingToUpdate)) {
            throw new BadRequestError('Invalid Ingredient Object');
        }

        const updatedIng = await this.ingredientRepo.updateIngredient(ingToUpdate);
        return updatedIng;
    }
}
