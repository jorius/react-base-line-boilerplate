// @scripts
import globals from '../../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    modalDialog: {
    },
    modalDialogPaper: {
        backgroundColor: theme.palette.common.white
    },
    modalDialogTitle: {
        '& .MuiTypography-h6': {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
        }
    }
});
