// @packages
import { combineReducers } from 'redux';

// @scripts
import { LOGIN, REMEMBER_ME, UPDATE_LANGUAGE } from '../actions';
import { config } from '../../config';

/**
 * @returns {{
 *   authToken: string,
 *   email: string,
 *   name: string,
 *   permissions: string[]
 * }}
 */
const accountReducer = (
    state = config.initialState.user.account, action
) => {
    switch (action.type) {
        case LOGIN:
            const { token: authToken } = action.payload;

            return {
                authToken,
                email: 'admin@reactjs.com',
                name: 'Admin',
                permissions: ['MainMenu.Home']
            };
        default:
            return state;
    }
};

/**
 * @returns {string}
 */
const languageCodeReducer = (
    state = config.initialState.user.languageCode, action
) => {
    switch (action.type) {
        case UPDATE_LANGUAGE:
            return action.payload;
        default:
            return state;
    }
};

/**
 * @returns {boolean}
 */
const rememberMeReducer = (
    state = config.initialState.user.rememberMe, action
) => {
    switch (action.type) {
        case REMEMBER_ME:
            return action.payload;
        default:
            return state;
    }
};

export const userReducer = combineReducers({
    account: accountReducer,
    languageCode: languageCodeReducer,
    rememberMe: rememberMeReducer
});
