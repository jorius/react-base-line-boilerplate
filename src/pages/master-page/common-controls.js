// @packages
import PropTypes from 'prop-types';
import React from 'react';

// @scripts
import CtrlModalDialog from '../../components/common/ctrl-modal-dialog';
import CtrlLoadingPage from '../../components/common/ctrl-loading-page';
import CtrlToastNotification from '../../components/common/ctrl-toast-notification';

const CtrlCommonControls = ({
    modalDialogProps,
    loadingPageProps,
    toastNotificationProps
}) => ([
    <CtrlLoadingPage
        id="ctrl-loading-page"
        key="ctrl-loading-page"
        msg={loadingPageProps.msg}
        visible={loadingPageProps.isVisible}
    />,
    <CtrlModalDialog
        cancelLabel={modalDialogProps.cancelLabel}
        customActions={modalDialogProps.customActions}
        customActionsTop={modalDialogProps.customActionsTop}
        id="ctrl-modal-dialog"
        key="ctrl-modal-dialog"
        maxWidth={modalDialogProps.maxWidth}
        msg={modalDialogProps.msg}
        okLabel={modalDialogProps.okLabel}
        onConfirm={modalDialogProps.onConfirm}
        onHide={modalDialogProps.onHide}
        showCancel={modalDialogProps.showCancel}
        title={modalDialogProps.title}
        visible={modalDialogProps.isVisible}
        width={modalDialogProps.width}
    />,
    <CtrlToastNotification
        id="ctrl-toast-notification"
        key="ctrl-toast-notification"
        msg={toastNotificationProps.msg}
        onHide={toastNotificationProps.onHide}
        type={toastNotificationProps.type}
        visible={toastNotificationProps.isVisible}
    />
]);

CtrlCommonControls.propTypes = {
    modalDialogProps: PropTypes.shape({
        cancelLabel: PropTypes.string,
        customActions: PropTypes.element,
        customActionsTop: PropTypes.element,
        isVisible: PropTypes.bool.isRequired,
        maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        okLabel: PropTypes.string,
        onConfirm: PropTypes.func,
        onHide: PropTypes.func.isRequired,
        title: PropTypes.string
    }).isRequired,
    loadingPageProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    }).isRequired,
    toastNotificationProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.string,
        onHide: PropTypes.func.isRequired,
        type: PropTypes.string
    }).isRequired
};

export default CtrlCommonControls;
