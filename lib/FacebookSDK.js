'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _functionNames = require('./functionNames');

var _functionNames2 = _interopRequireDefault(_functionNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookSDK = {};

/**
 * Delays SDK method execution until API is ready.
 *
 * @todo Proxy all of the methods using Object.keys.
 * @param {Promise} fbAPIReady Promise that resolves when player is ready.
 * @returns {Object}
 */
FacebookSDK.promisify = function (fbAPIReady) {
  var functions = {};
  _functionNames2.default.forEach(function (functionName) {
    functions[functionName] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return fbAPIReady.then(function (fb) {
        return fb[functionName].apply(fb, args);
      });
    };
  });
  return functions;
};

exports.default = FacebookSDK;