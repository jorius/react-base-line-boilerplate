// @packages
import numeral from 'numeral';

/**
 * Gets a money representation of the passed-in number.
 * @param {string} currencyChar - The currency symbol. E.g.: "$".
 * @param {number} decimals - The number of decimals.
 * @param {string} decimalsChar - The char separator for decimals.
 * @param {number} number - The number to be formated.
 * @param {string} thousandsChar - The char separator for thousands.
 * @returns {string}
 */
export const toMoney = ({
    currencyChar = '$',
    decimals,
    decimalsChar = '.',
    number,
    thousandsChar = ','
}) =>
    numeral(number).format(
        `${currencyChar} 0${thousandsChar}0${decimalsChar}[${'0'.repeat(decimals)}]`
    );
