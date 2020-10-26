// @packages
import grey from '@material-ui/core/colors/grey';

// @scripts
import globals, { zIndex } from '../../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    profileMenu: {
        zIndex: zIndex.PROFILE_MENU
    },
    menuPaper: {
        minWidth: 200,
        marginTop: 50,
        marginLeft: -80
    },
    icon: {
    },
    iconMenuItem: {
        minWidth: 36
    },
    userInfoName: {
        color: grey[800],
        fontWeight: 500
    }
});
