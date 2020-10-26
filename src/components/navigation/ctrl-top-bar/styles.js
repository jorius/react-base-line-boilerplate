// @scripts
import globals from '../../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    avatar: {
        backgroundColor: '#EE0273',
        color: theme.palette.common.white
    },
    avatarAdorment: {
        border: `1px solid ${theme.palette.common.black}66`,
        borderRadius: '50%',
        padding: 2
    },
    topBarActions: {
        position: 'absolute',
        right: 0
    }
});
