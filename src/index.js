import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Route} from 'react-router';
import {createHashHistory} from 'history';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store';
import App from './containers/App';
import './index.css';

const history = createHashHistory({
  hashType: 'noslash'
});

var store;
if(process.env.NODE_ENV !== 'production') {
  const logger = store => next => action => {
    console.log('dispatching', action);
    return next(action);
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(
    rootReducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history), logger))
  );
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));
}


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path='/:pageId?' component={(props) => <App pageId={props.match.params.pageId}/>}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
