// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

// @scripts
import MasterPage from '../pages/master-page';
import { config, getRouteBy } from '../config';
import { globalUI } from '../core';

const MasterPageContainer = ({
    history,
    loadingPageIsVisible,
    loadingPageMsg,
    location,
    modalDialogCancelLabel,
    modalDialogCustomActions,
    modalDialogCustomActionsTop,
    modalDialogIsVisible,
    modalDialogMaxWidth,
    modalDialogMsg,
    modalDialogOkLabel,
    modalDialogOnConfirm,
    modalDialogShowCancel,
    modalDialogTitle,
    modalDialogWidth,
    toastNotificationIsVisible,
    toastNotificationMsg,
    toastNotificationType,
    userEmail,
    userIsLoggedIn,
    userLanguageCode,
    userName,
    userPermissions
}) => {
    config.applyLanguage(userLanguageCode);
    globalUI.setBrowserHistory(history);

    const currentUrl = location.pathname;
    const loginUrl = globalUI.getLoginUrl();

    const route = getRouteBy({
        routes: config.routes,
        routeKeyProp: 'url',
        routeValProp: currentUrl
    });

    if (!userIsLoggedIn && route && route.permission) {
        return <Redirect to={loginUrl} />;
    }

    if (userIsLoggedIn && currentUrl === loginUrl) {
        return <Redirect to="/home" />;
    }

    if (!route) {
        return <Redirect to="/404" />;
    }

    return (
        <MasterPage
            currentUrl={currentUrl}
            modalDialogProps={{
                cancelLabel: modalDialogCancelLabel,
                customActions: modalDialogCustomActions,
                customActionsTop: modalDialogCustomActionsTop,
                isVisible: modalDialogIsVisible,
                maxWidth: modalDialogMaxWidth,
                msg: modalDialogMsg,
                okLabel: modalDialogOkLabel,
                onConfirm: modalDialogOnConfirm,
                onHide: globalUI.hideModalDialog,
                showCancel: modalDialogShowCancel,
                title: modalDialogTitle,
                width: modalDialogWidth
            }}
            loadingPageProps={{
                isVisible: loadingPageIsVisible,
                msg: loadingPageMsg
            }}
            title={config.text.appName}
            toastNotificationProps={{
                isVisible: toastNotificationIsVisible,
                msg: toastNotificationMsg,
                onHide: globalUI.hideToastNotification,
                type: toastNotificationType
            }}
            userProps={{
                email: userEmail,
                isLoggedIn: userIsLoggedIn,
                name: userName,
                permissions: userPermissions,
                profileMenu: config.profileMenu
            }}
        />
    );
};

MasterPageContainer.propTypes = {
    modalDialogCancelLabel: PropTypes.string,
    modalDialogCustomActions: PropTypes.element,
    modalDialogCustomActionsTop: PropTypes.element,
    modalDialogIsVisible: PropTypes.bool.isRequired,
    modalDialogMaxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    modalDialogMsg: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    modalDialogOkLabel: PropTypes.string,
    modalDialogOnConfirm: PropTypes.func,
    modalDialogShowCancel: PropTypes.bool,
    modalDialogTitle: PropTypes.string,
    modalDialogWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    history: PropTypes.shape({
        location: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired
    }).isRequired,
    loadingPageIsVisible: PropTypes.bool.isRequired,
    loadingPageMsg: PropTypes.string,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    toastNotificationIsVisible: PropTypes.bool.isRequired,
    toastNotificationMsg: PropTypes.string,
    toastNotificationType: PropTypes.string,
    userEmail: PropTypes.string,
    userIsLoggedIn: PropTypes.bool.isRequired,
    userLanguageCode: PropTypes.string.isRequired,
    userName: PropTypes.string,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};

MasterPageContainer.defaultProps = {
    loadingPageMsg: null,
    modalDialogCancelLabel: null,
    modalDialogCustomActions: null,
    modalDialogCustomActionsTop: null,
    modalDialogMaxWidth: null,
    modalDialogMsg: null,
    modalDialogOkLabel: null,
    modalDialogOnConfirm: null,
    modalDialogShowCancel: true,
    modalDialogTitle: null,
    modalDialogWidth: null,
    toastNotificationMsg: null,
    toastNotificationType: null,
    userEmail: null,
    userName: null
};

const mapStateToProps = ({
    loadingPage,
    modalDialog,
    toastNotification,
    user
}) => ({
    loadingPageIsVisible: loadingPage.isVisible,
    loadingPageMsg: loadingPage.msg,
    modalDialogCancelLabel: modalDialog.cancelLabel,
    modalDialogCustomActions: modalDialog.customActions,
    modalDialogCustomActionsTop: modalDialog.customActionsTop,
    modalDialogIsVisible: modalDialog.isVisible,
    modalDialogMaxWidth: modalDialog.maxWidth,
    modalDialogMsg: modalDialog.msg,
    modalDialogOkLabel: modalDialog.okLabel,
    modalDialogOnConfirm: modalDialog.onConfirm,
    modalDialogShowCancel: modalDialog.showCancel,
    modalDialogTitle: modalDialog.title,
    modalDialogWidth: modalDialog.width,
    toastNotificationIsVisible: toastNotification.isVisible,
    toastNotificationMsg: toastNotification.msg,
    toastNotificationType: toastNotification.type,
    userEmail: user.account.email,
    userIsLoggedIn: Boolean(user.account.authToken) && Boolean(user.account.permissions.length),
    userLanguageCode: user.languageCode,
    userName: user.account.name,
    userPermissions: user.account.permissions
});

export default compose(
    withRouter,
    connect(mapStateToProps)
)(MasterPageContainer);
