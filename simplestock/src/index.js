import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import App from './App' 
import StockDetail from './components/StockDetail'
import store from './store'
import * as firebase from 'firebase' 
import { initializeFirebase } from 'react-firestore-connect'
import firebaseInit from './fire'

initializeFirebase(firebase)


const Index = () => (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/:ticker" component={StockDetail} />
      </React.Fragment>
    </Router>
  );

ReactDOM.render(
          <Provider store={store}>
            <Index />
          </Provider>,
          document.getElementById('root'));
