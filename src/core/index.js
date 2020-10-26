// @packages
import WebFontLoader from 'webfontloader';

// @scripts
import { addActionOnWindowClose } from '../util';
import { addAjaxInterceptors } from './ajax-interceptors';
import { config } from '../config';
import { initializeGlobalUI } from './global-ui';
import { initializeReduxStore } from './redux-store';
import { initializeServiceMocker } from './service-mocker';

// @exports
export * from './constants';

const getEnvironment = () => ({
    isDevelopment: config.settings.environment.name === 'development',
    isLocal: config.settings.environment.name === 'local',
    isProduction: config.settings.environment.name === 'productoin',
    isQa: config.settings.environment.name === 'qa',
    isStaging: config.settings.environment.name === 'staging',
    isUnitTest: config.settings.environment.name === 'unitTest'
});

/**
 * @param {Object} store - The redux store.
 * @param {Object} globalUI - The globalUI object.
 */
const verifyAppVersion = (store, globalUI) => {
    if (store.getState().appVersion !== config.appVersion) {
        globalUI.logout();
    }
};

/**
 * @param {{isUnitTest: bool}} environment - The redux store.
 */
const loadFonts = (environment) => {
    if (!environment.isUnitTest) {
        WebFontLoader.load({
            google: {
                families: [
                    'Fira Sans',
                    'Material Icons',
                    'Montserrat',
                    'Roboto:300,400,500,700'
                ]
            },
            custom: {
                families: ['FontAwesome'],
                urls: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css']
            }
        });
    }
};

addActionOnWindowClose(() => {
    const {
        rememberMe
    } = global.core.store.getState().user;

    if (!rememberMe) {
        global.core.globalUI.logout();
    }
});

const initializeApp = () => {
    if (global.core) {
        return global.core;
    }

    const environment = getEnvironment();
    const store = initializeReduxStore(environment);
    const globalUI = initializeGlobalUI(environment, store);
    const serviceMocker = initializeServiceMocker();

    addAjaxInterceptors({ environment, globalUI, store });
    verifyAppVersion(store, globalUI);
    loadFonts(environment);
    config.applyLanguage(store.getState().user.languageCode);

    global.core = {
        environment,
        globalUI,
        serviceMocker,
        store
    };

    return global.core;
};

export const {
    environment,
    globalUI,
    serviceMocker,
    store
} = initializeApp();
