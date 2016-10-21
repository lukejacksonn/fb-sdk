'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadFacebookSDK = require('./loadFacebookSDK');

var _loadFacebookSDK2 = _interopRequireDefault(_loadFacebookSDK);

var _FacebookSDK = require('./FacebookSDK');

var _FacebookSDK2 = _interopRequireDefault(_FacebookSDK);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef options
 * @see https://developers.facebook.com
 {
   appId: 'xxxxxxxxxxxxxxxx',
   cookie: true,
   xfbml: true,
   version: 'v2.7'
 }
 */

var facebookAPI = void 0;

/**
 * A factory function used to produce an instance of Facebook SDK and queue function calls and proxy events of the resulting object.
 *
 * @param {FacebookSDK~options} options
 * @returns {Object}
 */

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  if (!facebookAPI) facebookAPI = (0, _loadFacebookSDK2.default)();

  var API = {};

  var APIReady = new Promise(function (resolve, reject) {
    return facebookAPI.then(function (FB) {
      FB.init(options);
      FB.getLoginStatus(function (res) {
        if (res && !res.error) resolve(FB);else reject(FB);
      });
    });
  });

  API = _FacebookSDK2.default.promisify(APIReady);

  return API;
};