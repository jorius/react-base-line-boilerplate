// @packages
import _ from 'lodash';

// @scripts
import { copyObjInCamelCase } from './object';

/**
 * Gets the paramters of a mocked service.
 * @param {{params: object}|{data: string}} call
 * @returns {Object}
 */
export const getMockParams = (call) => {
    const params = copyObjInCamelCase(
        call.params
        || JSON.parse(call.data).params
        || JSON.parse(call.data)
    );
    if (params.sortKey) {
        params.sortKey = _.lowerFirst(params.sortKey);
    }
    return params;
};

/**
 * Creates a response for a mocked service.
 * @param {Object} data - Data to be sent in the response.
 * @param {number} httpCode - Http code associated with the response.
 * @param {string} message - Optional message in case something happens.
 * @param {string} messageType - Valid values are: 'info', 'success', 'warning', 'error'.
 * @param {boolean} success - Indicates whether the request was successfully processed.
 * @returns {[
 *  httpCode: number,
 *  response: {
 *      data: object,
 *      message: string,
 *      messageType: string,
 *      success: boolean
 *  }
 * ]}
 */
export const createMockResponse = ({
    data = null,
    httpCode = 200,
    message = null,
    messageType = null,
    success = true
}) => ([httpCode, {
    data,
    message,
    messageType,
    success
}]);
