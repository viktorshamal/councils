import React from 'react';
import ReactOnRails from 'react-on-rails';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../routes/routes';

import Meetings from '../containers/Meetings';

export default () => {
    const store = ReactOnRails.getStore('meetingsStore');

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(
      browserHistory,
      store
    );

    return (
        <Provider store={store}>
          <Router history={history} children={routes} />
        </Provider>
    );
};

