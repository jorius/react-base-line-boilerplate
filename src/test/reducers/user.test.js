// @scripts
import { REMEMBER_ME, LOGIN, UPDATE_LANGUAGE } from '../../redux';
import { config } from '../../config';
import { userReducer } from '../../redux/reducers/user';

test('userReducer: LOGIN', () => {
    const action = {
        type: LOGIN,
        payload: config.mockData.userLoginSvcResponse
    };
    const newState = userReducer(config.initialState.user, action);
    const { token: authToken } = action.payload;

    const expectedState = {
        ...config.initialState.user,
        account: {
            authToken,
            email: 'admin@reactjs.com',
            name: 'Admin',
            permissions: ['MainMenu.Home']
        }
    };
    expect(newState).toEqual(expectedState);
});

test('userReducer: UPDATE_LANGUAGE', () => {
    const newLanguageCode = 'en';
    const action = {
        type: UPDATE_LANGUAGE,
        payload: newLanguageCode
    };
    const newState = userReducer(config.initialState.user, action);
    const expectedState = {
        ...config.initialState.user,
        languageCode: newLanguageCode
    };
    expect(newState).toEqual(expectedState);
});

test('userReducer: REMEMBER_ME', () => {
    const rememberMe = false;
    const action = {
        type: REMEMBER_ME,
        payload: rememberMe
    };
    const newState = userReducer(config.initialState.user, action);
    const expectedState = {
        ...config.initialState.user,
        rememberMe
    };
    expect(newState).toEqual(expectedState);
});

test('userReducer: DEFAULT', () => {
    const initialState = {
        account: {
            email: 'user@email.com',
            name: 'Admin',
            permissions: ['Permission1', 'Permission2']
        },
        languageCode: 'en',
        rememberMe: false
    };
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
});
