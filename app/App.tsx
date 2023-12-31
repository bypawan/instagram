import React from 'react';
import {Provider} from 'react-redux';

import Routes from './router/routes';
import {store} from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
