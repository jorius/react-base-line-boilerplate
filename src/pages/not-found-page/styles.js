// @scripts
import globals from '../../styles/globals';

export default (theme) => ({
    ...globals(theme),
    notFoundPage: {
        left: '50%',
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});
