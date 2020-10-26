// @packages
import { lazy } from 'react';

// @scripts
const HomePageContainer = lazy(() => import('../../containers/home-page'));
const LoginPageContainer = lazy(() => import('../../containers/login-page'));
const NotFoundPageContainer = lazy(() => import('../../containers/not-found-page'));
const SettingsPageContainer = lazy(() => import('../../containers/settings-page'));

// @constants
const components = {
    HomePageContainer,
    LoginPageContainer,
    NotFoundPageContainer,
    SettingsPageContainer
};

/**
 * @param {string} componentName
 * @returns {function}
 */
export const mapComponent = (componentName) =>
    components[componentName];
