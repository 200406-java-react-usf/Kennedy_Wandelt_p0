import { CrudRepository } from './crud-repo';
import { InternalServerError } from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';

export class RecipeRepo implements CrudRepository<Recipe> {
    
    async getAll(): Promise<Recipe[]> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = 'select * from recipes';
            let rs = await client.query(sql);
            return rs.rows;
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
            let sql = `Select * from recipes where name = $1`;
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
            let sql = `insert into recipes (name, servings)
                        insert into recipe`;
            let rs = await client.query(sql);
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