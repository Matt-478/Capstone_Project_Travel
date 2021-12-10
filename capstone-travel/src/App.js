import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TravelOffers from './components/TravelOffers'
import HomePage from './components/HomePage'
import ErrorPage from './components/ErrorPage'

function App() {
  return(
    <div className="App">
      <Router>
        <div className="navbar p-page"> 
          <h2>RapidPack*</h2>
        </div>
        <Route path="/home" exact render={(props) => <HomePage {...props} />} />
        <Route path="/flight" exact render={(props) => <TravelOffers {...props} />} />
        {/* <Route path="/" exact render={(props) => <Home title="Strive" {...props} />} /> */}
        <Route path="/404" exact component={<ErrorPage />} /> 
      </Router>
    </div>
  )
}

export default App;