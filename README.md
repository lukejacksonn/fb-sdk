```
import FBSDK from 'fb-sdk';

const Facebook = FBSDK({
  appId: '<YOUR-APP-ID>',
  status: true,
  version: 'v2.7'
});

Facebook.api('/me', (response) => {
  console.log(response);
});

Facebook.api('/me?fields=friends', (response) => {
  console.log(response);
});
```
