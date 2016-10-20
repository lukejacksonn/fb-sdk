import load from 'load-script';

export default () => {
  /**
   * A promise that is resolved when window.fbAsyncInit is called.
   * The promise is resolved with a reference to window.FB object.
   *
   * @param {Function} resolve
   * @member {Object} APIReady
   */
  const APIReady = new Promise((resolve) => {
    // The API will call this function when page has finished
    // downloading the JavaScript for the API.
    let previous = window.fbAsyncInit;
    window.fbAsyncInit = () => {
      if (previous) previous();
      resolve(window.FB);
    };
  });

  load('https://connect.facebook.net/en_US/sdk.js');

  return APIReady;
};
