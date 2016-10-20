import functionNames from './functionNames';
import eventNames from './eventNames';

String.prototype.upperFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const FacebookSDK = {};

/**
 * Construct an object that defines an event handler for all of the Facebook
 * SDK events. Proxy captured events through an event emitter.
 *
 * @todo Capture event parameters.
 * @param {Sister} emitter
 * @returns {Object}
 */
FacebookSDK.proxyEvents = (emitter) => {
  const events = {};
  eventNames.forEach((eventName) => {
    const onEventName = 'on' + eventName.upperFirst();
    events[onEventName] = (event) => {
      emitter.trigger(eventName, event);
    };
  });
  return events;
};

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
