// @scripts
import globals from '../../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    badge: {
        backgroundColor: '#FF4713'
    },
    icon: {
        color: '#C5C7CD'
    },
    iconButton: {
    },
    iconLabel: {
        color: '#252733'
    },
    labelContent: {
        color: theme.palette.common.white
    }
});
