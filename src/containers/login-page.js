// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import LoginPage from '../pages/login-page';
import { login, rememberMe } from '../redux';

const LoginPageContainer = ({
    userOnLogin,
    userOnRememberMe,
    userPermissions,
    userRememberMe
}) => (
    <LoginPage
        userProps={{
            isLoggedIn: Boolean(userPermissions.length),
            onLogin: userOnLogin,
            onRememberMe: userOnRememberMe,
            rememberMe: userRememberMe
        }}
    />
);

LoginPageContainer.propTypes = {
    userOnLogin: PropTypes.func.isRequired,
    userOnRememberMe: PropTypes.func.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    userRememberMe: PropTypes.bool.isRequired
};

const mapStateToProps = ({ user }) => ({
    userPermissions: user.account.permissions,
    userRememberMe: user.rememberMe
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    userOnLogin: login,
    userOnRememberMe: rememberMe
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(LoginPageContainer);
