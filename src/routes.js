import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';
import Summary from './components/summary';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={Summary} />
    </Route>
)
