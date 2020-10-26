// @packages
import stringHtmlParser from 'html-react-parser';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Formats a string with the passed-in arguments.
 * E.g.: format("Hello {0} {1}", "Pepito", "Pérez")
 * @param {string} str - The string to be formated.
 * @param {object|object[]} args - Args to be replaced into the string.
 * @returns {string}
 */
export const format = (str, ...args) => {
    let formatedStr = str;
    args.forEach((value, index) => {
        while (formatedStr.indexOf(`{${index}}`) >= 0) {
            if (typeof value === 'string') {
                formatedStr = formatedStr.replace(`{${index}}`, value);
            } else {
                formatedStr = formatedStr.replace(`{${index}}`, renderToStaticMarkup(value));
            }
        }
    });

    return stringHtmlParser(formatedStr);
};

/**
 * Gets the capitalized name initials from the passed-in string..
 * E.g.: Carlos => C
 * E.g.: Carlos Gonzalez => CG
 * E.g.: Carlos Alejandro Gonzalez = CG
 * E.g.: Carlos ALejandro Gonzalez Arboleda => CG
 * @param {string} str - The string to get the capitalized name initials.
 * @returns {string}
 */
export const getNameInitials = (str) => {
    if (!str) {
        return '';
    }

    const tokens = str.split(' ');
    let initials = tokens[0].substring(0, 1).toUpperCase();

    if (tokens.length === 2) {
        initials += tokens[1].substring(0, 1).toUpperCase();
    } else if (tokens.length >= 3) {
        initials += tokens[2].substring(0, 1).toUpperCase();
    }

    return initials;
};
