// @packages
import { bindActionCreators } from 'redux';

// @scripts
import { config } from '../config';
import { getBaseUrl, navigateToUrl } from '../util';

import {
    hideModalDialog,
    hideLoadingPage,
    hideToastNotification,
    logout,
    showModalDialog,
    showLoadingPage,
    showToastNotification,
    showToastNotificationError,
    showToastNotificationInfo,
    showToastNotificationSuccess,
    showToastNotificationWarning
} from '../redux';

/**
 * @param {Object} environment - Environment settings.
 * @param {Store} store - The redux store.
 * @returns {Object}
 */
export const initializeGlobalUI = (environment, store) => {
    const globalUI = bindActionCreators({
        showLoadingPage,
        showToastNotification,
        showToastNotificationError,
        showToastNotificationInfo,
        showToastNotificationSuccess,
        showToastNotificationWarning
    }, store.dispatch);

    globalUI.showModalDialog = ({
        cancelLabel,
        customActions,
        customActionsTop,
        id,
        maxWidth,
        msg,
        msgArgs,
        okLabel,
        onConfirm,
        showCancel,
        title,
        width
    }) => {
        const onConfirmCallback = onConfirm
            ? () => { globalUI.hideModalDialog(); onConfirm(); }
            : null;

        store.dispatch(showModalDialog({
            cancelLabel: cancelLabel || config.text.commonButtons.cancel,
            customActions,
            customActionsTop,
            id,
            maxWidth,
            msg: msg || config.text.modalDialog.msg,
            msgArgs,
            okLabel: okLabel || config.text.modalDialog.ok,
            onConfirm: onConfirmCallback,
            showCancel,
            title: title || config.text.modalDialog.title,
            width
        }));
    };

    globalUI.hideLoadingPage = () => {
        if (store.getState().loadingPage.isVisible) {
            store.dispatch(hideLoadingPage());
        }
    };

    globalUI.hideToastNotification = () => {
        if (store.getState().toastNotification.isVisible) {
            store.dispatch(hideToastNotification());
        }
    };

    globalUI.hideModalDialog = () => {
        if (store.getState().modalDialog.isVisible) {
            store.dispatch(hideModalDialog());
        }
    };

    globalUI.setBrowserHistory = (browserHistory) => {
        globalUI.browserHistory = browserHistory;
    };

    globalUI.getLoginUrl = () => config.routes.find(
        (route) => route.name === 'login'
    ).url;

    globalUI.getHomeUrl = () => config.routes.find(
        (route) => route.name === 'home'
    ).url;

    globalUI.getDefaultUrl = () => globalUI.getHomeUrl();

    globalUI.navigateToUrl = (url) => {
        if (url === globalUI.getLoginUrl()) {
            globalUI.logout();
        } else if (globalUI.browserHistory) {
            const { pathname } = globalUI.browserHistory.location;
            if (pathname !== url) {
                globalUI.browserHistory.push(url);
            }
        } else {
            navigateToUrl(`${getBaseUrl()}/#${url}`);
        }
    };

    globalUI.navigateToDefaultUrl = () => {
        globalUI.navigateToUrl(globalUI.getDefaultUrl());
    };

    globalUI.logout = () => {
        const {
            account: { permissions }
        } = store.getState().user;

        const isLoggedIn = Boolean(permissions.length);
        if (!isLoggedIn) {
            return;
        }

        store.dispatch(logout());

        const loginUrl = globalUI.getLoginUrl();
        if (globalUI.browserHistory) {
            globalUI.browserHistory.push(loginUrl);
        } else {
            navigateToUrl(`${getBaseUrl()}/#${loginUrl}`);
        }
    };

    if (!environment.isUnitTest) {
        globalUI.getImage = require.context('../assets/images', true);
    }

    return globalUI;
};
