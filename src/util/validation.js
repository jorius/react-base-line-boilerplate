// @scripts
import moment from 'moment';

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
export const NAME_REGEX = /^[A-zÀ-ú ]+$/;
export const PHONE_REGEX = /^(?:\((\+?\d+)?\)|\+?\d+) ?\d*(-?\d{2,3} ?){0,4}$/;
export const ZIP_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;

/**
 * Validates whether all child objects containing the property
 * "isValid" are set to true.
 * E.g.: isAllPropsValid({ usr: { isValid: true }, pwd: { isValid: true } });
 * @param {Object} obj - The object to be validated.
 * @returns {boolean}
 */
export const isAllPropsValid = (obj) =>
    Object.keys(obj).every((key) => {
        const item = obj[key];

        const valid = typeof item !== 'object'
            || !Object.prototype.hasOwnProperty.call(item, 'isValid')
            || (Object.prototype.hasOwnProperty.call(item, 'visible') && !item.visible)
            || item.isValid;

        return valid;
    });

/**
 * Validates whether a string is a valid number.
 * @param {string} text - The string to be validated.
 * @param {number} decimals - The max allowed decimals.
 * @param {boolean} allowNegative - Indicates whether negatives are allowed.
 * @returns {boolean}
 */
export const isNumber = (text, decimals = 0, allowNegative = false) => {
    let pattern = null;

    if (decimals === 0 && !allowNegative) {
        pattern = '^\\d+$';
    } else if (decimals === 0 && allowNegative) {
        pattern = '^-?\\d+$';
    } else if (decimals > 0 && !allowNegative) {
        pattern = `^\\d+(\\.\\d{1,${decimals}})?$`;
    } else {
        pattern = `^-?\\d+(\\.\\d{1,${decimals}})?$`;
    }

    return new RegExp(pattern).test(text);
};

/**
 * Validates whether a string is a valid date with the passed-in format.
 * @param {string} str - The string to be validated.
 * @param {?string} format - The date format.
 * @returns {boolean}
 */
export const isDate = (str, format = 'DD/MM/YYYY') =>
    moment(str, format, true).isValid();

/**
 * Validates whether a string is a valid email.
 * @param {string} str - The string to be validated.
 * @returns {boolean}
 */
export const isEmail = (str) =>
    EMAIL_REGEX.test(str);

/**
 * Validates whether a string is a valid name (only letters and spaces).
 * @param {string} str - The string to be validated.
 * @returns {boolean}
 */
export const isName = (str) =>
    NAME_REGEX.test(str);

/**
 * Validates whether a string is a valid phone.
 * @param {string} str - The string to be validated.
 * @returns {boolean}
 */
export const isPhone = (str) =>
    PHONE_REGEX.test(str);

/**
 * Validates whether a string is a valid zip code.
 * @param {string} str - The string to be validated.
 * @returns {boolean}
 */
export const isZip = (str) =>
    ZIP_REGEX.test(str);
