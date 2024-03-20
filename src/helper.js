function isObject(value) {
    return typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null &&
        !(value instanceof RegExp);
}

export function deepMerge(target, source) {
    for (const key in source) {
        if (isObject(target[key]) && isObject(source[key])) {
            target[key] = deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }

    return target;
}