// This file need to be referenced under "app" in webpack.client.base.config.js
import ReactOnRails from 'react-on-rails';

import meetingsStore from '../store/meetingsStore';
import MeetingsApp from './MeetingsApp';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactOnRails.registerStore({ meetingsStore });
ReactOnRails.register({ MeetingsApp });