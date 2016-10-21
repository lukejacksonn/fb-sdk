import functionNames from './functionNames';

const FacebookSDK = {};

/**
 * Delays SDK method execution until API is ready.
 *
 * @todo Proxy all of the methods using Object.keys.
 * @param {Promise} fbAPIReady Promise that resolves when player is ready.
 * @returns {Object}
 */
FacebookSDK.promisify = (fbAPIReady) => {
  const functions = {};
  functionNames.forEach((functionName) => {
    functions[functionName] = (...args) =>
      fbAPIReady.then((fb) => fb[functionName](...args));
  });
  return functions;
};

export default FacebookSDK;
