import Sister from 'sister';
import loadFacebookSDK from './loadFacebookSDK';
import FacebookSDK from './FacebookSDK';

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

let facebookAPI;

/**
 * A factory function used to produce an instance of Facebook SDK and queue function calls and proxy events of the resulting object.
 *
 * @param {FacebookSDK~options} options
 * @returns {Object}
 */
export default (options = {}) => {

  if (!facebookAPI) facebookAPI = loadFacebookSDK();

  let API = {};
  const emitter = Sister();

  options.events = FacebookSDK.proxyEvents(emitter);

  const APIReady = new Promise((resolve, reject) =>
    facebookAPI.then((FB) => {
      FB.init(options);
      FB.getLoginStatus((res) => {
        if(res && !res.error) resolve(FB);
        else reject(FB)
      });
    }));

  API = FacebookSDK.promisify(APIReady);
  API.on = emitter.on;

  return API;

};
