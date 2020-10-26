// @packages
import axios from 'axios';

// @scripts
import { config } from '../config';
import { printError } from '../util';
import { constants } from './constants';

/**
 * @param {Object} environment - Environment settings.
 * @returns {boolean}
 */
const shouldDisplayLoadingPage = (environment) =>
    !environment.isUnitTest && config.settings.ajaxInterceptors.showLoadingPage;

/**
 * @param {Object} environment - Environment settings.
 * @returns {boolean}
 */
const shouldDisplayNotifications = (environment) =>
    !environment.isUnitTest && config.settings.ajaxInterceptors.showNotifications;

/**
 * @param {Object} error - Error object received from axios instance.
 * @returns {Promise}
 */
const handleError = (error, environment, globalUI) => {
    globalUI.hideLoadingPage();

    if (shouldDisplayNotifications(environment)) {
        globalUI.showToastNotificationError(
            config.text.common.unexpectedError
        );
    }

    if (!environment.isUnitTest) {
        printError(error);
        printError(JSON.stringify(error));
    }

    return Promise.reject(error);
};

const addRequestInterceptors = (environment, globalUI, store) => {
    axios.interceptors.request.use(
        (request) => {
            globalUI.hideToastNotification();

            const { account: { authToken } } = store.getState().user;

            if (authToken) {
                request.headers.Authorization = `Bearer ${authToken}`;
            }

            if (shouldDisplayLoadingPage(environment)) {
                globalUI.showLoadingPage();
            }

            return request;
        },
        (error) => handleError(error, environment, globalUI)
    );
};

const addResponseInterceptors = (environment, globalUI) => {
    axios.interceptors.response.use(
        (response) => {
            globalUI.hideLoadingPage();

            const responseSuccess = response.data.success || response.data;
            const responseError = !response.data.success || !response.data;
            const responseData = response.data.data || response.data;
            const responseMessage = response.data.message;
            const responseMessageType = responseSuccess && !responseError
                ? constants.notificationType.SUCCESS
                : constants.notificationType.ERROR;

            const displayNotification = shouldDisplayNotifications(environment) && Boolean(responseMessage);

            if (displayNotification) {
                globalUI.showToastNotification({
                    msg: responseMessage,
                    type: responseMessageType
                });
            }

            if (!responseSuccess) {
                return Promise.reject(responseMessage);
            }

            return responseData;
        },
        (error) => handleError(error, environment, globalUI)
    );
};

export const addAjaxInterceptors = ({ environment, globalUI, store }) => {
    addRequestInterceptors(environment, globalUI, store);
    addResponseInterceptors(environment, globalUI);
};
