'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadScript = require('load-script');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  /**
   * A promise that is resolved when window.fbAsyncInit is called.
   * The promise is resolved with a reference to window.FB object.
   *
   * @param {Function} resolve
   * @member {Object} APIReady
   */
  var APIReady = new Promise(function (resolve) {
    // The API will call this function when page has finished
    // downloading the JavaScript for the API.
    var previous = window.fbAsyncInit;
    window.fbAsyncInit = function () {
      if (previous) previous();
      resolve(window.FB);
    };
  });

  (0, _loadScript2.default)('https://connect.facebook.net/en_US/sdk.js');

  return APIReady;
};