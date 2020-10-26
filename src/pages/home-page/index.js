// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const HomePage = ({
    classes,
    content
}) => (
    <div id="home-page" className={classes.homePage}>
        {content}
    </div>
);

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    content: PropTypes.string
};

HomePage.defaultProps = {
    content: null
};

export default withStyles(styles)(HomePage);
