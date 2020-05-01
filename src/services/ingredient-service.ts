//rejections due to conflicts, objects that don't exist and other validation errors [REJECTS FOR EACH REPO METHOD]

import { Ingredient } from "../models/ingredient";
import {IngredientRepo} from "../repos/ingredient-repo"
import {
    BadRequestError,
    DataNotFoundError,
    DataSaveError
} from "../errors/errors"
import { isEmptyObject } from "../util/validator";

export class IngredientService {
    constructor(private ingredientRepo: IngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async getAllIngredients(): Promise<Ingredient[]> {
        
        try {
        //create array of ingredients and use repo logic to get the ingredients
            let ingredients = await this.ingredientRepo.getAll();

            if (ingredients.length == 0) {
                throw new DataNotFoundError();
            }
            return (ingredients);
        } catch (e) {
            throw e;
        }
    }


    getIngredientByName(name: string): Promise<Ingredient> {

        return new Promise<Ingredient>(async (resolve, reject) => {
            let result = await this.ingredientRepo.getByName(name);

            if(isEmptyObject(result)) {
                reject(new DataNotFoundError());
                return;
            }
            resolve(result);
        })
    }
}