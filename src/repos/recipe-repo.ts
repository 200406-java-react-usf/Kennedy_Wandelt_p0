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
            let sql = `insert into recipes (recipe, servings) values ($1, $2)`;
            let rs = await client.query(sql, [newRecipe.name, newRecipe.servings]);
            return rs.rows[0];
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async addIngredient(newIngId: number, recipeId: number, ratio: number): Promise<Recipe> {
        let client : PoolClient;

        try{
            client = await connectionPool.connect();
            let sql =  `insert into recipe_measurements (ingredient_id, recipe_id, ratio) values ($1, $2, $3)`;
            let rs = await client.query(sql, [newIngId, recipeId, ratio]);
            return rs.rows[0];
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
            let sql = '';
            let rs = await client.query(sql);
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async update(): Promise<Recipe> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = '';
            let rs = await client.query(sql);
            return rs.rows[0];
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}