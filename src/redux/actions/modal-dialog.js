// @constants
export const HIDE_MODAL_DIALOG = 'HIDE_MODAL_DIALOG';
export const SHOW_MODAL_DIALOG = 'SHOW_MODAL_DIALOG';

/**
 * @param {?boolean} showCancel
 * @param {?element} customActions
 * @param {?element} customActionsTop
 * @param {?function} onConfirm
 * @param {?number|?string} maxWidth
 * @param {?number|?string} width
 * @param {?object|object[]} msgArgs
 * @param {?string} cancelLabel
 * @param {?string} okLabel
 * @param {?string} title
 * @param {string|element} msg
 */
export const showModalDialog = ({
    cancelLabel,
    customActions,
    customActionsTop,
    msg,
    msgArgs,
    okLabel,
    onConfirm,
    showCancel,
    maxWidth,
    title,
    width
}) => ({
    type: SHOW_MODAL_DIALOG,
    payload: {
        cancelLabel,
        customActions,
        customActionsTop,
        maxWidth,
        msg,
        msgArgs,
        okLabel,
        onConfirm,
        showCancel,
        title,
        width
    }
});

export const hideModalDialog = () =>
    ({
        type: HIDE_MODAL_DIALOG
    });
