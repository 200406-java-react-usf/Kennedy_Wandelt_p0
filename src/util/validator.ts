import { Ingredient } from '../models/ingredient'
import { Recipe } from '../models/recipe'

export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
};

export const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    return obj && Object.keys(obj).every(key => {
        if (obj[key] === 0 || nullableProps.includes(key)) return true;
        return obj[key];
    });
};
export const isValidString = (...strs: string[]): boolean => {
    return (strs.filter(str => !str || typeof str !== 'string').length == 0);
};

export default {
    isEmptyObject,
    isValidObject,
    isValidString
}
