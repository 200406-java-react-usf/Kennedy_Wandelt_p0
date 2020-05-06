import { CrudRepository } from './crud-repo';
import { InternalServerError } from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { MealPlan } from '../models/mealplan';
import { mapMealPlanResultSet } from '../util/result-set-mapper';


export class MealPlanRepo implements CrudRepository<MealPlan> {
    
    async getAll(): Promise<MealPlan[]> {

        let client : PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = 'select * from meal_plans';

            let rs = await client.query(sql);

            return(rs.rows.map(mapMealPlanResultSet));
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
            let sql = `select * from meal_plans where mealplan_name = $1;`
            let rs = await client.query(sql, [name]);
            return mapMealPlanResultSet(rs.rows[0]);
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

            let sql = `insert into meal_plans (mealplan_name, length) values ($1, $2) returning id`;

            let rs = await client.query(sql, [newPlan.name, +newPlan.length]);
            newPlan.id = rs.rows[0].id;
            return newPlan;
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
            let sql = `delete from meal_plans where mealplan_name = $1`;
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
            let sql = 'update meal_plans set mealplan_name = $1, length = $2 where id = $3';
            let rs = await client.query(sql, [mpToUpdate.name, +mpToUpdate.length, +mpToUpdate.id]);
            return mapMealPlanResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async addRecipe(mealplanName: string, recipeName: string, times: number): Promise<boolean> {

        let client : PoolClient;

        try{
            client = await connectionPool.connect();
            let recipeId = await client.query('select id from recipes where recipe_name = $1;', [recipeName]);
            console.log(recipeId)
            let planId = await client.query('select id from mealplans where mealplan_name = $1;', [mealplanName]);
            console.log(planId)
            let sql = `insert into recipe_measurements (ingredient_id, recipe_id, ratio) values ($1, $2, $3);`;
            console.log(sql)
            let rs = await client.query(sql, [planId, recipeId, times]);
            console.log(rs)
            //let returnRecipe = await this.getByName(recipeName);

            return true;
        } catch (e) {
            console.log(e)
            throw new InternalServerError('add plan Recipe');
        } finally {
            client && client.release();
        }
    }
}