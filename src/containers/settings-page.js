// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @scripts
import SettingsPage from '../pages/settings-page';
import { config } from '../config';
import { updateLanguage } from '../redux';

const SettingsPageContainer = ({
    languageCode,
    onChangeLanguage
}) => {
    const handleOnChangeLanguage = (langCode) => {
        config.applyLanguage(langCode);
        onChangeLanguage(langCode);
    };

    return (
        <SettingsPage
            languageProps={{
                code: languageCode,
                list: config.masterData.languages,
                onChange: handleOnChangeLanguage
            }}
        />
    );
};

SettingsPageContainer.propTypes = {
    languageCode: PropTypes.string.isRequired,
    onChangeLanguage: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
    languageCode: user.languageCode
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onChangeLanguage: updateLanguage
}, dispatch);

export default connect(
    mapStateToProps, mapDispatchToProps
)(SettingsPageContainer);
