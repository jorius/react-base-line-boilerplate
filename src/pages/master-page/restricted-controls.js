// @packages
import PropTypes from 'prop-types';
import React from 'react';

// @scripts
import CtrlTopBar from '../../components/navigation/ctrl-top-bar';

const CtrlRestrictedControls = ({
    userProps
}) => {
    if (!userProps.isLoggedIn) {
        return null;
    }

    return (
        <CtrlTopBar
            id="ctrl-top-bar"
            profileMenu={userProps.profileMenu}
            userName={userProps.name}
            userPermissions={userProps.permissions}
        />
    );
};

CtrlRestrictedControls.propTypes = {
    userProps: PropTypes.shape({
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool.isRequired,
        name: PropTypes.string,
        permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
        profileMenu: PropTypes.arrayOf(PropTypes.shape({
            description: PropTypes.string,
            icon: PropTypes.string,
            isDefault: PropTypes.bool,
            name: PropTypes.string.isRequired
        })).isRequired
    }).isRequired
};

export default CtrlRestrictedControls;
