/**
 * Join all configuration files in a unique config object which
 * can be used across the app.
 */

// @packages
import merge from 'deepmerge';
import moment from 'moment';

// @json
import appData from '../../package.json';
import appRoutes from './routes/routes.json';
import envDevelopment from './settings/env-development.json';
import envLocal from './settings/env-local.json';
import envProduction from './settings/env-production.json';
import envQA from './settings/env-qa.json';
import envStaging from './settings/env-staging.json';
import envUnitTest from './settings/env-unit-test.json';
import globals from './settings/globals.json';
import initialState from './state/initial-state.json';
import masterData from './data/master-data.json';
import mockData from './data/mock';
import profileMenu from './menu/profile-menu.json';
import services from './routes/services.json';

// @scripts
import { getDefaultLanguage, getNavigatorLanguage } from '../util';
import { lang } from '../resources';

// @constants
const BASE_URL_PLACEHOLDER_FOR_SERVICES = '{root}';
/**
 * @returns {Object}
 */
const getInitialState = () => {
    initialState.appVersion = appData.version;

    initialState.languageCode = getDefaultLanguage({
        navigatorLanguage: getNavigatorLanguage(),
        supportedLanguages: masterData.languages,
        valueOnError: initialState.user.languageCode
    });

    return initialState;
};

/**
 * @return {Object}
 */
const getSettings = () => {
    switch (process.env.REACT_APP_ENV) {
        case 'development':
            return merge(globals, envDevelopment);
        case 'local':
            return merge(globals, envLocal);
        case 'production':
            return merge(globals, envProduction);
        case 'qa':
            return merge(globals, envQA);
        case 'staging':
            return merge(globals, envStaging);
        case 'unitTest':
            return merge(globals, envUnitTest);
        default:
            return globals;
    }
};

/**
 * @param {string} rootUrl - The base service url for the current environment.
 * @returns {Object}
 */
const getServices = (rootUrl) =>
    JSON.parse(
        JSON.stringify(services)
            .replace(
                new RegExp(BASE_URL_PLACEHOLDER_FOR_SERVICES, 'g'),
                rootUrl
            )
    );

/**
 * @param {{
 *  routes: Array - ,
 *  routeKeyProp: string - ,
 *  routeValProp: string -
 * }}  -
 * @returns {Object}
 */
export const getRouteBy = ({
    routes,
    routeKeyProp,
    routeValProp
}) =>
    routes.find((route) => {
        if (route[routeKeyProp] === routeValProp) {
            return route;
        }

        if (Array.isArray(route.views) && route.views.length) {
            return getRouteBy({
                routes: route.views,
                routeKeyProp,
                routeValProp
            });
        }

        return undefined;
    });

/**
 * @param {string} languageCode - E.g: 'en', 'es'.
 */
function applyLanguage(languageCode) {
    const config = this;

    if (config.currentLanguageCode === languageCode) {
        return;
    }

    moment.locale(languageCode);
    config.currentLanguageCode = languageCode;
    config.text = lang[languageCode];

    config.masterData = {};

    Object.keys(masterData).forEach((key) => {
        config.masterData[key] = masterData[key].map((masterItem) => ({
            ...masterItem,
            description:
                (
                    Boolean(config.text.masterData[key])
                    && config.text.masterData[key][masterItem.id]
                )
                || masterItem.description
        }));
    });

    const buildMenu = (mainMenu) =>
        mainMenu.map((menuItem) => {
            if (Array.isArray(menuItem.subMenuItems) && menuItem.subMenuItems.length) {
                menuItem.subMenuItems = buildMenu(menuItem.subMenuItems);
            }

            const route = getRouteBy({
                routeKeyProp: 'name',
                routeValProp: menuItem.name,
                routes: config.routes
            });

            return {
                ...menuItem,
                description: config.text.menu[menuItem.name],
                permission: route && route.permission,
                url: route && route.url
            };
        });

    config.profileMenu = buildMenu(profileMenu);
}

const buildRoutes = () => appRoutes.map((route) => {
    if (Array.isArray(route.views) && route.views.length) {
        const views = route.views.map((viewPath) => ({
            ...viewPath,
            container: route.container,
            url: route.url + viewPath.url
        }));

        return {
            ...route,
            views
        };
    }

    return { ...route };
}).reduce((newRoutes, currentRoute) => {
    if (Object.prototype.hasOwnProperty.call(currentRoute, 'views')) {
        const viewRoutes = [...currentRoute.views];
        return [...newRoutes, ...viewRoutes, currentRoute];
    }

    return [...newRoutes, currentRoute];
}, []);

/**
 * @returns {{
 *  appVersion: string,
 *  applyLanguage: function,
 *  currentLanguageCode: string,
 *  initialState: Object,
 *  subMenu: Array,
 *  masterData: Object,
 *  mockData: Object,
 *  profileMenu: Array,
 *  routes: Array,
 *  services: Object,
 *  settings: Object,
 *  text: Object
 * }}
 */
const getConfiguration = () => {
    if (global.config) {
        return global.config;
    }

    const appVersion = appData.version;
    const initialState = getInitialState();
    const routes = buildRoutes();
    const settings = getSettings();
    const services = getServices(settings.services.root);

    const config = {
        appVersion,
        applyLanguage,
        initialState,
        mockData,
        routes,
        services,
        settings
    };

    config.applyLanguage(initialState.user.languageCode);

    global.config = config;
    return config;
};

export const config = getConfiguration();
