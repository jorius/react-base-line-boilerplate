// @scripts
import { config } from '../../config';
import { constants } from '../constants';

import {
    createMockResponse,
    decodeBase64String,
    getMockParams
} from '../../util';

export const mockUserLoginSvc = (mockAdapter) => {
    const url = config.services.user.login;
    mockAdapter.onPost(url).reply((call) => {
        const { email, password } = getMockParams(call);
        const { loginEmail, loginPassword } = config.settings.serviceMocker;

        const success = (email === loginEmail) && (password === decodeBase64String(loginPassword));

        return createMockResponse({
            data: success ? config.mockData.userLoginSvcResponse : null,
            message: success ? null : config.text.loginPage.invalidCredentials,
            messageType: success ? null : constants.notificationType.ERROR,
            success
        });
    });
};
