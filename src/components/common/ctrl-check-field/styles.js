// @scripts
import globals from '../../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    checkField: {
        display: 'inline-block'
    },
    labelDefault: {
        color: theme.palette.common.white
    },
    labelPrimary: {
        color: theme.palette.primary.main
    },
    labelSecondary: {
        color: theme.palette.secondary.main
    },
    helperText: {
        margin: 0
    }
});
