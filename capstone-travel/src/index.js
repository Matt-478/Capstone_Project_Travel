import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import BigArrayHolder from './components/reducers'

// STORE === GLOBALIZED STATE
let myStore = createStore(
  BigArrayHolder,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)




// ACTION
const holdBigArray = () => {
  return {
    type: "HOLD"
  }
}

// display in the console
myStore.subscribe(() => console.log(myStore.getState()))

// DISPATCH
myStore.dispatch(holdBigArray())


ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
 document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
