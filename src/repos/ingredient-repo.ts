import { CrudRepository as CrudRepo } from './crud-repo';
import { Ingredient } from '../models/ingredient';
import ingredientData from '../data/ingredient-data';
import {
    BadRequestError,
    DataNotFoundError,
    DataSaveError,
    InternalServerError
} from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';


export class IngredientRepo implements CrudRepo<Ingredient> {

    //gets all ingredients and returns values in promise
    async getAll(): Promise<Ingredient[]> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = 'select * from ingredients';
            let rs = await client.query(sql);
            return rs.rows;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async getByName(name: string): Promise<Ingredient> {

    let client : PoolClient;
        try{
            client = await connectionPool.connect();
            let sql = `select * from ingredients where name = ${name}`;
            let rs = await client.query(sql);
            return rs.rows;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }  
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