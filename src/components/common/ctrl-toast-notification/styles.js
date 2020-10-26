// @packages
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

// @scripts
import globals from '../../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    toastNoficiation: {
    },
    error: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    success: {
        backgroundColor: green[600]
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        marginRight: theme.spacing(1),
        opacity: 0.9
    },
    message: {
        alignItems: 'center',
        display: 'flex'
    }
});
