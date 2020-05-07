import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'

/**
 * returns true if object is empty
 * @param obj - object to be checked 
 */
export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
};

/**
 * returns true if object values are valid given which properties are allowed to be null
 * @param obj - object to be checked
 * @param nullableProps - key values that are allowed to be null
 */
export const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    return obj && Object.keys(obj).every(key => {
        if (obj[key] === 0 || nullableProps.includes(key)) return true;
        return obj[key];
    });
};

/**
 * returns true if provided object is not empty and is of type string
 * @param strs - object to be checked
 */
export const isValidString = (...strs: string[]): boolean => {
    return (strs.filter(str => !str || typeof str !== 'string').length == 0);
};

export default {
    isEmptyObject,
    isValidObject,
    isValidString
}
