import {CrudRepository} from './crud-repo';
import { PoolClient } from 'pg';

export class RecipeRepo implements CrudRepository {
    
    async getall(): Promise<Recipe[]> {
        
        let client : PoolClient;
    }
}