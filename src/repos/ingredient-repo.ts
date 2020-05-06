import { CrudRepository as CrudRepo } from './crud-repo';
import { Ingredient } from '../models/ingredient';
import {
    BadRequestError,
    DataNotFoundError,
    DataSaveError,
    InternalServerError
} from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapIngredientResultSet } from '../util/result-set-mapper';


export class IngredientRepo implements CrudRepo<Ingredient> {

    async getAll(): Promise<Ingredient[]> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = 'select * from ingredients';
            let rs = await client.query(sql);
            return rs.rows.map(mapIngredientResultSet);
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
            let sql = `select * from ingredients where ingredient_name = $1`;
            let rs = await client.query(sql, [name]);
            return mapIngredientResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }  
    }

    async save(newIng: Ingredient): Promise<Ingredient> {

        let client : PoolClient;

        try {

            client = await connectionPool.connect();

            let sql = `insert into ingredients (ingredient_name, unit, calories_per_unit, carb_grams_per_unit, protien_grams_per_unit, fat_grams_per_unit) values ($1, $2, $3, $4, $5, $6) returning id`;  
        
            let rs = await client.query(sql, [newIng.name, newIng.unit, +newIng.calories, +newIng.carbs, +newIng.protien, +newIng.fats]);

            newIng.id = rs.rows[0].id;
            return newIng;

        } catch (e) {
            console.log(e)
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async deleteByName(name: string): Promise<boolean> {

        let client : PoolClient;

        try {

            client = await connectionPool.connect();

            let sql = `delete from ingredients where ingredient_name = $1`;
            let rs = await client.query(sql, [name]);

            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async updateIngredient(ing: Ingredient): Promise<Ingredient> {

        let client : PoolClient;
        try {

            client = await connectionPool.connect();

            let sql = `update ingredients set ingredient_name = $1, unit = $2, calories_per_unit = $3, carb_grams_per_unit = $4, protien_grams_per_unit = $5, fat_grams_per_unit = $6 where id = $7`
            let rs = await client.query(sql, [ing.name, ing.unit, +ing.calories, +ing.carbs, +ing.protien, +ing.fats, +ing.id])

            return(mapIngredientResultSet(rs.rows[0]));

        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}
