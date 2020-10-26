// @packages
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const CtrlMenuItem = ({
    classes,
    icon,
    id,
    onClick,
    permission,
    selected,
    text,
    userPermissions
}) => {
    const isVisible = !permission || userPermissions.includes(permission);

    if (!isVisible) {
        return null;
    }

    return (
        <MenuItem id={id} onClick={onClick} selected={selected}>
            <ListItemIcon className={classes.iconMenuItem}>
                <Icon id={`${id}-icon`}>{icon}</Icon>
            </ListItemIcon>
            <ListItemText id={`${id}-label`} primary={text} />
        </MenuItem>
    );
};

CtrlMenuItem.propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    permission: PropTypes.string,
    selected: PropTypes.bool,
    text: PropTypes.string.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};

CtrlMenuItem.defaultProps = {
    permission: null,
    selected: false
};

export default withStyles(styles)(CtrlMenuItem);
