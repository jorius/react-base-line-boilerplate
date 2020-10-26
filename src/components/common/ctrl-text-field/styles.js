// @packages
import grey from '@material-ui/core/colors/grey';

// @scripts
import globals from '../../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    textField: {
        marginBottom: 10,
        '& .MuiFormLabel-root.Mui-disabled': {
            color: grey[800]
        }
    },
    enabledButton: {
        cursor: 'pointer',
        marginRight: 0,
        color: grey[800]
    },
    disabledButton: {
        marginRight: 0,
        color: grey[500]
    }
});
