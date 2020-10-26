// @packages
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

// @scripts
import MasterPageContainer from './master-page';
import { store } from '../core';
import { theme } from '../styles/material-ui';

const AppContainer = () => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <HashRouter>
                <Route component={MasterPageContainer} />
            </HashRouter>
        </Provider>
    </MuiThemeProvider>
);

export default AppContainer;
