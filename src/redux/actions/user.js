// @packages
import axios from 'axios';

// @scripts
import { config } from '../../config';

// @constants
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REMEMBER_ME = 'REMEMBER_ME';
export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';

/**
 * @param {boolean} rememberMe
 */
export const rememberMe = (rememberMe) =>
    ({
        type: REMEMBER_ME,
        payload: rememberMe
    });

/**
 * @param {string} email
 * @param {string} password
 */
export const login = ({ email, password }) =>
    (dispatch) => axios
        .post(config.services.user.login, {
            params: {
                email,
                password
            }
        })
        .then((response) => {
            dispatch({
                type: LOGIN,
                payload: response
            });
        })
        .catch((error) => Promise.reject(error));

export const logout = () =>
    ({
        type: LOGOUT
    });

/**
 * @param {string} languageCode - E.g: 'en', 'es'.
 */
export const updateLanguage = (languageCode) =>
    ({
        type: UPDATE_LANGUAGE,
        payload: languageCode
    });
