
export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
};

export const isValidObject = (obj: Object, ...nullableProps: string[]) => {
    return obj && Object.keys(obj).every(key => {
        if (nullableProps.includes(key)) return true;
        return obj[key];
    });
};

export default {
    isEmptyObject,
    isValidObject
}
