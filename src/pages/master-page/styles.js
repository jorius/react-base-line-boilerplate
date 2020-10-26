// @scripts
import globals, { dimensions } from '../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    errorBoundary: {
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    loggedInPage: {
        backgroundColor: theme.palette.background.paper,
        padding: `${dimensions.TOP_BAR_HEIGHT + 25}px 0 0 25px`
    },
    masterPage: {
        backgroundColor: theme.palette.background.paper,
        height: '100vh',
        width: '100%'
    },
    notLoggedInPage: {
        backgroundColor: theme.palette.background.paper,
        padding: '25px 0 0 25px'
    }
});
