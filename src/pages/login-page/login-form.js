// @packages
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlCheckField from '../../components/common/ctrl-check-field';
import CtrlTextField from '../../components/common/ctrl-text-field';
import { config } from '../../config';

// @styles
import styles from './styles';

const CtrlLoginForm = ({
    classes,
    emailValue,
    id,
    onFieldChange,
    onLogin,
    onRememberMe,
    passwordValue,
    rememberMeValue,
    showErrors
}) => (
    <div id={id}>
        <Grid container direction="row">
            <Grid
                className={classes.formContainer}
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
            >
                <form
                    autoComplete="off"
                    className={classes.form}
                    noValidate
                >
                    <Grid justify="center" container>
                        <Grid item>
                            <Typography
                                className={classes.formTitle}
                                variant="h5"
                            >
                                {config.text.loginPage.welcomeToReact}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item lg={12} sm={12} md={12} xs={12}>
                            <CtrlTextField
                                autoFocus
                                icon="account_circle"
                                id={`${id}-email-input`}
                                label={config.text.loginPage.userLabel}
                                name="email"
                                onChange={onFieldChange}
                                onEnter={onLogin}
                                placeholder={config.text.loginPage.userPlaceholder}
                                required
                                showErrors={showErrors}
                                type="email"
                                value={emailValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item lg={12} sm={12} md={12} xs={12}>
                            <CtrlTextField
                                className={classes.passwordInput}
                                id={`${id}-password-input`}
                                label={config.text.loginPage.password}
                                minLength={6}
                                name="password"
                                onChange={onFieldChange}
                                onEnter={onLogin}
                                required
                                showErrors={showErrors}
                                type="password"
                                value={passwordValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <CtrlCheckField
                                id={`${id}-remember-check`}
                                label={config.text.loginPage.keepSessionAlive}
                                name="remember"
                                onChange={onRememberMe}
                                value={rememberMeValue}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item>
                            <Button
                                className={classes.loginButton}
                                color="primary"
                                id={`${id}-continue-button`}
                                onClick={onLogin}
                                value={config.text.loginPage.continue}
                                variant="contained"
                            >
                                {config.text.loginPage.formTitle}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </div>
);

CtrlLoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    emailValue: PropTypes.string,
    id: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRememberMe: PropTypes.func.isRequired,
    passwordValue: PropTypes.string,
    rememberMeValue: PropTypes.bool.isRequired,
    showErrors: PropTypes.bool.isRequired
};

CtrlLoginForm.defaultProps = {
    emailValue: null,
    passwordValue: null
};

export default withStyles(styles)(CtrlLoginForm);
