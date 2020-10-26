// @scripts
import { HIDE_MODAL_DIALOG, SHOW_MODAL_DIALOG } from '../../redux/actions';
import { config } from '../../config';
import { modalDialogReducer } from '../../redux/reducers/modal-dialog';
import { format } from '../../util';

test('modalDialogReducer: SHOW_MODAL_DIALOG (with msgArgs)', () => {
    const action = {
        type: SHOW_MODAL_DIALOG,
        payload: {
            customActions: null,
            cancelLabel: 'Cancelar',
            title: 'Dialog title',
            okLabel: 'Delete',
            msg: 'Are you sure you want to delete user {0}?',
            msgArgs: 'user@email.com',
            onConfirm: jest.fn()
        }
    };
    const newState = modalDialogReducer(config.initialState.confirmDialog, action);
    const expectedState = {
        customActions: action.payload.customActions,
        cancelLabel: action.payload.cancelLabel,
        title: action.payload.title,
        okLabel: action.payload.okLabel,
        isVisible: true,
        msg: format(action.payload.msg, action.payload.msgArgs),
        onConfirm: action.payload.onConfirm
    };
    expect(newState).toEqual(expectedState);
});

test('modalDialogReducer: SHOW_MODAL_DIALOG (without msgArgs)', () => {
    const action = {
        type: SHOW_MODAL_DIALOG,
        payload: {
            cancelLabel: 'Cancelar',
            title: 'Dialog title',
            okLabel: 'Delete',
            msg: 'Are you sure you want to delete this user?',
            onConfirm: jest.fn()
        }
    };
    const newState = modalDialogReducer(config.initialState.confirmDialog, action);
    const expectedState = {
        cancelLabel: action.payload.cancelLabel,
        title: action.payload.title,
        okLabel: action.payload.okLabel,
        isVisible: true,
        msg: action.payload.msg,
        onConfirm: action.payload.onConfirm
    };
    expect(newState).toEqual(expectedState);
});

test('modalDialogReducer: HIDE_MODAL_DIALOG', () => {
    const initialState = {
        isVisible: true,
        msg: 'Are you sure you want to delete this user?',
        onConfirm: jest.fn()
    };
    const action = {
        type: HIDE_MODAL_DIALOG
    };
    const newState = modalDialogReducer(initialState, action);
    const expectedState = {
        isVisible: false,
        msg: null,
        onConfirm: null
    };
    expect(newState).toEqual(expectedState);
});

test('modalDialogReducer: DEFAULT', () => {
    const initialState = {
        cancelLabel: 'Cancelar',
        title: 'Dialog title',
        okLabel: 'Delete',
        isVisible: true,
        msg: 'Are you sure you want to delete this user?',
        onConfirm: jest.fn()
    };
    const action = {
        type: 'UNLISTENED_ACTION'
    };
    const newState = modalDialogReducer(initialState, action);
    expect(newState).toEqual(initialState);
});
