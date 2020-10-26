/**
 * Returns the base URL of the current site.
 * @returns {string}
 */
export const getBaseUrl = () =>
    window.location.origin;

/**
 * Returns the current language of the browser.
 * @returns {string}
 */
export const getNavigatorLanguage = () =>
    navigator.language || navigator.userLanguage;

/**
 * Returns a Storage object (localStorage or sessionStorage)
 * according to the device name specified as argument.
 * @param {string} device - Valid values are: 'localStorage' and
 * 'sessionStorage'.
 * @returns {Storage}
 */
export const getStorage = (device) => {
    switch (device) {
        case 'localStorage':
            return localStorage;
        case 'sessionStorage':
            return sessionStorage;
        default:
            return null;
    }
};

/**
 * Encodes a string to Base64.
 * @param {string} str - The string to be encoded.
 * @returns {string}
 */
export const encodeBase64String = (str) =>
    window.btoa(str);

/**
 * Decodes a Base64 string.
 * @param {string} str - The string to be decoded.
 * @returns {string}
 */
export const decodeBase64String = (str) =>
    window.atob(str);

/**
 * Adds an action to be exectued every time the window is closed.
 * @param {function} callback - The callback function.
 */
export const addActionOnWindowClose = (callback) => {
    window.addEventListener('beforeunload', callback);
};

/**
 * Navigates the current location to the passed-in Url.
 * @param {string} url - The url to navigate to.
 */
export const navigateToUrl = (url) => {
    window.location.href = url;
};

/**
 * Opens the passed-in url in a new tab.
 * @param {string} url - The url to navigate to.
 */
export const navigateToExternalUrl = (url) => {
    window.open(url, '_blank');
};

/**
 * Prints an error into the javascript console.
 * @param {Object} obj - The object to be printed.
 */
export const printError = (obj) => {
    /* eslint-disable no-console */
    console.error(obj);
};
