// @scripts
import globals from '../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    loginBackground: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        margin: '50px -50px 0 50px',
        height: 'calc(100vh - 50px)'
    },
    loginButton: {
        marginTop: 50,
        width: 150
    },
    loginPage: {
        backgroundColor: '#F6F7FD',
        height: '100vh'
    },
    form: {
        left: '50%',
        maxWidth: 500,
        minWidth: 300,
        padding: 25,
        position: 'relative',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    formContainer: {
        height: '100vh'
    },
    formItem: {
        marginBottom: 20
    },
    formTitle: {
        marginBottom: 25
    },
    passwordInput: {
        '& span.MuiIcon-root': {
            color: '#9e9e9e'
        }
    }
});
