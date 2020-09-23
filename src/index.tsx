import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Workbox } from 'workbox-window';
import * as ReactGA from 'react-ga';
import App from './App';

import 'focus-visible'; /* :focus-visible polyfill */
import 'unfetch/polyfill'; /* fetch polyfill */

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-178448476-1');
  ReactGA.pageview(window.location.pathname);
}

ReactDOM.render(<App />, document.querySelector('#root'));

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  const wb = new Workbox('./sw.js');

  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      if (confirm('Update available. Click ok to renew app.')) {
        window.location.reload();
        if (process.env.NODE_ENV === 'production') {
          ReactGA.event({
            category: 'App',
            action: `Updated`,
          });
        }
      }
    } else {
      console.log('App successfully installed!');
    }
  });

  wb.addEventListener('activated', (event) => {
    if (!event.isUpdate) {
      console.log('Service worker activated for the first time!');
    }
  });

  window.addEventListener('appinstalled', () => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'App',
        action: `Installed as PWA`,
      });
    }
  });

  wb.register();
}
