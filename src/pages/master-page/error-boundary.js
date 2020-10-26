// @packages
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import { printError } from '../../util';
import { config } from '../../config';

// @styles
import styles from './styles';

// @constants
const INITIAL_STATE = {
    hasError: false
};

class CtrlErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    static getDerivedStateFromError(error) {
        if (error) {
            this.setState({
                hasError: error
            });
        } else {
            this.setState({ ...INITIAL_STATE });
        }
    }

    componentDidCatch(error, errorInfo) {
        printError(error, errorInfo);
    }

    render() {
        const { children, classes } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <div className={classes.errorBoundary}>
                    <Typography variant="h4">{config.text.common.errorBoundary}</Typography>
                </div>
            );
        }

        return children;
    }
}

CtrlErrorBoundary.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.any]).isRequired
};

export default withStyles(styles)(CtrlErrorBoundary);
