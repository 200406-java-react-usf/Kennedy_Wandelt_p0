
export function isEmptyObject<T>(obj: T) {
    return obj && Object.keys(obj).length === 0;
}

export default {
    isEmptyObject
}
