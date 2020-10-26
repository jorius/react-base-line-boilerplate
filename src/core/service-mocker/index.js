//  @packages
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// @scripts
import { config } from '../../config';
import { mockUserLoginSvc } from './all-mocks';

export const initializeServiceMocker = () => {
    if (!config.settings.serviceMocker.isEnabled) {
        return null;
    }

    const mockAdapter = new MockAdapter(
        axios, {
            delayResponse: config.settings.serviceMocker.delayResponse
        }
    );

    const serviceMocker = {
        replyWithMockData: () => {
            mockAdapter.reset();
            mockUserLoginSvc(mockAdapter);
        },
        replyWithNetworkError: () => {
            mockAdapter.reset();
            mockAdapter.onAny().networkError();
        }
    };

    serviceMocker.replyWithMockData();
    return serviceMocker;
};
