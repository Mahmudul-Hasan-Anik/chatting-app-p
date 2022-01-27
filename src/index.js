import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

//Redux 
import { createStore } from 'redux'
import AllReducer from './Reducer/AllReducer'
import {Provider} from 'react-redux'
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(AllReducer,composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


