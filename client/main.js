import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/accounts-config';
// Importing main app file
import App from '../imports/ui/App';

Meteor.startup(() => {
    render(<App />, document.getElementById('app'));
});

