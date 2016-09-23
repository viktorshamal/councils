import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Meetings from '../containers/Meetings';

export default (
    <Route path="/meetings" >
        <IndexRoute component={Meetings} >
        </IndexRoute>
    </Route>
);