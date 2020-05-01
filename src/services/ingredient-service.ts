//rejections due to conflicts, objects that don't exist and other validation errors [REJECTS FOR EACH REPO METHOD]

import { Ingredient } from "../models/ingredient";
import {IngredientRepo} from "../repos/ingredient-repo"
import {
    BadRequestError,
    DataNotFoundError,
    DataSaveError
} from "../errors/errors"

export class IngredientService {
    constructor(private ingredientRepo: IngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    getAllUsers(): Promise<Ingredient[]> {
        
        return new Promise<Ingredient[]>(async (resolve, reject) => {

            //create array of ingredients and use repo logic to get the ingredients
            let ingredients: Ingredient[] = [];
            let result = await this.ingredientRepo.getAll();

            //populate ingredients array
            for (let ingredient of result) {
                ingredients.push({...ingredient});
            }

            if (ingredients.length == 0) {
                reject(new DataNotFoundError());
                return;
            }
        });
    }
}