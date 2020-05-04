import { CrudRepository } from './crud-repo';
import { InternalServerError } from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { Recipe } from '../models/recipe';


export class RecipeRepo implements CrudRepository<Recipe> {
    
    async getAll(): Promise<Recipe[]> {

        let client : PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = 'select * from recipes'

            let rs = await client.query(sql);

            return(rs.rows);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async getByName(name: string): Promise<Recipe> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `select * from recipes where recipe = $1;`
            let rs = await client.query(sql, [name]);
            return rs.rows[0];
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async save(newRecipe: Recipe): Promise<Recipe> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();

            let sql = `insert into recipes (recipe, servings) values ($1, $2) returning id`;

            let rs = await client.query(sql, [newRecipe.recipe, +newRecipe.servings]);
            newRecipe = rs.rows[0].id;
            return newRecipe;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async addIngredient(recipeName: string, ingName: string, ratio: number): Promise<Recipe> {

        let client : PoolClient;

        try{
            client = await connectionPool.connect();
            let recipeId = await client.query(`select id from recipes where recipe = $1`, [recipeName]);
            let newIngId = await client.query(`select id from ingredients where ingredient = $1`, [ingName]);
            let sql = `insert into recipe_measurements (ingredient_id, recipe_id, ratio) values ($1, $2, $3)`;
            let rs = await client.query(sql, [newIngId.rows[0].id, recipeId.rows[0].id, ratio]);
            let returnRecipe = await this.getByName(recipeName);
            return returnRecipe;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async deleteByName(name: string): Promise<boolean> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `delete from recipes where recipe = $1`;
            let rs = await client.query(sql, [name]);
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async update(recipeToUpdate: Recipe): Promise<Recipe> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = 'update recipes set recipe = $1, servings = $2 where id = $3';
            let rs = await client.query(sql, [recipeToUpdate.recipe, +recipeToUpdate.servings, +recipeToUpdate.id]);
            return rs.rows[0];
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}