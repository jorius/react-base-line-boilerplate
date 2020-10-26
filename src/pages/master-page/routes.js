// @packages
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import classNames from 'classnames';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlErrorBoundary from './error-boundary';
import CtrlLoadingPage from '../../components/common/ctrl-loading-page';
import { config } from '../../config';
import { mapComponent } from './component-mapper';

// @styles
import styles from './styles';

const CtrlRoutes = ({
    classes,
    loadingPageProps,
    userProps
}) => {
    const routes = userProps.isLoggedIn
        ? config.routes.filter((route) =>
            (route.permission === null || userProps.permissions.includes(route.permission)))
        : config.routes.filter((route) => route.permission === null);

    const containerClass = classNames({
        [classes.notLoggedInPage]: !userProps.isLoggedIn,
        [classes.loggedInPage]: userProps.isLoggedIn
    });

    const suspenseFallback = (
        <CtrlLoadingPage
            id="ctrl-loading-page"
            msg={loadingPageProps.msg}
            visible
        />
    );

    return (
        <div className={containerClass}>
            <CtrlErrorBoundary>
                <Suspense fallback={suspenseFallback}>
                    <Switch>
                        {
                            routes.map((route, index) => (
                                <Route
                                    component={mapComponent(route.container)}
                                    exact
                                    key={index}
                                    path={route.url}
                                />
                            ))
                        }
                    </Switch>
                </Suspense>
            </CtrlErrorBoundary>
        </div>
    );
};

CtrlRoutes.propTypes = {
    classes: PropTypes.object.isRequired,
    loadingPageProps: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        msg: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    }).isRequired,
    userProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        permissions: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};

export default withStyles(styles)(CtrlRoutes);
