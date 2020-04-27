import { CrudRepository as CrudRepo } from './crud-repo'
import { Ingredient } from '../models/ingredient'
import ingredientData from '../data/ingredient-data'
export class IngredientRepo implements CrudRepo<Ingredient> {

    private static instance: IngredientRepo;

    private constructor() {}

    static getInstance(): IngredientRepo {
        return !IngredientRepo.instance ? IngredientRepo.instance = new IngredientRepo() : IngredientRepo.instance;
    }

    getAll(): Promise<Ingredient[]> {

        return new Promise((resolve, reject) => {
        
            let ingredients: Ingredient[] = [];

            if(ingredientData.length === 0) {
                reject(new DataNotFoundError());
                return;
            }

            for(let ingredient of ingredientData) {
                ingredients.push(ingredient);
            }
        })
    }

    getByName(name: string): Promise<Ingredient> {

        return new Promise((resolve, reject) => {

            const ing = {...ingredientData.filter(ing => ing.name === name)[0]};

            if(Object.keys(ing).length === 0) {
                reject(new DataNotFoundError());
                return
            }

            resolve(ing);
            
        })
    }

    save(newIng: Ingredient): Promise<Ingredient> {

        return new Promise<Ingredient>((resolve, reject) => {

            // NEEDS VALIDATION
            let conflict = ingredientData.filter(ing => ing.name == newIng.name).pop();

            if(conflict) {
                reject(new DataSaveError('This ingredient already exists.'));
                return;
            }

            ingredientData.push(newIng);

            resolve(newIng);
        });
    }

    deleteByName(name: string): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            for(let i = 0; i < ingredientData.length; i++) {
                
            }

        })

    }

}