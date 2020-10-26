// @packages
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlLoginForm from './login-form';
import { initialState } from './state';
import { isAllPropsValid } from '../../util';

// @styles
import styles from './styles';
import { globalUI } from '../../core';

const LoginPage = ({
    classes,
    userProps
}) => {
    const [state, onChange] = useState(initialState);

    const handleOnLogIn = () => {
        if (isAllPropsValid(state)) {
            const { email, password } = state;

            userProps
                .onLogin({
                    email: email.value,
                    password: password.value
                }).then(() => {
                    globalUI.navigateToDefaultUrl();
                }).catch(() => {});
        } else {
            onChange({
                ...state,
                showErrors: true
            });
        }
    };

    const handleOnRememberMe = ({ value }) => {
        const { onRememberMe } = userProps;
        onRememberMe(value);
    };

    const handleFieldOnChange = ({ name, isValid, value }) => {
        onChange({
            ...state,
            [name]: {
                isValid,
                value
            }
        });
    };

    const {
        email,
        password,
        showErrors
    } = state;

    const { rememberMe } = userProps;

    return (
        <div
            className={classes.loginPage}
            id="login-page"
        >
            <CtrlLoginForm
                emailValue={email.value}
                id="login-page-form"
                onFieldChange={handleFieldOnChange}
                onLogin={handleOnLogIn}
                onRememberMe={handleOnRememberMe}
                passwordValue={password.value}
                rememberMeValue={rememberMe}
                showErrors={showErrors}
            />
        </div>
    );
};

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    userProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        onLogin: PropTypes.func.isRequired,
        onRememberMe: PropTypes.func.isRequired,
        rememberMe: PropTypes.bool.isRequired
    }).isRequired
};

export default withStyles(styles)(LoginPage);
