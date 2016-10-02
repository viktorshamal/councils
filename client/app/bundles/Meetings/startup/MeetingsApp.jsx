import React from 'react';
import ReactOnRails from 'react-on-rails';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { configure } from 'redux-auth';

import routes from '../routes/routes';

import Meetings from '../containers/Meetings';

var configurePromise;

export default (props, railsContext) => {
    const store = ReactOnRails.getStore('meetingsStore');

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(
      browserHistory,
      store
    );

    store.dispatch(configure(
        {apiUrl: "http://localhost:3000/v1/"},
        {
            isServer: railsContext.serverSide,
            cookies:{},
            currentLocation: railsContext.href
        }
    ));

    return (
        <Provider store={store}>
            <Router history={history} children={routes} />
        </Provider>
    );
};

const postConfigure = () => {
  configurePromise.then(({redirectPath, blank}) => {
      if (blank) {
          // if `blank` is true, this is an OAuth redirect and should not
          // be rendered
          return <noscript />;
      } else {

      }
  });
};
