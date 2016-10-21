import FBSDK from 'fb-sdk';

var Facebook = FBSDK({
  appId: '1659456037715738',
  status: true,
  version: 'v2.7'
});

Facebook.api('/me', (response) => {
  console.log(response);
});

setTimeout(() => {
  Facebook.api('/me?fields=friends', (response) => {
    console.log(response);
  });
}, 3000);
