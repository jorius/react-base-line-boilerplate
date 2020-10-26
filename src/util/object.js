// @packages
import _ from 'lodash';

/**
 * Makes a copy of an object including a list of properties.
 * @param {Object} source - The object to be copied.
 * @param {string[]} includedProperties - The properties to be included.
 * @returns {Object}
 */
export const copyObjIncludingProps = (source, includedProperties) =>
    Object.keys(source).reduce((copy, propName) => {
        if (includedProperties.includes(propName)) {
            copy[propName] = source[propName];
        }
        return copy;
    }, {});

/**
 * Makes a copy of an object converting all its props to camelCase recursively.
 * @param {Object} source - The object to be copied.
 * @returns {Object}
 */
export const copyObjInCamelCase = (source) => {
    if (Array.isArray(source)) {
        return source.map((item) => copyObjInCamelCase(item));
    } if (source !== null && source.constructor === Object) {
        return Object.keys(source).reduce((result, key) => ({
            ...result,
            [_.lowerFirst(key)]: copyObjInCamelCase(source[key])
        }), {});
    }
    return source;
};
