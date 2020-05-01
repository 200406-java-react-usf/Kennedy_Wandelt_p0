import { Recipe } from '../models/recipe';
import ingredients from './ingredient-data';

export default [
    new Recipe('pb and j', [ingredients[16], ingredients[16], ingredients[17], ingredients[18]]),
    new Recipe('shrimp scampi', [ingredients[27], ingredients[27], ingredients[26], ingredients[25], ingredients[24], ingredients[24], ingredients[24], ingredients[10], ingredients[9], ingredients[9]]),
    new Recipe('pot roast', [ingredients[21], ingredients[22], ingredients[23], ingredients[19], ingredients[19], ingredients[19]]),
    new Recipe('carne asada street taco (3)', [ingredients[19], ingredients[19], ingredients[19], ingredients[20], ingredients[20], ingredients[20], ingredients[4], ingredients[5], ingredients[5]]),
    new Recipe('couscous, fish, and asparagus', [ingredients[6], ingredients[7], ingredients[8], ingredients[9], ingredients[9], ingredients[10], ingredients[11], ingredients[12]]),
    new Recipe('avacado and chicken taco (3)', [ingredients[0], ingredients[0], ingredients[0], ingredients[1], ingredients[1], ingredients[1], ingredients[2], ingredients[3], ingredients[4], ingredients[5]]),
    new Recipe('butter chicken', [ingredients[13], ingredients[14], ingredients[15], ingredients[4], ingredients[2], ingredients[2], ingredients[2], ingredients[5]])

]