import { CrudRepository } from './crud-repo';
import { InternalServerError } from '../errors/errors';
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { Recipe } from '../models/recipe';
import { mapRecipeResultSet } from '../util/result-set-mapper';


export class RecipeRepo implements CrudRepository<Recipe> {
    
    /**
     * retrieves all recipe objects from th recipes table of the data base
     * 
     */
    async getAll(): Promise<Recipe[]> {

        let client : PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = 'select * from recipes'

            let rs = await client.query(sql);

            return(rs.rows.map(mapRecipeResultSet));
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    /**
     * retrieves a single rcipe object based on the name value parameter
     * @param name - a string containing a name value of a recipe
     */
    async getByName(name: string): Promise<Recipe> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `select * from recipes where recipe_name = $1;`
            let rs = await client.query(sql, [name]);
            return mapRecipeResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    /**
     *  adds a single recipe onject to the recipes database
     * @param newRecipe - a recipe object which will be added to the database
     */
    async save(newRecipe: Recipe): Promise<Recipe> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();

            let sql = `insert into recipes (recipe_name, servings) values ($1, $2) returning id`;

            let rs = await client.query(sql, [newRecipe.name, +newRecipe.servings]);
            newRecipe.id = rs.rows[0].id;
            return newRecipe;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    /**
     * delted a recipe from recipes table of database given the recipe name as an argument
     * @param name - a string containing a name of a recipe object to be deleted
     */
    async deleteByName(name: string): Promise<boolean> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `delete from recipes where recipe_name = $1`;
            let rs = await client.query(sql, [name]);
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    /**
     * updates a recipe give the entire recipe object, id is not updatable
     * @param recipeToUpdate - a full recipe object including id and all values
     */
    async update(recipeToUpdate: Recipe): Promise<Recipe> {

        let client : PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = 'update recipes set recipe_name = $1, servings = $2 where id = $3';
            let rs = await client.query(sql, [recipeToUpdate.name, +recipeToUpdate.servings, +recipeToUpdate.id]);
            return mapRecipeResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }

    /**
     * adds an ingredient and recipe pair to recipe-ingredient junction table
     * @param recipeName - name of recipe whihc ingredient is added to
     * @param ingName - name of ingredient to add
     * @param ratio - fraction of units of ingredient to add
     */
    async addIngredient(recipeName: string, ingName: string, ratio: number): Promise<boolean> {

        let client : PoolClient;

        try{
            client = await connectionPool.connect();
            let recipeId = await client.query('select id from recipes where recipe_name = $1;', [recipeName]);
            console.log(recipeId)
            let newIngId = await client.query('select id from ingredients where ingredient_name = $1;', [ingName]);
            console.log(newIngId)
            let sql = `insert into recipe_measurements (ingredient_id, recipe_id, ratio) values ($1, $2, $3);`;
            console.log(sql)
            let rs = await client.query(sql, [newIngId, recipeId, ratio]);
            console.log(rs)
            //let returnRecipe = await this.getByName(recipeName);

            return true;
        } catch (e) {
            console.log(e)
            throw new InternalServerError('add Ingredient Recipe');
        } finally {
            client && client.release();
        }
    }
}