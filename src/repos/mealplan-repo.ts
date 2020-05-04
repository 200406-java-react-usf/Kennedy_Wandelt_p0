import { CrudRepository } from './crud-repo';
import { InternalServerError } from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { MealPlan } from '../models/mealplan';


export class MealPlanRepo implements CrudRepository<MealPlan> {
    
    async getAll(): Promise<MealPlan[]> {

        let client : PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = 'select * from mealplans'

            let rs = await client.query(sql);

            return(rs.rows);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async getByName(name: string): Promise<MealPlan> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `select * from mealplans where name = $1;`
            let rs = await client.query(sql, [name]);
            return rs.rows[0];
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async save(newPlan: MealPlan): Promise<MealPlan> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();

            let sql = `insert into mealplans (name, length) values ($1, $2) returning id`;

            let rs = await client.query(sql, [newPlan.name, +newPlan.length]);
            newPlan = rs.rows[0].id;
            return newPlan;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async addRecipe(mpName: string, recipeName: string, times: number): Promise<MealPlan> {

        let client : PoolClient;

        try{
            client = await connectionPool.connect();
            let mpId = await client.query(`select id from mealplans where name = $1`, [mpName]);
            let newRecipeId = await client.query(`select id from recipes where recipe = $1`, [recipeName]);
            let sql = `insert into plan_recipes (meal_plan_id, recipe_id, times) values ($1, $2, $3)`;
            let rs = await client.query(sql, [mpId.rows[0].id, newRecipeId.rows[0].id, times]);
            let returnPlan = await this.getByName(mpName);
            return returnPlan;
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
            let sql = `delete from mealplans where name = $1`;
            let rs = await client.query(sql, [name]);
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    async update(mpToUpdate: MealPlan): Promise<MealPlan> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = 'update mealplans set name = $1, length = $2 where id = $3';
            let rs = await client.query(sql, [mpToUpdate.name, +mpToUpdate.length, +mpToUpdate.id]);
            return rs.rows[0];
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
}