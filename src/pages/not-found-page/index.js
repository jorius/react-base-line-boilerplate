// @packages
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// @styles
import styles from './styles';

const NotFoundPage = ({ classes, content }) =>
    (
        <div id="notfound-page" className={classes.notFoundPage}>
            <Typography variant="h3">{content}</Typography>
        </div>
    );

NotFoundPage.propTypes = {
    classes: PropTypes.object.isRequired,
    content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
};

export default withStyles(styles)(NotFoundPage);
