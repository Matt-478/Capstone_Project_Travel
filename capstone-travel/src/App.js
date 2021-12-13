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
        <div className="navbar-dark p-page"> 
          <h2>RapidPack*</h2>
        </div>
        <Route path="/home" exact render={(props) => <HomePage {...props} />} />
        <Route path="/flight" exact render={(props) => <TravelOffers {...props} />} />
        {/* <Route path="/" exact render={(props) => <Home title="Strive" {...props} />} /> */}
        <Route path="/404" exact component={<ErrorPage />} /> 
        <footer className="p-page">
          {/* <h2 className="text-centre">FOOTER AREA</h2> */}
          <div className="text-space-between">
            <div>
              <h4>FAQ</h4>
              <h4>FAQ</h4>
              <h4>FAQ</h4>
            </div>
            <div>
              <h4>FAQ</h4>
              <h4>FAQ</h4>
              <h4>FAQ</h4>
            </div>
            <div>
              <h4>FAQ</h4>
              <h4>FAQ</h4>
              <h4>FAQ</h4>
            </div>
            <div>

            <div className="circle  c-7"></div>
              <div className="circle  c-8"></div>
              <div className="circle  c-8-3"></div>
            </div>
            <div>
              <div className="circle  c-8-1"></div>
              <div className="circle  c-8-4"></div>
              <div className="circle  c-8-2"></div>
            </div>
          </div>
        </footer>
      </Router>
    </div>
  )
}

export default App;