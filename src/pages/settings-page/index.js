// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// @scripts
import CtrlSelectField from '../../components/common/ctrl-select-field';
import { config } from '../../config';

// @styles
import styles from './styles';

const SettingsPage = ({ classes, languageProps }) => (
    <div id="setings-page" className={classes.settingsPage}>
        <CtrlSelectField
            className={classes.languageSelect}
            id="settings-page-language-select"
            itemValProp="code"
            items={languageProps.list}
            label={config.text.settingsPage.language}
            onChange={({ value }) => { languageProps.onChange(value); }}
            value={languageProps.code}
        />
    </div>
);

SettingsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    languageProps: PropTypes.shape({
        code: PropTypes.string.isRequired,
        list: PropTypes.arrayOf(PropTypes.shape({
            code: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })).isRequired,
        onChange: PropTypes.func.isRequired
    }).isRequired
};

export default withStyles(styles)(SettingsPage);
