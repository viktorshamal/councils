import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Meetings from '../containers/Meetings';
import { AuthGlobals } from 'redux-auth/default-theme';


export default (
    <Route path="/" >
        <IndexRoute component={Meetings} >
        </IndexRoute>
    </Route>
);