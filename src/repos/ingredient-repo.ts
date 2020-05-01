import { CrudRepository as CrudRepo } from './crud-repo'
import { Ingredient } from '../models/ingredient'
import ingredientData from '../data/ingredient-data'


export class IngredientRepo implements CrudRepo<Ingredient> {

    //gets all ingredients and returns values in promise
    getAll(): Promise<Ingredient[]> {

        return new Promise((resolve, reject) => {
        
            let ingredients: Ingredient[] = ingredientData;
            resolve(ingredients)
            
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

            

        })

    }

}