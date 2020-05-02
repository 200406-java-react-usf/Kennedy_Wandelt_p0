import { CrudRepository } from './crud-repo';
import { InternalServerError } from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { Recipe } from '../models/recipe'

export class RecipeRepo implements CrudRepository<Recipe> {
    
    async getAll(): Promise<Recipe[]> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = '';
            let rs = await client.query(sql);
            return rs.rows;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async getByName(): Promise<Recipe> {

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

    async save(newRecipe: Recipe): Promise<Recipe> {

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