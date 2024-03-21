/*!
  * A library that shows the location of the ISS relative to the Earth. v1.0.2 (https://github.com/shvabuk/satellite-tracker)
  * Copyright 2024-2024 Ostap Shvab
  * Licensed under MIT (https://github.com/shvabuk/satellite-tracker/blob/master/LICENSE)
  * 
  */
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function isObject(value) {
    return typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null &&
        !(value instanceof RegExp);
}

function deepMerge(target, source) {
    for (const key in source) {
        if (isObject(target[key]) && isObject(source[key])) {
            target[key] = deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }

    return target;
}

exports.deepMerge = deepMerge;
