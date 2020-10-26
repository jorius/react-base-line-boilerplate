// @packages
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

class CtrlIconButton extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            menuTarget: null,
            showTooltip: false
        };

        this.showMenu = this.showMenu.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showMenu(evt) {
        this.setState({
            menuTarget: evt.target,
            showTooltip: false
        });
    }

    showTooltip() {
        this.setState({ showTooltip: true });
    }

    hideMenu() {
        this.setState({ menuTarget: null });
    }

    hideTooltip() {
        this.setState({ showTooltip: false });
    }

    render() {
        const {
            badgeContent,
            classes,
            contextMenu,
            icon,
            id,
            label,
            permission,
            tooltip,
            userPermissions,
            visible
        } = this.props;

        if (!visible || (permission && !userPermissions.includes(permission))) {
            return null;
        }

        const iconButtonClass = label
            ? classes.iconLabel
            : classes.autocomplete;

        const { menuTarget, showTooltip } = this.state;

        const tooltipLabel = label
            ? ''
            : tooltip;

        return ([
            <Tooltip
                id={`${id}-tooltip`}
                key="tooltip"
                open={showTooltip}
                title={tooltipLabel}
            >
                <IconButton
                    className={iconButtonClass}
                    color="inherit"
                    id={`${id}-button`}
                    onBlur={() => {}}
                    onClick={this.showMenu}
                    onFocus={() => {}}
                    onMouseOut={this.hideTooltip}
                    onMouseOver={this.showTooltip}
                >
                    { label
                       && (
                            <div className={classes.labelContent}>
                                <Typography>
                                    {label}
                                </Typography>
                            </div>
                       )}
                    { badgeContent
                        ? (
                            <Badge
                                classes={{ colorSecondary: classes.badge }}
                                badgeContent={badgeContent}
                                color="secondary"
                                id={`${id}-badge`}
                            >
                                <Icon className={classes.icon} id={`${id}-icon`}>{icon}</Icon>
                            </Badge>
                        )
                        : <Icon className={classes.icon} id={`${id}-icon`}>{icon}</Icon>}
                </IconButton>
            </Tooltip>,
            Boolean(contextMenu)
                && (
                    <contextMenu.component
                        key="context-menu"
                        onClose={this.hideMenu}
                        target={menuTarget}
                        {...contextMenu.props}
                    />
                )
        ]);
    }
}

CtrlIconButton.propTypes = {
    badgeContent: PropTypes.number,
    classes: PropTypes.object.isRequired,
    contextMenu: PropTypes.shape({
        component: PropTypes.any,
        props: PropTypes.object
    }),
    icon: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    permission: PropTypes.string,
    tooltip: PropTypes.string,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    visible: PropTypes.bool
};

CtrlIconButton.defaultProps = {
    badgeContent: null,
    contextMenu: null,
    label: null,
    permission: null,
    tooltip: null,
    visible: true
};

export default withStyles(styles)(CtrlIconButton);
