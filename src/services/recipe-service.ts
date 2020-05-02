import { Recipe } from '../models/recipe';
import { RecipeRepo } from '../repos/recipe-repo';
import {
    BadRequestError,
    DataSaveError,
    DataNotFoundError
} from '../errors/errors';
import {
    isEmptyObject,
    isValidObject
} from '../util/validator';

export class RecipeService {
    constructor(private recipeRepo: RecipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async getAllRecipes(): Promise<Recipe[]>{

        let recipes = await this.recipeRepo.getAll();

        if(recipes.length = 0) {
            throw new DataNotFoundError();
        }

        return(recipes);
    }
}