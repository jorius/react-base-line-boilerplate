// @packages
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlMenuItem from './menu-item';
import { globalUI } from '../../../core';

// @styles
import styles from './styles';

class CtrlProfileMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this);
    }

    handleMenuItemOnClick(menu) {
        this.props.onClose();
        globalUI.navigateToUrl(menu.url);
    }

    render() {
        const {
            className,
            classes,
            id,
            onClose,
            profileMenu,
            target,
            userPermissions
        } = this.props;

        const profileMenuClass = classNames(
            className,
            classes.profileMenu
        );

        return (
            <Menu
                anchorEl={target}
                className={profileMenuClass}
                classes={{ paper: classes.menuPaper }}
                id={id}
                onClose={onClose}
                open={Boolean(target)}
            >
                {
                    profileMenu.map((menuItem, index) =>
                        (
                            <CtrlMenuItem
                                icon={menuItem.icon}
                                id={`${id}-${menuItem.name.toLowerCase()}-menuitem`}
                                key={index}
                                onClick={() => { this.handleMenuItemOnClick(menuItem); }}
                                permission={menuItem.permission}
                                selected={menuItem.isDefault}
                                text={menuItem.description}
                                userPermissions={userPermissions}
                            />
                        ))
                }
            </Menu>
        );
    }
}

CtrlProfileMenu.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    profileMenu: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        icon: PropTypes.string,
        isDefault: PropTypes.bool,
        name: PropTypes.string.isRequired
    })).isRequired,
    target: PropTypes.object,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired
};

CtrlProfileMenu.defaultProps = {
    className: null,
    target: null
};

export default withStyles(styles)(CtrlProfileMenu);
