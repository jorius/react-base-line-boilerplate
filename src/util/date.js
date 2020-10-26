// @packages
import moment from 'moment';

/**
 * This is the minimun representable date value.
 */
export const MIN_DATE_VALUE = new Date(-8640000000000000);

/**
 * This is the maximun representable date value.
 */
export const MAX_DATE_VALUE = new Date(8640000000000000);

/**
 * Gets a short date representation of the given date.
 * @param {Date} date
 * @returns {string}
 * */
export const toShortDateString = (date) =>
    moment(date).format('L');

/**
 * Removes the time part of the given date.
 * @param {Date} date
 * @returns {Date}
 */
export const removeTime = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());
